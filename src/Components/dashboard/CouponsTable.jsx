import React, { useEffect } from 'react'
import Layout from '../../Layouts/AdminLayout'
import Table from 'react-bootstrap/Table';
import useCouponsStore from '../../Store/couponsStore';
import useModalStore from '../../Store/modalStore';
import CouponDetails from './CouponsDetails';
import { deleteCoupons } from '../../api/stripeApi';
import useAuthStore from '../../Store/authStore';
import useAlert from '../../Hooks/useAlerts';

const CouponsTable = () => {
    const { coupons, fetchAllCoupons, loadingCoupons, couponsError } = useCouponsStore();
    const { openModal } = useModalStore();
    const { user } = useAuthStore();
    const { showSuccess, showError } = useAlert();

    useEffect(() => {
        fetchAllCoupons();
    }, []);

    const handleDeleteCoupon = async (couponId) => {
        if (!user?.id) {
            console.error('User ID not available');
            return;
        }

        try {
            if (window.confirm('Are you sure you want to delete this coupon? This action cannot be undone.')) {
                await deleteCoupons(couponId, user.id);
                // removeCoupon(couponId); // Update local state
                showSuccess('Coupon deleted successfully')
                fetchAllCoupons();
                // alert('Coupon deleted successfully');
            }
        } catch (error) {
            console.error('Failed to delete coupon:', error);
            showError('Failed to delete coupon')
            // alert(`Failed to delete coupon: ${error.response?.data?.message || error.message}`);
        }
    };

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
                                    <th>Is Expired</th>
                                    <th>Expires At</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.length === 0 ? (
                                    <tr>
                                        <td colSpan="13" className="text-center">
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
                                            <td
                                            style={{backgroundColor: cpn.isActive === true? "#92d092" : "#d99c9c"}}
                                            >{cpn.isActive ? "True" : "False"}</td>
                                            <td>{cpn.discountValue}</td>
                                            <td>{cpn.discountType}</td>
                                            <td>{cpn.isExpired ? "True" : "False"}</td>
                                            <td>{new Date(cpn.expiresAt).toLocaleDateString()}</td>
                                            <td>{new Date(cpn.createdAt).toLocaleDateString()}</td>
                                            <td className="d-flex gap-2">
                                                <button
                                                    onClick={() => openModal(<CouponDetails coupon={cpn} />)}
                                                    className="btn btn-secondary btn-sm"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCoupon(cpn.id)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Delete
                                                </button>
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