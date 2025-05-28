import React from 'react'
import Layout from '../../Layouts/AdminLayout'
import Table from 'react-bootstrap/Table';

const CouponsTable = () => {
    return (
        <>
            <Layout>
                <div class="container">
                    <div class="cart-area-inner">
                        <div class="ms-woocommerce-cart-form-wrapper">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Coupon Id</th>
                                        <th>Coupon Code</th>
                                        <th>Used By users</th>
                                        <th>Discount</th>
                                        <th>Discounted Price</th>
                                        <th>Expiry Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>123Abc1ds</td>
                                        <td>123Abc1ds</td>
                                        <td>abc@gmail.com</td>
                                        <td>10%</td>
                                        <td>$ 14.99</td>
                                        <td>30-6-2025</td>
                                        <td className='flex'>
                                            <button className='btn btn-warning'>Update</button>
                                            <button className='btn btn-secondary'>View</button>
                                            <button className='btn btn-danger'>Delete</button>
                                        </td>
                                    </tr>

                                </tbody>
                            </Table>

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CouponsTable