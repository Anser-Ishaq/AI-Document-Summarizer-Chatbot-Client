import React, { useEffect } from 'react'
import Layout from '../../Layouts/AdminLayout'
import Table from 'react-bootstrap/Table';
import useCouponsStore from '../../Store/couponsStore';

const CouponsTable = () => {
    const { coupons, fetchAllCoupons, loadingCoupons, couponsError } = useCouponsStore();

    useEffect(() => {
        fetchAllCoupons()
    }, [])
    return (
        <>
            <Layout>
                <div className="container my-4">
                    <h3>Available Coupons</h3>
                    {loadingCoupons && <p>Loading...</p>}
                    {couponsError && <p className="text-danger">{couponsError}</p>}
                    {!loadingCoupons && !couponsError && (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Coupon ID</th>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Is Active</th>
                                    <th>Discount Value</th>
                                    <th>Discount Type</th>
                                    <th>Max Redemptions</th>
                                    <th>Current Redemptions</th>
                                    <th>Is Expired</th>
                                    <th>Expires At</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="text-center">
                                            No coupons found.
                                        </td>
                                    </tr>
                                ) : (
                                    coupons.map((cpn, index) => (
                                        <tr key={cpn.id}>
                                            <td>{index + 1}</td>
                                            <td>{cpn.id}</td>
                                            <td>{cpn.name}</td>
                                            <td>{cpn.code}</td>
                                            <td>{cpn.isActive ? "True" : "False"}</td>
                                            <td>{cpn.discountValue}</td>
                                            <td>{cpn.discountType}</td>
                                            <td>{cpn.maxRedemptions}</td>
                                            <td>{cpn.currentRedemptions}</td>
                                            <td>{cpn.isExpired ? "True" : "False"}</td>
                                            <td>{new Date(cpn.expiresAt).toLocaleDateString()}</td>
                                            <td>{new Date(cpn.createdAt).toLocaleDateString()}</td>
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
        </>
    )
}

export default CouponsTable