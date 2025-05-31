import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import useAuthStore from '../Store/authStore';
import { createPlan } from '../api/stripeApi';
import useAlert from '../Hooks/useAlerts';

const AdminSubscription = () => {
    const { user } = useAuthStore();
    const { showError, showSuccess } = useAlert();
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        interval: 'month',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.id) {
            alert("User not authenticated");
            return;
        }
        setLoading(true)
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
            };

            const result = await createPlan(payload);
            console.log("Plan created:", result);
            //   alert("Plan created successfully!");
            showSuccess("Plan created successfully!")
            setFormData({ name: '', description: '', price: '', interval: 'month' });
        } catch (error) {
            console.error("Failed to create plan:", error.response?.data || error.message);
            showError("Failed to create plan.")
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
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="interval">
                <Form.Label>Plan Interval</Form.Label>
                <Form.Select
                    value={formData.interval}
                    onChange={handleChange}
                    style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}
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
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Plan Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter plan features or description..."
                    value={formData.description}
                    onChange={handleChange}
                    style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                {loading ? "Creating New Plan..." : "Save New Plan"}
            </Button>
        </Form>
    );
};

export default AdminSubscription;
