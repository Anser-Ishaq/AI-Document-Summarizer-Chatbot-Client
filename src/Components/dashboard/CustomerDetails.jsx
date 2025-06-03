// components/UserDetailsTable.jsx
import React from "react";
import Table from "react-bootstrap/Table";

const CustomerDetails = ({ user }) => {
    return (
        <div className="table-responsive">
            <h3>{user.username} Details</h3>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>User ID</th>
                        <td>{user.user_id}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td>{user.role}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{user.status}</td>
                    </tr>
                    <tr>
                        <th>Plan</th>
                        <td>{user.status}</td>
                    </tr>
                    <tr>
                        <th>Paid</th>
                        <td>{user.status === 'pro' ? '$20' : '$0'}</td>
                    </tr>
                    <tr>
                        <th>Created At</th>
                        <td>{new Date(user.created_at).toLocaleString()}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default CustomerDetails;
