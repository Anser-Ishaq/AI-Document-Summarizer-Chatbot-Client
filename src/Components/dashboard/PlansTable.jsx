import React, { useEffect } from 'react'
import Layout from '../../Layouts/AdminLayout'
import Table from 'react-bootstrap/Table';
import useStripeStore from '../../Store/stripeStore';
import useModalStore from '../../Store/modalStore';
import PlanDetails from './PlanDetails';
import Dynamic_Modal from '../Modal';

const PlansTable = () => {
    const { plans, fetchPlans, loadingPlans, plansError } = useStripeStore();
    const { openModal } = useModalStore();

    useEffect(() => {
        console.log("plans", plans)
        fetchPlans();
    }, []);

    return (
        <Layout>
            <div className="container my-4" >
                <h3>Available Subscription Plans</h3>
                {loadingPlans && <p>Loading...</p>}
                {plansError && <p className="text-danger">{plansError}</p>}
                {!loadingPlans && !plansError && (
                    <Table striped="columns" bordered hover responsive size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Plan ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Interval</th>
                                <th>Stripe Price ID</th>
                                <th>Is Active</th>
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
                                        <td>{plan.isActive === true ? "True" : "False"}</td>
                                        <td style={{ whiteSpace: "pre-line" }}>{plan.description}</td>
                                        <td>{new Date(plan.createdAt).toLocaleDateString()}</td>
                                        <td className="d-flex gap-2">
                                            <button className="btn btn-warning btn-sm">Update</button>
                                            <button className='btn btn-secondary btn-sm' onClick={() => openModal(<PlanDetails plan={plan} />)}>View</button>
                                            <button className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                )}
            </div>
            <Dynamic_Modal />
        </Layout>
    );
};

export default PlansTable;
