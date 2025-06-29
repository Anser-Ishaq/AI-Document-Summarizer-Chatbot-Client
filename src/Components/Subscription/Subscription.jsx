import React, { useEffect } from 'react'
import LeftSidebar from '../Chatbot/LeftSidebar'
import Navbar from '../Chatbot/Navbar'
import useModalStore from '../../Store/modalStore'
import Checkout from './Checkout'
import useAuthStore from '../../Store/authStore'
import useStripeStore from '../../Store/stripeStore'
import useAlert from '../../Hooks/useAlerts'
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

const Subscription = () => {
    const { openModal } = useModalStore()
    const { user, subscription } = useAuthStore()
    const { plans, fetchPlans } = useStripeStore()
    const { showSuccess, showError } = useAlert()

    useEffect(() => {
        fetchPlans();
    }, []);

    // Get the current plan name, considering active/canceled/free status
    const getCurrentPlanName = () => {
        if (subscription?.status === 'active') {
            return subscription?.plan?.name;
        }
        if (subscription?.status === 'canceled' || subscription?.status === 'cancelled') {
            return 'Free (cancelled subscription)';
        }
        return 'Free';
    };

    // Check if user can subscribe to a new plan
    const canSubscribeToPlan = (plan) => {
        // If no subscription or free plan, can subscribe to any paid plan
        if (!subscription || subscription?.status === 'canceled' || subscription?.status === 'cancelled') {
            return plan.name !== 'Free';
        }
        
        // If active subscription, can only subscribe to different plan after canceling
        if (subscription?.status === 'active') {
            return false;
        }
        
        return true;
    };

    const handlePlanClick = (plan) => {
        // If user is already on this plan (active or canceled)
        if (subscription?.plan_id === plan.id) {
            const statusMessage = subscription?.status === 'active' ? 
                `You're currently subscribed to the ${plan.name} plan` :
                `Your ${plan.name} plan has been canceled`;
            showError(statusMessage);
            return;
        }

        // If user has an active subscription and tries to subscribe to a different plan
        if (subscription?.status === 'active') {
            showError(`You're currently subscribed to the ${subscription?.plan?.name} plan. Please cancel it before switching.`);
            return;
        }

        // Open checkout modal for new subscription
        openModal(<Checkout planPrice={plan.price} planName={plan.name} planId={plan.id} planInterval={plan.interval} />);
    }

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
                                        <div className="current-plan-banner">
                                            Current Plan: <strong>{getCurrentPlanName()}</strong>
                                            {subscription?.status === 'canceled' || subscription?.status === 'cancelled' ? (
                                                <span> (access until {new Date(subscription.current_period_end).toLocaleDateString()})</span>
                                            ) : null}
                                        </div>
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
                                                    <div className={`single-pricing-single-two ${subscription?.plan_id === plan.id ? 'active' : ''}`}>
                                                        <div className="head">
                                                            <span className="top">{plan.name}</span>
                                                            {subscription?.plan_id === plan.id && (
                                                                <Stack direction="horizontal" gap={2}>
                                                                    <Badge bg={subscription?.status === 'active' ? 'success' : 'secondary'}>
                                                                        {subscription?.status === 'active' ? 'Current Plan' : 'Canceled Plan'}
                                                                    </Badge>
                                                                </Stack>
                                                            )}
                                                            <div className="date-use">
                                                                <h4 className="title">${plan.price}</h4>
                                                                <span>/{plan.interval}</span>
                                                            </div>
                                                        </div>
                                                        <div className="body">
                                                            <p style={{ whiteSpace: "pre-line" }} className="para">{plan.description}</p>
                                                            <a
                                                                onClick={() => handlePlanClick(plan)}
                                                                className={`pricing-btn ${
                                                                    !canSubscribeToPlan(plan) ? 
                                                                    'cursor-not-allowed opacity-50' : 
                                                                    ''
                                                                }`}
                                                            >
                                                                {subscription?.plan_id === plan.id
                                                                    ? (subscription?.status === 'active' ? 'Current Plan' : 'Plan Canceled')
                                                                    : plan.name === 'Free'
                                                                        ? 'Free For All'
                                                                        : 'Get Started'}
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