import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const AdminSubscription = () => {
    return (
        <>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Plan Name</Form.Label>
                        <Form.Control type="email" placeholder="Enter Plan Name" style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Plan Expiration</Form.Label>
                        <Form.Control type="text" placeholder="Monthly / Annual" style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Stripe Price ID</Form.Label>
                    <Form.Control placeholder="price_1RSE..." style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Plan Description</Form.Label>
                    <Form.Control placeholder="Description here..." style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Price</Form.Label>
                        <Form.Control placeholder='$120.00' style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Plan ID</Form.Label>
                        <Form.Control placeholder='123Def451A' style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Save New Plan
                </Button>
            </Form>
        </>
    )
}

export default AdminSubscription