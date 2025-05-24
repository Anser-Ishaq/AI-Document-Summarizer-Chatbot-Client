import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import useAuthStore from '../../Store/authStore';
import { createSubscription, createSubscriptionAfterSetup } from '../../api/stripeApi';

const stripePromise = loadStripe('pk_test_51RLVE5Rf72IVJJINZuOfTM08fyXYTAPZb3SE7NKQJpi3Cnirw3wlz3qPsakMSkFrY9eBpAm3GniCNHy6CewoFEAg00Ctj7KOmg');

function CheckoutForm({ clientSecret, customerId,user }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);
        setMessage('');

        const cardElement = elements.getElement(CardElement);

        try {
            // Confirm the setup intent with card element
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

                // Now create the subscription
                try {
                    console.log('Creating subscription with:', { customerId, paymentMethod: setupIntent.payment_method });

                    const subscriptionResult = await createSubscriptionAfterSetup({
                        customerId: customerId,
                        paymentMethodId: setupIntent.payment_method
                    });

                    console.log('Subscription result:', subscriptionResult);

                    if (subscriptionResult.success) {
                        setMessage('Subscription created successfully! Welcome to Pro!');
                        console.log('✅ Subscription created successfully, user should now be Pro');
                        const updatedUser = { ...user, status: 'pro' };
                        localStorage.setItem('user', JSON.stringify(updatedUser));
                        // Optionally redirect or update UI state
                        setTimeout(() => {
                            window.location.reload(); // or navigate to dashboard
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
            <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
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
                    marginTop: '20px',
                    padding: '12px 24px',
                    backgroundColor: processing ? '#ccc' : '#5469d4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: processing ? 'not-allowed' : 'pointer'
                }}
            >
                {processing ? 'Processing...' : 'Subscribe to Pro ($19.99/month)'}
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

export default function Checkout() {
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
                    email: user.email
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
                <h2>Get pro plan</h2>
                <div>Loading payment form...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <h2>Get pro plan</h2>
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
            <h2>Get pro plan</h2>
            <p>Get access to premium features for $19.99/month</p>

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
                    />
                </Elements>
            ) : (
                <div>Unable to load payment form. Please try again.</div>
            )}
        </div>
    );
}