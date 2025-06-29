import React, { useState, useEffect } from 'react';
import Layout from '../../Layouts/AdminLayout';
import Table from 'react-bootstrap/Table';
import useModalStore from '../../Store/modalStore';
import Dynamic_Modal from '../Modal';
import { getAllSubscriptions } from '../../api/stripeApi';
import SubscriptionDetails from './SubscriptionDetails';


const SubscriptionTable = () => {
    const [subs, setSubs] = useState([]);
    const { openModal } = useModalStore();

    function formatCentsToDollars(amountInCents) {
        // Convert cents to dollars and format with 2 decimal places
        return (amountInCents / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        });
      }

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await getAllSubscriptions();
                console.log("response of subs", response)
                if (response.success) {
                    setSubs(response.data);
                } else {
                    console.error('Failed to fetch subscriptions:', response.message);
                }
            } catch (error) {
                console.error('API error:', error);
            }
        };

        fetchSubscriptions();
    }, []);

    return (
        <Layout>
            <div className="container">
                <h3>All Subscriptions</h3>
                <div className="cart-area-inner">
                    <div className="ms-woocommerce-cart-form-wrapper">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Id</th>
                                    <th>Status</th>
                                    <th>Customer Id</th>
                                    <th>Amount Paid</th>
                                    <th>Coupon Code</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subs.length > 0 ? (
                                    subs.map((subs, index) => (
                                        <tr key={subs.userId}>
                                            <td>{index + 1}</td>
                                            <td>{subs.userId}</td>
                                            <td>{subs.status}</td>
                                            <td>{subs.customerId}</td>
                                            <td>{formatCentsToDollars(subs.amountPaid)}</td>
                                            <td>{subs.couponUsed}</td>
                                            <td className="d-flex gap-2">
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => openModal(<SubscriptionDetails subs={subs} formatCentsToDollars={formatCentsToDollars} />)}>
                                                    View
                                                </button>
                                                {/* <button className="btn btn-danger btn-sm">Delete</button> */}

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">
                                            No Subscriptions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <Dynamic_Modal />
        </Layout>
    );
};

export default SubscriptionTable;
