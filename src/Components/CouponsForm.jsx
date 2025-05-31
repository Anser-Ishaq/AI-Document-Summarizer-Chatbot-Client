import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useAuthStore from '../Store/authStore';
import { createCoupon } from '../api/stripeApi';
import useAlert from '../Hooks/useAlerts';

const CouponsForm = () => {
    const { user } = useAuthStore();
    const { showSuccess, showError } = useAlert();
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        description: '',
        discountType: 'percentage',
        discountValue: '',
        maxRedemptions: '',
        expiresAt: '',
    });

    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.id) {
            alert("User not found. Please log in again.");
            return;
        }

        const payload = {
            ...formData,
            discountValue: Number(formData.discountValue),
            maxRedemptions: Number(formData.maxRedemptions),
            userId: user.id,
            expiresAt: new Date(formData.expiresAt).toISOString(),
        };

        try {
            setLoading(true);
            setResponseMsg('');
            const res = await createCoupon(payload);
            // setResponseMsg('Coupon created successfully!');
            showSuccess("Coupon created successfully!");
            setFormData({
                code: '',
                name: '',
                description: '',
                discountType: 'percentage',
                discountValue: '',
                maxRedemptions: '',
                expiresAt: '',
            });
        } catch (error) {
            console.error(error);
            // setResponseMsg('Error creating coupon.');
            showError("Error creating coupon.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Coupon Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="code"
                        placeholder="SAVE20"
                        value={formData.code}
                        onChange={handleChange}
                        required
                        style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Coupon Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="20% Off First Month"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Get 20% off your first month subscription"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={2}
                        style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Discount Type</Form.Label>
                        <Form.Select
                            name="discountType"
                            value={formData.discountType}
                            onChange={handleChange}
                            style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}
                        >
                            <option value="percentage">Percentage</option>
                            <option value="fixed">Fixed Amount</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Discount Value</Form.Label>
                        <Form.Control
                            type="number"
                            name="discountValue"
                            placeholder="e.g., 20 for 20%"
                            value={formData.discountValue}
                            onChange={handleChange}
                            required
                            style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Max Redemptions</Form.Label>
                        <Form.Control
                            type="number"
                            name="maxRedemptions"
                            placeholder="e.g., 100"
                            value={formData.maxRedemptions}
                            onChange={handleChange}
                            required
                            style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Expiration Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="expiresAt"
                        value={formData.expiresAt}
                        onChange={handleChange}
                        required
                        style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Set New Coupon Code'}
                </Button>
            </Form>
        </>
    );
};

export default CouponsForm;
