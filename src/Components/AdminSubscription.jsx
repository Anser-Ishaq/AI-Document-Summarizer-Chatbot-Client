import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useAuthStore from '../Store/authStore';
import { createPlan } from '../api/stripeApi';
import useAlert from '../Hooks/useAlerts';

const AdminSubscription = () => {
    const { user } = useAuthStore();
    const { showError, showSuccess } = useAlert();
    const [loading, setLoading] = useState(false);

    // Available features with labels
    const availableFeatures = [
        { value: 'pdf', label: 'PDF Support' },
        { value: 'txt', label: 'Text File Support' },
        { value: 'docx', label: 'Word Document Support' },
        { value: 'png', label: 'PNG Image Support' },
        { value: 'jpg', label: 'JPG Image Support' }
    ];

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        interval: 'month',
        features: [] // Array to store selected features
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleFeatureChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            if (checked) {
                return {
                    ...prev,
                    features: [...prev.features, value]
                };
            } else {
                return {
                    ...prev,
                    features: prev.features.filter(f => f !== value)
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.id) {
            showError("User not authenticated");
            return;
        }

        setLoading(true);

        const formattedDescription = formData.description
            .split('\n')
            .map((line) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                return trimmed.startsWith('•') ? trimmed : `• ${trimmed}`;
            })
            .filter(Boolean)
            .join('\n');

        try {
            const payload = {
                name: formData.name,
                description: formattedDescription,
                price: parseFloat(formData.price),
                interval: formData.interval,
                userId: user.id,
                features: formData.features // Include selected features
            };

            const result = await createPlan(payload);
            console.log("Plan created:", result);
            showSuccess("Plan created successfully!");
            setFormData({
                name: '',
                description: '',
                price: '',
                interval: 'month',
                features: []
            });
        } catch (error) {
            console.error("Failed to create plan:", error.response?.data || error.message);
            showError(error.response?.data?.message || "Failed to create plan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Plan Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Plan Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="interval">
                <Form.Label>Plan Interval</Form.Label>
                <Form.Select
                    value={formData.interval}
                    onChange={handleChange}
                    style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}
                    required
                >
                    <option value="day">Daily</option>
                    <option value="week">Weekly</option>
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="e.g. 29.99"
                    value={formData.price}
                    onChange={handleChange}
                    style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}
                    min="0.01"
                    step="0.01"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Plan Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter plan features or description (one per line)..."
                    value={formData.description}
                    onChange={handleChange}
                    style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Supported File Types</Form.Label>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '10px',
                    padding: '10px',
                    border: '1px solid #3F3EED',
                    borderRadius: '5px',
                    background: '#F7F7FF'
                }}>
                    {availableFeatures.map((feature) => (
                        <Form.Check
                            key={feature.value}
                            type="checkbox"
                            id={`feature-${feature.value}`}
                            label={feature.label}
                            value={feature.value}
                            checked={formData.features.includes(feature.value)}
                            onChange={handleFeatureChange}
                        />
                    ))}
                </div>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Creating New Plan..." : "Save New Plan"}
            </Button>
        </Form>
    );
};

export default AdminSubscription;