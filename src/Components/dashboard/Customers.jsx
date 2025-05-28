import React from 'react'
import Layout from '../../Layouts/AdminLayout'
import Table from 'react-bootstrap/Table';

const Customers = () => {
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
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Plan</th>
                                        <th>Paid</th>
                                        <th>Expiry Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto@mail.com</td>
                                        <td>free</td>
                                        <td>free</td>
                                        <td>$ 0</td>
                                        <td>30-6-2025</td>
                                        <td className='flex'>
                                            <button className='btn btn-warning'>Suspend</button>
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

export default Customers