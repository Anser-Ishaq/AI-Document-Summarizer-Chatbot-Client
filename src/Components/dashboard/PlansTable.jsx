import React, { useEffect } from 'react'
import Layout from '../../Layouts/AdminLayout'
import Table from 'react-bootstrap/Table';
import useStripeStore from '../../Store/stripeStore';

const PlansTable = () => {
    const { plans, fetchPlans, loadingPlans, plansError } = useStripeStore();

    useEffect(() => {
        fetchPlans();
    }, []);

    return (
        <Layout>
            <div className="container my-4">
                <h3>Available Subscription Plans</h3>
                {loadingPlans && <p>Loading...</p>}
                {plansError && <p className="text-danger">{plansError}</p>}
                {!loadingPlans && !plansError && (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Plan ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Interval</th>
                                <th>Stripe Price ID</th>
                                <th>Description</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plans.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        No plans found.
                                    </td>
                                </tr>
                            ) : (
                                plans.map((plan, index) => (
                                    <tr key={plan.id}>
                                        <td>{index + 1}</td>
                                        <td>{plan.id}</td>
                                        <td>{plan.name}</td>
                                        <td>${plan.price}</td>
                                        <td>{plan.interval}</td>
                                        <td>{plan.stripePriceId}</td>
                                        <td style={{ whiteSpace: "pre-line" }}>{plan.description}</td>
                                        <td>{new Date(plan.createdAt).toLocaleDateString()}</td>
                                        <td className="d-flex gap-2">
                                            <button className="btn btn-warning btn-sm">Update</button>
                                            <button className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                )}
            </div>
        </Layout>
    );
};

export default PlansTable;
