import React, { useEffect } from 'react'
import LeftSidebar from '../Chatbot/LeftSidebar'
import Navbar from '../Chatbot/Navbar'
import useModalStore from '../../Store/modalStore'
import Checkout from './Checkout'
import useAuthStore from '../../Store/authStore'
import useStripeStore from '../../Store/stripeStore'


const Subscription = () => {
    const { openModal } = useModalStore()
    const { user } = useAuthStore()
    const { plans, fetchPlans } = useStripeStore()

    useEffect(() => {
        fetchPlans();
    }, []);

    // Dynamically decide column size
    const colClass = plans.length === 2 ? 'col-lg-6' : 'col-lg-4';
    return (
        <>
            <Navbar />
            <div className="dash-board-main-wrapper">
                <LeftSidebar />
                <div className="main-center-content-m-left">
                    <div className="pricing-plane-area rts-section-gapBottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-lgl-12">
                                    <div className="title-conter-area">
                                        <h2 className="title">
                                            Manage Subscription
                                        </h2>
                                        <span className="pre-title-bg">Want to get more out of AI? Subscribe to one of our professional plans.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-area-pricing-two mt--30">
                                <div className="tab-content mt--20" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row g-5 mt--10">
                                            {plans.map((plan) => (
                                                <div className={`${colClass} col-md-6 col-sm-12 col-12`} key={plan.id}>
                                                    <div className={`single-pricing-single-two ${user?.status === plan.name.toLowerCase() ? 'active' : ''}`}>
                                                        <div className="head">
                                                            <span className="top">{plan.name}</span>
                                                            <div className="date-use">
                                                                <h4 className="title">${plan.price}</h4>
                                                                <span>/{plan.interval}</span>
                                                            </div>
                                                        </div>
                                                        <div className="body">
                                                            <p style={{ whiteSpace: "pre-line" }} className="para">{plan.description}</p>
                                                            <a
                                                                onClick={() => {
                                                                        openModal(<Checkout planPrice={plan.price} planName={plan.name} planId={plan.id} planInterval={plan.interval} />);
                                                                }}
                                                                className={`pricing-btn ${user?.status === plan.name.toLowerCase() ? 'cursor-not-allowed opacity-50' : ''}`}
                                                            >
                                                                {user?.status === plan.name.toLowerCase() ? 'Current' : plan.name === 'Free' ? 'Free For All' : 'Get Started'}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subscription