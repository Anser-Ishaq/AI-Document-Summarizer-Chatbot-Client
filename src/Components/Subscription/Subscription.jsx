import React from 'react'
import LeftSidebar from '../Chatbot/LeftSidebar'
import Navbar from '../Chatbot/Navbar'
import useModalStore from '../../Store/modalStore'
import Checkout from './Checkout'
import useAuthStore from '../../Store/authStore'


const Subscription = () => {
    const { openModal } = useModalStore()
    const { user } = useAuthStore()
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

                            {/* <!-- tabs area start --> */}
                            <div className="tab-area-pricing-two mt--30">
                                <div className="tab-content mt--20" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row g-5 mt--10">
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                {/* <!-- single pricing-area --> */}
                                                <div className="single-pricing-single-two">
                                                    <div className="head">
                                                        <span className="top">Basic</span>
                                                        <div className="date-use">
                                                            <h4 className="title">$0</h4>
                                                            <span>/month</span>
                                                        </div>
                                                    </div>
                                                    <div className="body">
                                                        <p className="para">Get started with our AI chatbot for free</p>

                                                        <div className="check-wrapper">
                                                            {/* <!-- single check --> */}
                                                            <div className="check-area">
                                                                <i className="fa-solid fa-check"></i>
                                                                <p>Chat with PDF only</p>
                                                            </div>
                                                            {/* <!-- single check end-->
                                                            <!-- single check --> */}
                                                            <div className="check-area">
                                                                <i className="fa-solid fa-check"></i>
                                                                <p>Can Upload a pdf upto 600kb</p>
                                                            </div>
                                                            {/* <!-- single check end-->
                                                            <!-- single check --> */}
                                                            <div className="check-area">
                                                                <i className="fa-solid fa-check"></i>
                                                                <p>All types of content</p>
                                                            </div>
                                                            {/* <!-- single check end-->
                                                            <!-- single check --> */}
                                                            <div className="check-area">
                                                                <i className="fa-solid fa-check"></i>
                                                                <p>Available in 10+ languages</p>
                                                            </div>
                                                            {/* <!-- single check end--> */}
                                                        </div>
                                                        <a href="" className="pricing-btn">Free For All</a>

                                                    </div>
                                                </div>
                                                {/* <!-- single pricing-area end --> */}
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                <div className="single-pricing-single-two active">
                                                    <div className="head">
                                                        <span className="top">Pro</span>
                                                        <div className="date-use">
                                                            <h4 className="title">$19.99</h4>
                                                            <span>/month</span>
                                                        </div>
                                                    </div>
                                                    <div className="body">
                                                        <p className="para">A premium pricing plan is a pricing <br /> structure that is designed.</p>

                                                        <div className="check-wrapper">
                                                            <div className="check-area">
                                                                <i className="fa-solid fa-check"></i>
                                                                <p>Inclues all perks of free plan</p>
                                                            </div>
                                                            <div className="check-area">
                                                                <i className="fa-solid fa-check"></i>
                                                                <p>Chat with txt file</p>
                                                            </div>
                                                            <div className="check-area">
                                                                <i className="fa-solid fa-check"></i>
                                                                <p>Chat with Docx file</p>
                                                            </div>
                                                            <div className="check-area">
                                                                <i className="fa-solid fa-check"></i>
                                                                <p>Chat with PNG images</p>
                                                            </div>
                                                            <div className="check-area">
                                                                <i className="fa-solid fa-check"></i>
                                                                <p>Chat with JPG / JPEG images</p>
                                                            </div>
                                                            <div className="check-area">
                                                                <i className="fa-solid fa-check"></i>
                                                                <p>All types of content</p>
                                                            </div>
                                                            <div className="check-area">
                                                                <i className="fa-solid fa-check"></i>
                                                                <p>OpenAI latest models</p>
                                                            </div>
                                                        </div>
                                                        {/* <a onClick={() => openModal(<Checkout />)} className="pricing-btn">Get Started</a> */}
                                                        <a
                                                            onClick={() => {
                                                                if (user?.status === "free") {
                                                                    openModal(<Checkout />);
                                                                }
                                                            }}
                                                            className={`pricing-btn ${user?.status !== "free" ? "cursor-not-allowed opacity-50" : ""}`}
                                                        >
                                                            {user?.status === "free" ? "Get Started" : "Current"}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- tabs area end --> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subscription