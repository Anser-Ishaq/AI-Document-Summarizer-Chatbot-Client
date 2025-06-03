import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import useAuthStore from '../../Store/authStore';
import { createSubscription, createSubscriptionAfterSetup, validateCoupons } from '../../api/stripeApi';

const stripePromise = loadStripe('pk_test_51RLVE5Rf72IVJJINZuOfTM08fyXYTAPZb3SE7NKQJpi3Cnirw3wlz3qPsakMSkFrY9eBpAm3GniCNHy6CewoFEAg00Ctj7KOmg');

function CheckoutForm({ clientSecret, customerId, user, planId, planName, planPrice, planInterval }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');
    const [processing, setProcessing] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [validatingCoupon, setValidatingCoupon] = useState(false);
    const [couponData, setCouponData] = useState(null);
    const [couponError, setCouponError] = useState('');

    const validateCouponCode = async () => {
        if (!couponCode.trim()) {
            setCouponError('');
            setCouponData(null);
            return;
        }

        setValidatingCoupon(true);
        setCouponError('');

        try {
            const response = await validateCoupons(couponCode.trim());
            
            if (response.success) {
                setCouponData(response.data);
                setCouponError('');
            } else {
                setCouponError(response.message || 'Invalid coupon code');
                setCouponData(null);
            }
        } catch (error) {
            setCouponError('Invalid coupon code');
            setCouponData(null);
        } finally {
            setValidatingCoupon(false);
        }
    };

    const handleCouponChange = (e) => {
        setCouponCode(e.target.value);
        if (couponData || couponError) {
            setCouponData(null);
            setCouponError('');
        }
    };

    const calculateDiscountedPrice = () => {
        if (!couponData) return planPrice;
        
        if (couponData.discountType === 'percentage') {
            return (planPrice * (1 - couponData.discountValue / 100)).toFixed(2);
        } else if (couponData.discountType === 'fixed') {
            return Math.max(0, planPrice - couponData.discountValue).toFixed(2);
        }
        
        return planPrice;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);
        setMessage('');

        const cardElement = elements.getElement(CardElement);

        try {
            const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
                payment_method: {
                    card: cardElement,
                }
            });

            if (error) {
                setMessage(error.message);
                setProcessing(false);
                return;
            }

            if (setupIntent && setupIntent.status === 'succeeded') {
                setMessage('Payment method saved successfully!');

                try {
                    console.log('Creating subscription with:', { 
                        customerId, 
                        paymentMethod: setupIntent.payment_method,
                        coupon: couponData?.stripeCouponId 
                    });

                    const subscriptionResult = await createSubscriptionAfterSetup({
                        customerId: customerId,
                        paymentMethodId: setupIntent.payment_method,
                        couponCode: couponData?.stripeCouponId // Pass the coupon code if available
                    });

                    console.log('Subscription result:', subscriptionResult);

                    if (subscriptionResult.success) {
                        setMessage('Subscription created successfully! Welcome to Pro!');
                        console.log('✅ Subscription created successfully, user should now be Pro');
                        const updatedUser = { ...user, status: 'pro' };
                        localStorage.setItem('user', JSON.stringify(updatedUser));
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else {
                        console.error('Subscription creation failed:', subscriptionResult);
                        setMessage('Payment method saved, but subscription creation failed. Please contact support.');
                    }
                } catch (subscriptionError) {
                    console.error('Subscription creation error:', subscriptionError);
                    setMessage('Payment method saved, but subscription creation failed. Please contact support.');
                }
            }
        } catch (err) {
            console.error('Setup intent confirmation error:', err);
            setMessage('An unexpected error occurred. Please try again.');
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Coupon Code Section */}
            <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#374151' 
                }}>
                    Coupon Code (Optional)
                </label>
                <div style={{ display: 'flex', gap: '10px', flexDirection:"column" }}>
                    <input
                        type="text"
                        value={couponCode}
                        onChange={handleCouponChange}
                        placeholder="Enter coupon code"
                        style={{
                            flex: '1',
                            padding: '12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#5469d4'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    <button
                        type="button"
                        onClick={validateCouponCode}
                        disabled={!couponCode.trim() || validatingCoupon}
                        style={{
                            padding: '12px 20px',
                            backgroundColor: validatingCoupon ? '#9ca3af' : '#6b7280',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: validatingCoupon || !couponCode.trim() ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            minWidth: '80px'
                        }}
                    >
                        {validatingCoupon ? '...' : 'Apply'}
                    </button>
                </div>
                
                {/* Coupon Validation Messages */}
                {couponError && (
                    <div style={{
                        marginTop: '8px',
                        padding: '8px 12px',
                        backgroundColor: '#fef2f2',
                        color: '#dc2626',
                        borderRadius: '4px',
                        fontSize: '14px',
                        border: '1px solid #fecaca'
                    }}>
                        {couponError}
                    </div>
                )}
                
                {couponData && (
                    <div style={{
                        marginTop: '8px',
                        padding: '8px 12px',
                        backgroundColor: '#f0fdf4',
                        color: '#16a34a',
                        borderRadius: '4px',
                        fontSize: '14px',
                        border: '1px solid #bbf7d0'
                    }}>
                        ✓ Coupon "{couponData.code}" applied! {couponData.name}
                        <br />
                        <small>{couponData.description}</small>
                    </div>
                )}
            </div>

            {/* Price Summary */}
            {couponData && (
                <div style={{
                    marginBottom: '20px',
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Original Price:</span>
                        <span style={{ textDecoration: 'line-through', color: '#6b7280' }}>
                            ${planPrice}/{planInterval}
                        </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Discount ({couponData.discountType === 'percentage' ? `${couponData.discountValue}%` : `$${couponData.discountValue}`}):</span>
                        <span style={{ color: '#16a34a' }}>
                            -${(planPrice - calculateDiscountedPrice()).toFixed(2)}
                        </span>
                    </div>
                    <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                        <span>Total:</span>
                        <span>${calculateDiscountedPrice()}/{planInterval}</span>
                    </div>
                </div>
            )}

            {/* Card Element */}
            <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                        },
                    }}
                />
            </div>

            <button
                type="submit"
                disabled={!stripe || processing}
                style={{
                    width: '100%',
                    padding: '12px 24px',
                    backgroundColor: processing ? '#ccc' : '#5469d4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: processing ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                }}
            >
                {processing ? 'Processing...' : 
                    `Subscribe to ${planName} (${couponData ? `$${calculateDiscountedPrice()}` : `$${planPrice}`}/${planInterval})`
                }
            </button>
            
            {message && (
                <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
                    color: message.includes('successfully') ? '#155724' : '#721c24',
                    borderRadius: '4px'
                }}>
                    {message}
                </div>
            )}
        </form>
    );
}

