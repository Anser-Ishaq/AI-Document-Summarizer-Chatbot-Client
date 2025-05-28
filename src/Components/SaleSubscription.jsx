import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
const SaleSubscription = () => {
    return (
        <>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Plan Name</Form.Label>
                        <Form.Control type="email" placeholder="Enter Plan Name" style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                    </Form.Group>

                    <Form.Group as={Col} className='mb-3' controlId="formGridPassword">
                        <Form.Label>Plan Expiration</Form.Label>
                        <Form.Control type="text" placeholder="Monthly / Annual" style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                    </Form.Group>
                    <Form.Group controlId="formGridSelect">
                        <Form.Label>Plan Expiration</Form.Label>
                        <Form.Select size='lg' aria-label="Default select example" style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }}>
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>

                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDiscount">
                        <Form.Label>Discount Percentage</Form.Label>
                        <Form.Control placeholder='10%' style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Discounted Price</Form.Label>
                        <Form.Control placeholder='$120.00' style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Stripe Price ID</Form.Label>
                        <Form.Control placeholder='price_1RSE...' style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </>
    )
}

export default SaleSubscription