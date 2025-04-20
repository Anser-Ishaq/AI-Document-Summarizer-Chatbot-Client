import React, { useEffect } from 'react'
import Helpers from '../../Config/Helpers';
import Example from '../Modal';

const Chatbot = () => {

    useEffect(() => {
        Helpers.loadScript("assets/js/main.js")
            .then(() => Helpers.loadScript("assets/js/plugins/jquery.min.js"))
            .then(() => Helpers.loadScript("assets/js/plugins/swiper.js"))
            .then(() => Helpers.loadScript("assets/js/plugins/bootstrap.min.js"))
            .catch((error) => console.error("Script loading failed: ", error));
    }, []);
    return (
        <>
            <div className="dash-board-main-wrapper">
                <div className="left-side-bar">
                    <div className="inner">
                        {/* <div className="single-menu-wrapper">
                            <a href="#" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/01.png" alt="icons" />
                                </div>
                                <p>Home</p>
                            </a>
                            <a href="#" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/02.png" alt="icons" />
                                </div>
                                <p>Community Feed</p>
                            </a>
                            <a href="#" className="single-menu ">
                                <div className="icon">
                                    <img src="/assets/images/icons/03.png" alt="icons" />
                                </div>
                                <p>Manage Subscription</p>
                            </a>
                        </div> */}
                        <div className="single-menu-wrapper">
                            <a href="/" className="single-menu active">
                                <div className="icon">
                                    <img src="/assets/images/icons/04.png" alt="icons" />
                                </div>
                                <p>AI Chat Bot</p>
                            </a>
                            {/* <a href="#" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/05.png" alt="icons" />
                                </div>
                                <p>Image Generator</p>
                            </a>
                            <a href="#" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/06.png" alt="icons" />
                                </div>
                                <p>Voice Generate</p>
                            </a> */}
                        </div>
                        <div className="single-menu-wrapper">
                            {/* <a href="#" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/07.png" alt="icons" />
                                </div>
                                <p>Register</p>
                            </a> */}
                            {/* <a
                                className="collapse-btn collapsed single-menu"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseExample"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                            >
                                <div className="icon">
                                    <img src="/assets/images/icons/08.png" alt="icons" />
                                </div>
                                <p>Settings</p>
                            </a>
                            <div className="collapse" id="collapseExample">
                                <ul className="submenu rts-default-sidebar-list">
                                    <li>
                                        <a href="#">
                                            <i className="fa-sharp fa-regular fa-user"></i>
                                            <span>FAQ</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa-sharp fa-regular fa-user"></i>
                                            <span>Login</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa-sharp fa-regular fa-user"></i>
                                            <span>Reset Password</span>
                                        </a>
                                    </li>
                                </ul>
                            </div> */}
                            <a href="#" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/08.png" alt="icons" />
                                </div>
                                <p>Settings</p>
                            </a>
                            <a href="/login" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/09.png" alt="icons" />
                                </div>
                                <p>Logout</p>
                            </a>
                        </div>
                    </div>
                    <div className="bottom-user">
                        <div className="user-wrapper">
                            <img src="/assets/images/avatar/06.png" alt="avatar" />
                            <div className="info">
                                <h6 className="title">Anser Ishaq</h6>
                                <a href="#">anser@gmail.com</a>
                            </div>
                            {/* <span>Free</span> */}
                        </div>
                        {/* <div className="pro-upgrade">
                            <button className="rts-btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                                <img src="/assets/images/icons/14.png" alt="icons" />
                                Upgrade To Pro
                            </button>
                        </div> */}
                    </div>
                </div>
                <div className="main-center-content-m-left center-content search-sticky">
                    <div className="question_answer__wrapper__chatbot">
                        <div className="single__question__answer">
                            <div className="question_user">
                                <div className="left_user_info">
                                    <img src="/assets/images/avatar/06.png" alt="avatar" />
                                    <div className="question__user">what is AI DOCUMENT Summarizer?</div>
                                </div>
                                <div className="edit__icon openuptip" tooltip="Edit It">
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </div>
                            </div>
                            <div className="answer__area">
                                <div className="thumbnail">
                                    <img src="/assets/images/avatar/04.png" alt="avatar" />
                                </div>
                                <div className="answer_main__wrapper">
                                    <h4 className="common__title">Document Summarizer</h4>
                                    <p className="disc">
                                        The Open Unified Process, is a simplified version of the Rational Unified Process (RUP) used for agile and iterative software development. It was developed within the Eclipse Foundation and is based on the donation of process content by IBM. OpenUP targets small and colocated teams interested in agile and iterative development and is a lean Unified Process that applies iterative and incremental approaches within a structured lifecycle. It embraces a pragmatic approach and is positioned as an easy and flexible version of RUP [1][2][3]
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div className="single__question__answer">
                            <div className="question_user">
                                <div className="left_user_info">
                                    <img src="/assets/images/avatar/06.png" alt="avatar" />
                                    <div className="question__user">what is AI DOCUMENT Summarizer?</div>
                                </div>
                                <div className="edit__icon openuptip" tooltip="Edit It">
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </div>
                            </div>
                            <div className="answer__area">
                                <div className="thumbnail">
                                    <img src="/assets/images/avatar/04.png" alt="avatar" />
                                </div>
                                <div className="answer_main__wrapper">
                                    <h4 className="common__title">Document Summarizer</h4>
                                    <p className="disc">
                                        The Document Summarizer Unified Process, is a simplified version of the Rational Unified Process (RUP) used for agile and iterative software development. It was developed within the Eclipse Foundation and is based on the donation of process content by IBM. OpenUP targets small and colocated teams interested in agile and iterative development and is a lean Unified Process that applies iterative and incremental approaches within a structured lifecycle. It embraces a pragmatic approach and is positioned as an easy and flexible version of RUP [1][2][3]
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <form action="#" className="search-form">
                        <input type="text" placeholder="Message Doc Summarizer..." />
                        <button><i className="fa-regular fa-arrow-up"></i></button>
                    </form>
                    <div className="copyright-area-bottom">
                        <p> <a href="#">AI DOC Summarizer©</a> 2025. All Rights Reserved.</p>
                    </div>
                </div>
                <div className="right-side-bar-new-chat-option">
                    <div className="new-chat-option">
                        <img src="/assets/images/logo/logo-02.png" alt="logo" />
                        <img src="/assets/images/icons/04.png" alt="icons" />
                    </div>
                    <div className="chat-history-wrapper">
                        <div className="chat-history-area-start">
                            <h6 className="title">Today</h6>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>ranking water is essential</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>These foods are calorie</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>If you're struggling to</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                        </div>
                        <div className="chat-history-area-start">
                            <h6 className="title">Yesterday</h6>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>ranking water is essential</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>These foods are calorie</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>If you're struggling to</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                        </div>
                        <div className="chat-history-area-start">
                            <h6 className="title">11/03/2024</h6>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>ranking water is essential</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>These foods are calorie</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>If you're struggling to</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                        </div>
                        <div className="chat-history-area-start">
                            <h6 className="title">28/04/2024</h6>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>ranking water is essential</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>These foods are calorie</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>If you're struggling to</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                        </div>
                    </div>
                    <div className="right-side-open-clouse" id="collups-right">
                        <img src="/assets/images/icons/01.svg" alt="icons" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chatbot