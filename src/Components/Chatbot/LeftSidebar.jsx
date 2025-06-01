import React from 'react'
import Dynamic_Modal from '../Modal'
import useModalStore from '../../Store/modalStore'
import useAuthStore from '../../Store/authStore'
import { Link, useNavigate } from 'react-router-dom'
import UploadAndChat from '../UploadAndChat'
import SettingTabs from '../SettingTabs'
const LeftSidebar = () => {
    const { openModal } = useModalStore();
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleSubs = () => {
        navigate("/manage-subscription");
    };

    if (!user) return null; // handle case where user is not loaded

    return (
        <div className="left-side-bar">
            <div className="inner">
                {user.role == 'user' &&
                    <div className="single-menu-wrapper">
                        <button onClick={() => openModal(<UploadAndChat />)} className="single-menu active">
                            <div className="icon">
                                <img src="/assets/images/logo/logo-02.png" alt="logo" />
                            </div>
                        </button>
                    </div>
                }

                <div className="single-menu-wrapper">
                    {user.role === "user" ? (
                        <>
                            <Link to="/manage-subscription" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/03.png" alt="icons" />
                                </div>
                                <p>Manage Subscription</p>
                            </Link>
                            <button onClick={() => openModal(<SettingTabs />)} className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/08.png" alt="icons" />
                                </div>
                                <p>Settings</p>
                            </button>
                        </>
                    ) : user.role === "admin" ? (
                        <>
                            <Link to="/admin" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/01.png" alt="admin" />
                                </div>
                                <p>Admin Dashboard</p>
                            </Link>
                            <Link to="/admin/customers" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/02.png" alt="users" />
                                </div>
                                <p>Manage Users</p>
                            </Link>
                            <Link to="/admin/all-coupons" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/17.png" alt="users" />
                                </div>
                                <p>Coupons</p>
                            </Link>
                            <Link to="/admin/all-plans" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/19.png" alt="users" />
                                </div>
                                <p>Subscription Plans</p>
                            </Link>
                            <Link to="/admin/coupons" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/20.png" alt="users" />
                                </div>
                                <p>Add Coupons & Subs</p>
                            </Link>
                        </>
                    ) : null}

                    <button onClick={handleLogout} className="single-menu">
                        <div className="icon">
                            <img src="/assets/images/icons/09.png" alt="icons" />
                        </div>
                        <p>Logout</p>
                    </button>

                    <Dynamic_Modal />
                </div>
            </div>

            <div className="bottom-user">
                <div className="user-wrapper">
                    <div className="info">
                        <h6 className="title">{user.username}</h6>
                        <a href="#">{user.email}</a>
                    </div>
                    <span>{user.role == "user" ? user.status : user.role}</span>
                </div>

                {user.role === "user" && (
                    <div className="pro-upgrade">
                        <button
                            onClick={handleSubs}
                            className="rts-btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        >
                            <img src="/assets/images/icons/14.png" alt="icons" />
                            {user.status === "pro" ? "Pro User" : "Upgrade To Pro"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


export default LeftSidebar