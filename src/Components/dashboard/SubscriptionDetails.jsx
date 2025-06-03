import React from "react";
import Table from "react-bootstrap/Table";

const SubscriptionDetails = ({ subs, formatCentsToDollars }) => {
    console.log("subs details", subs)
    return (
        <div className="table-responsive">
            <h3>Subscription Details</h3>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Subscription ID</th>
                        <td>{subs.id}</td>
                    </tr>
                    <tr>
                        <th>User ID</th>
                        <td>{subs.userId}</td>
                    </tr>
                    <tr>
                        <th>User Email</th>
                        <td>{subs.userEmail}</td>
                    </tr>
                    <tr>
                        <th>Plan ID</th>
                        <td>{subs.planId}</td>
                    </tr>
                    <tr>
                        <th>Plan Name</th>
                        <td>{subs?.plan?.name}</td>
                    </tr>
                    <tr>
                        <th>Plan Interval</th>
                        <td>{subs.plan.interval}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{subs.status}</td>
                    </tr>
                    <tr>
                        <th>Coupon Used</th>
                        <td>{subs.couponUsed}</td>
                    </tr>
                    <tr>
                        <th>Customer Id</th>
                        <td>{subs.customerId}</td>
                    </tr>
                    <tr>
                        <th>Amount Paid</th>
                        <td>{formatCentsToDollars(subs.amountPaid)}</td>
                    </tr>
                    <tr>
                        <th>Discount</th>
                        <td>{formatCentsToDollars(subs.discountAmount)}</td>
                    </tr>
                    <tr>
                        <th>Orignal Price</th>
                        <td>{formatCentsToDollars(subs.originalAmount)}</td>
                    </tr>

                </tbody>
            </Table>
        </div>
    );
};

export default SubscriptionDetails;
