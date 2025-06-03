import React, { useState, useEffect } from 'react'
import Layout from '../../Layouts/AdminLayout'
import Table from 'react-bootstrap/Table';
import useStripeStore from '../../Store/stripeStore';
import useModalStore from '../../Store/modalStore';
import PlanDetails from './PlanDetails';
import Dynamic_Modal from '../Modal';
import { deletePlan } from '../../api/stripeApi';

const PlansTable = () => {
    const { plans, fetchPlans, loadingPlans, plansError } = useStripeStore();
    const { openModal } = useModalStore();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async (planId) => {
        if (!window.confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        setError(null);

        try {
            await deletePlan(planId);
            // Refresh the plans list after successful deletion
            if (fetchPlans) {
                await fetchPlans();
            }
        } catch (err) {
            console.error('Failed to delete plan:', err);
            setError(err.response?.data?.message || 'Failed to delete plan');
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        fetchPlans();
        console.log("plans", plans)
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
                                <th>Features</th>
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
                                        <td >{plan.features.toString()}</td>
                                        <td
                                        style={{backgroundColor: plan.isActive === true? "#92d092" : "#d99c9c"}}
                                        >{plan.isActive === true ? "True" : "False"}</td>
                                        <td style={{ whiteSpace: "pre-line" }}>{plan.description}</td>
                                        <td>{new Date(plan.createdAt).toLocaleDateString()}</td>
                                        <td className="d-flex gap-2">
                                            <button className='btn btn-secondary btn-sm' onClick={() => openModal(<PlanDetails plan={plan} />)}>View</button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(plan.id)}
                                                disabled={isDeleting}
                                            >
                                                {isDeleting ? 'Deleting...' : 'Delete'}
                                            </button>
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