export default function Checkout({ planPrice, planName, planId, planInterval }) {
    const [clientSecret, setClientSecret] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuthStore();

    useEffect(() => {
        async function fetchClientSecret() {
            try {
                setLoading(true);
                setError('');

                const data = await createSubscription({
                    userId: user.id,
                    email: user.email,
                    planId: planId
                });

                if (data.success) {
                    setClientSecret(data.data.clientSecret);
                    setCustomerId(data.data.customerId);
                } else {
                    console.error('Failed to get client secret:', data.message);
                    setError(data.message || 'Failed to initialize payment');
                }
            } catch (error) {
                console.error('Error creating subscription:', error);
                setError(error.message || 'Error initializing payment');
            } finally {
                setLoading(false);
            }
        }

        if (user?.id && user?.email) {
            fetchClientSecret();
        }
    }, [user]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <h2>Get {planName} plan</h2>
                <div>Loading payment form...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <h2>Get {planName} plan</h2>
                <div style={{ color: 'red', marginBottom: '20px' }}>
                    Error: {error}
                </div>
                <button
                    onClick={() => window.location.reload()}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h2>Get {planName} plan</h2>
            <p>Get access to premium features for ${planPrice}/{planInterval}</p>

            {clientSecret && customerId ? (
                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret,
                        appearance: {
                            theme: 'stripe'
                        }
                    }}
                >
                    <CheckoutForm
                        clientSecret={clientSecret}
                        customerId={customerId}
                        user={user}
                        planPrice={planPrice}
                        planName={planName}
                        planId={planId}
                        planInterval={planInterval}
                    />
                </Elements>
            ) : (
                <div>Unable to load payment form. Please try again.</div>
            )}
        </div>
    );
}