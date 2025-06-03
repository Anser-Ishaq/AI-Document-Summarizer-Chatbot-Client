import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { updatePlan } from "../../api/stripeApi";

const PlanDetails = ({ plan, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        ...plan,
        features: plan.features || [],
        isActive: plan.isActive || false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const availableFeatures = ['pdf', 'txt', 'docx', 'png', 'jpg'];

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'select-one' ? value === 'true' : value
        }));
    };

    const handleFeatureChange = (feature) => {
        setFormData(prev => {
            const newFeatures = prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature];
            return { ...prev, features: newFeatures };
        });
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const payload = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                interval: formData.interval,
                features: formData.features,
                is_active: Boolean(formData.isActive) // Ensure boolean
            };

            console.log("Sending payload:", payload); // Debug log

            const response = await updatePlan(plan.id, payload);

            console.log("Received response:", response); // Debug log

            if (onUpdate) {
                onUpdate(response.data);
            }
            setFormData(response.data); // Update with server response
            setIsEditing(false);
            window.location.reload();
        } catch (err) {
            console.error("Failed to update plan:", err);
            setError(err.response?.data?.message || "Failed to update plan");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="table-responsive">
            <h3>{plan.name} Plan Details</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Plan ID</th>
                        <td>{formData.id}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>
                            {isEditing ? (
                                <Form.Control
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                formData.name
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Price</th>
                        <td>
                            {isEditing ? (
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                />
                            ) : (
                                `$${formData.price}`
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Interval</th>
                        <td>
                            {isEditing ? (
                                <Form.Select
                                    name="interval"
                                    value={formData.interval}
                                    onChange={handleChange}
                                >
                                    <option value="month">Month</option>
                                    <option value="year">Year</option>
                                    <option value="week">Week</option>
                                    <option value="day">Day</option>
                                </Form.Select>
                            ) : (
                                formData.interval
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Stripe Price ID</th>
                        <td>{formData.stripePriceId}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>
                            {isEditing ? (
                                <Form.Control
                                    name="description"
                                    as="textarea"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            ) : (
                                <div style={{ whiteSpace: "pre-line" }}>{formData.description}</div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Features</th>
                        <td>
                            {isEditing ? (
                                <div>
                                    {availableFeatures.map(feature => (
                                        <Form.Check
                                            key={feature}
                                            type="checkbox"
                                            id={`feature-${feature}`}
                                            label={feature.toUpperCase()}
                                            checked={formData.features.includes(feature)}
                                            onChange={() => handleFeatureChange(feature)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    {formData.features.length > 0 ? (
                                        formData.features.map(feature => (
                                            <span key={feature} className="badge bg-secondary me-2">
                                                {feature.toUpperCase()}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-muted">No features selected</span>
                                    )}
                                </div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>
                            {isEditing ? (
                                <Form.Select
                                    name="isActive"
                                    value={formData.isActive}
                                    onChange={handleChange}
                                >
                                    <option value={true}>Active</option>
                                    <option value={false}>Inactive</option>
                                </Form.Select>
                            ) : (
                                <span className={`badge ${formData.isActive ? 'bg-success' : 'bg-danger'}`}>
                                    {formData.isActive ? "Active" : "Inactive"}
                                </span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Created At</th>
                        <td>{new Date(formData.createdAt).toLocaleString()}</td>
                    </tr>
                </tbody>
            </Table>
            <div className="d-flex justify-content-end gap-2">
                {isEditing ? (
                    <>
                        <Button
                            variant="success"
                            onClick={handleSave}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update Plan'}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setIsEditing(false);
                                setFormData({ ...plan, features: plan.features || [] });
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button variant="primary" onClick={() => setIsEditing(true)}>
                        Edit Plan
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PlanDetails;