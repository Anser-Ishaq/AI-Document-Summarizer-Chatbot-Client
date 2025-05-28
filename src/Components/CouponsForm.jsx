import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useAuthStore from '../Store/authStore';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CouponsForm = () => {
    const { user } = useAuthStore();
    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Coupon Code</Form.Label>
                    <Form.Control type="text" placeholder="Coupon Code here..." style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Discounted Percentage</Form.Label>
                    <Form.Control type="text" placeholder="10%" disabled style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Discounted Price</Form.Label>
                        <Form.Control placeholder='$120.00' style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Stripe Price Id</Form.Label>
                        <Form.Control placeholder='price-123s...' style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Expiration Time</Form.Label>
                        <Form.Control placeholder='20-06-2025' type="date" style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Set New Coupon Code
                </Button>
            </Form>
        </>
    )
}

export default CouponsForm