import React from 'react'
import Layout from '../../Layouts/AdminLayout'
import Table from 'react-bootstrap/Table';

const PlansTable = () => {
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
                                        <th>Plan Id</th>
                                        <th>Plan Name</th>
                                        <th>Plan Price</th>
                                        <th>Stripr Price Id</th>
                                        <th>Plan Discription</th>
                                        <th>Expiry Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>123Abc1ds</td>
                                        <td>Pro</td>
                                        <td>$19.99</td>
                                        <td>price-123...</td>
                                        <td>Plan description....</td>
                                        <td>30-6-2025</td>
                                        <td className='flex'>
                                            <button className='btn btn-warning'>Update</button>
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

export default PlansTable