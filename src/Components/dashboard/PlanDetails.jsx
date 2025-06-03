import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const PlanDetails = ({ plan, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...plan });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (onUpdate) {
            onUpdate(formData); // Send updated data to parent
        }
        setIsEditing(false);
    };

    return (
        <div className="table-responsive">
            <h3>{plan.name} Plan Details</h3>
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
                            ${formData.price}
                            {/* {isEditing ? (
                                <Form.Control
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            ) : ( */}
                            {/* `$${formData.price}` */}
                            {/* // )} */}
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
                                </Form.Select>
                            ) : (
                                formData.interval
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Stripe Price ID</th>
                        <td>
                            {formData.stripePriceId}
                            {/* {isEditing ? (
                                <Form.Control
                                    name="stripePriceId"
                                    value={formData.stripePriceId}
                                    onChange={handleChange}
                                />
                            ) : ( */}
                            {/* )} */}
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
                        <th>Created At</th>
                        <td>{new Date(formData.createdAt).toLocaleString()}</td>
                    </tr>
                </tbody>
            </Table>
            <div className="d-flex justify-content-end gap-2">
                {isEditing ? (
                    <>
                        <Button variant="success" onClick={handleSave}>Update Plan</Button>
                        <Button variant="secondary" onClick={() => {
                            setIsEditing(false);
                            setFormData({ ...plan }); // Reset changes
                        }}>Cancel</Button>
                    </>
                ) : (
                    <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Plan</Button>
                )}
            </div>
        </div>
    );
};

export default PlanDetails;
