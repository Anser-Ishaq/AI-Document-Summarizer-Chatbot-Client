import React, { useState, useEffect } from 'react';
import Layout from '../../Layouts/AdminLayout';
import Table from 'react-bootstrap/Table';
import { deleteAccount, getAllUsers } from '../../api/authApi';
import CustomerDetails from './CustomerDetails';
import useModalStore from '../../Store/modalStore';
import Dynamic_Modal from '../Modal';


const Customers = () => {
    const [users, setUsers] = useState([]);
    const { openModal } = useModalStore();
    // Inside your component
    const handleDeleteUser = async (userId) => {
        try {
            if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                await deleteAccount(userId);
                // Refresh the user list or remove the deleted user from state
                // Example if you're using state:
                setUsers(users.filter(user => user.user_id !== userId));
                alert('User deleted successfully');
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Failed to delete user: ' + (error.response?.data?.message || error.message));
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
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
                <h3>All Users</h3>
                <div className="cart-area-inner">
                    <div className="ms-woocommerce-cart-form-wrapper">
                        <Table striped bordered hover responsive>
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
                                            <td>{user.status}</td>
                                            <td>{user.status === 'pro' ? '$20' : '$0'}</td>
                                            <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                            <td className="d-flex gap-2">
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => openModal(<CustomerDetails user={user} />)}>
                                                    View
                                                </button>
                                                <button
                                                onClick={()=> handleDeleteUser(user.user_id)}
                                                disabled={user.role === 'admin'}
                                                className="btn btn-danger btn-sm">Delete</button>
                                                <Dynamic_Modal />

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">
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
