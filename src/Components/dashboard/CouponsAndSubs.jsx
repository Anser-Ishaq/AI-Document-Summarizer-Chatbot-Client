import React from 'react'
import Layout from '../../Layouts/AdminLayout'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CouponsForm from '../CouponsForm';
import AdminSubscription from '../AdminSubscription';
import SaleSubscription from '../SaleSubscription';
const CouponsAndSubs = () => {
    return (
        <>
            <Layout>
                <Tabs
                    defaultActiveKey="coupons"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="coupons" title="Coupons">
                        <CouponsForm />
                    </Tab>
                    <Tab eventKey="subscription" title="Manage Subscription">
                        <AdminSubscription />
                    </Tab>
                    <Tab eventKey="sale" title="Sale">
                        <SaleSubscription/>
                    </Tab>
                </Tabs>

            </Layout>
        </>
    )
}

export default CouponsAndSubs