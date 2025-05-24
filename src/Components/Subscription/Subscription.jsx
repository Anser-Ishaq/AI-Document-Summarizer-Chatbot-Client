import React from 'react'
import LeftSidebar from '../Chatbot/LeftSidebar'
import Navbar from '../Chatbot/Navbar'
import useModalStore from '../../Store/modalStore'
import Checkout from './Checkout'


const Subscription = () => {
    const {openModal} = useModalStore()
    return (
        <>
            <Navbar />
            <div className="dash-board-main-wrapper">
                <LeftSidebar />
                <div class="main-center-content-m-left">
                    <div class="pricing-plane-area rts-section-gapBottom">
                        <div class="container">
                            <div class="row">
                                <div class="col-lgl-12">
                                    <div class="title-conter-area">
                                        <h2 class="title">
                                            Manage Subscription
                                        </h2>
                                        <span class="pre-title-bg">Want to get more out of AI? Subscribe to one of our professional plans.</span>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- tabs area start --> */}
                            <div class="tab-area-pricing-two mt--30">
                                <div class="tab-content mt--20" id="myTabContent">
                                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row g-5 mt--10">
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                {/* <!-- single pricing-area --> */}
                                                <div class="single-pricing-single-two">
                                                    <div class="head">
                                                        <span class="top">Basic</span>
                                                        <div class="date-use">
                                                            <h4 class="title">$Free</h4>
                                                            <span>/month</span>
                                                        </div>
                                                    </div>
                                                    <div class="body">
                                                        <p class="para">A premium pricing plan is a pricing <br /> structure that is designed.</p>

                                                        <div class="check-wrapper">
                                                            {/* <!-- single check --> */}
                                                            <div class="check-area">
                                                                <i class="fa-solid fa-check"></i>
                                                                <p>10,000 Monthly Word Limit</p>
                                                            </div>
                                                            {/* <!-- single check end-->
                                                            <!-- single check --> */}
                                                            <div class="check-area">
                                                                <i class="fa-solid fa-check"></i>
                                                                <p>10+ Templates</p>
                                                            </div>
                                                            {/* <!-- single check end-->
                                                            <!-- single check --> */}
                                                            <div class="check-area">
                                                                <i class="fa-solid fa-check"></i>
                                                                <p>All types of content</p>
                                                            </div>
                                                            {/* <!-- single check end-->
                                                            <!-- single check --> */}
                                                            <div class="check-area">
                                                                <i class="fa-solid fa-check"></i>
                                                                <p>10+ Languages</p>
                                                            </div>
                                                            {/* <!-- single check end--> */}
                                                        </div>
                                                        <a href="#" class="pricing-btn">Current Get Started</a>
                                                    </div>
                                                </div>
                                                {/* <!-- single pricing-area end --> */}
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                {/* <!-- single pricing-area --> */}
                                                <div class="single-pricing-single-two active">
                                                    <div class="head">
                                                        <span class="top">Pro</span>
                                                        <div class="date-use">
                                                            <h4 class="title">$19.99</h4>
                                                            <span>/Year</span>
                                                        </div>
                                                    </div>
                                                    <div class="body">
                                                        <p class="para">A premium pricing plan is a pricing <br /> structure that is designed.</p>

                                                        <div class="check-wrapper">
                                                            {/* <!-- single check --> */}
                                                            <div class="check-area">
                                                                <i class="fa-solid fa-check"></i>
                                                                <p>60,000 Monthly Word Limit</p>
                                                            </div>
                                                            {/* <!-- single check end-->
                                                            <!-- single check --> */}
                                                            <div class="check-area">
                                                                <i class="fa-solid fa-check"></i>
                                                                <p>60+ Templates</p>
                                                            </div>
                                                            {/* <!-- single check end-->
                                                            <!-- single check --> */}
                                                            <div class="check-area">
                                                                <i class="fa-solid fa-check"></i>
                                                                <p>All types of content</p>
                                                            </div>
                                                            {/* <!-- single check end--> */}
                                                            {/* <!-- single check --> */}
                                                            <div class="check-area">
                                                                <i class="fa-solid fa-check"></i>
                                                                <p>60+ Languages</p>
                                                            </div>
                                                            {/* <!-- single check end--> */}
                                                        </div>
                                                        <a onClick={() => openModal(<Checkout />)} class="pricing-btn">Get Started</a>
                                                    </div>
                                                </div>
                                                {/* <!-- single pricing-area end --> */}
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