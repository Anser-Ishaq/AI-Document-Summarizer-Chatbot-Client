import React, { useState, useEffect } from 'react';
import Layout from '../../Layouts/AdminLayout';
import Table from 'react-bootstrap/Table';
import { getAllUsers } from '../../api/authApi';

const Customers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers(); // response contains { success, data, count }
                if (response.success) {
                    setUsers(response.data);
                } else {
                    console.error('Failed to fetch users:', response.message);
                }
            } catch (error) {
                console.error('API error:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <Layout>
            <div className="container">
                <div className="cart-area-inner">
                    <div className="ms-woocommerce-cart-form-wrapper">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Plan</th>
                                    <th>Paid</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={user.user_id}>
                                            <td>{index + 1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.status}</td>
                                            <td>{user.status}</td> {/* Assuming status = plan (free/pro) */}
                                            <td>{user.status === 'pro' ? '$20' : '$0'}</td>
                                            <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                            <td style={{ pointerEvents: `${user.role === 'admin' ? "none" : ""}` }} className="d-flex gap-2">
                                                <button className="btn btn-warning btn-sm">Suspend</button>
                                                <button className="btn btn-secondary btn-sm">View</button>
                                                <button className="btn btn-danger btn-sm">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Customers;
