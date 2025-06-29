import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { updateCoupon } from "../../api/stripeApi";
import useAuthStore from "../../Store/authStore";

const CouponDetails = ({ coupon, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        ...coupon,
        // isActive: coupon.isActive || false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuthStore();

    const discountTypes = ['percentage'];

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'select-one' ? value === 'true' : value
        }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const payload = {
                name: formData.name,
                code: formData.code,
                description: formData.description,
                discountType: formData.discountType,
                discountValue: Number(formData.discountValue),
                isActive: Boolean(formData.isActive),
                expiresAt: formData.expiresAt,
                maxRedemptions: formData.maxRedemptions ? Number(formData.maxRedemptions) : null,
                minimumAmount: formData.minimumAmount ? Number(formData.minimumAmount) : null,
                userId: user.id
            };

            console.log("Sending payload:", payload); // Debug log

            const response = await updateCoupon(coupon.id, payload);

            console.log("Received response:", response); // Debug log

            if (onUpdate) {
                onUpdate(response.data);
            }
            setFormData(response.data); // Update with server response
            setIsEditing(false);
            window.location.reload();
        } catch (err) {
            console.error("Failed to update coupon:", err);
            setError(err.response?.data?.message || "Failed to update coupon");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="table-responsive">
            <h3>{coupon.name} Coupon Details</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Coupon ID</th>
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
                        <th>Code</th>
                        <td>
                            {isEditing ? (
                                <Form.Control
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                />
                            ) : (
                                formData.code
                            )}
                        </td>
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
                        <th>Discount Type</th>
                        <td>
                            {isEditing ? (
                                <Form.Select
                                    name="discountType"
                                    value={formData.discountType}
                                    onChange={handleChange}
                                >
                                    {discountTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </option>
                                    ))}
                                </Form.Select>
                            ) : (
                                formData.discountType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Discount Value</th>
                        <td>
                            {isEditing ? (
                                <Form.Control
                                    type="number"
                                    name="discountValue"
                                    value={formData.discountValue}
                                    onChange={handleChange}
                                    min="0"
                                    step={formData.discountType === 'percentage' ? "1" : "0.01"}
                                />
                            ) : (
                                formData.discountType === 'percentage'
                                    ? `${formData.discountValue}%`
                                    : `$${formData.discountValue}`
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Max Redemptions</th>
                        <td>
                            {isEditing ? (
                                <Form.Control
                                    type="number"
                                    name="maxRedemptions"
                                    value={formData.maxRedemptions || ''}
                                    onChange={handleChange}
                                    min="1"
                                />
                            ) : (
                                formData.maxRedemptions || 'Unlimited'
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Expires At</th>
                        <td>
                            {isEditing ? (
                                <Form.Control
                                    type="datetime-local"
                                    name="expiresAt"
                                    value={formData.expiresAt ? formData.expiresAt.slice(0, 16) : ''}
                                    onChange={handleChange}
                                />
                            ) : (
                                formData.expiresAt ? new Date(formData.expiresAt).toLocaleString() : 'Never'
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
                            {isLoading ? 'Updating...' : 'Update Coupon'}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setIsEditing(false);
                                setFormData({ ...coupon });
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button variant="primary" onClick={() => setIsEditing(true)}>
                        Edit Coupon
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CouponDetails;