import React from 'react'
import Dynamic_Modal from '../Modal'
import useModalStore from '../../Store/modalStore'
import useAuthStore from '../../Store/authStore'
import { Link, useNavigate } from 'react-router-dom'
import UploadAndChat from '../UploadAndChat'
import SettingTabs from '../SettingTabs'
const LeftSidebar = () => {
    const { openModal } = useModalStore()
    const navigate = useNavigate()
    const { user, logout } = useAuthStore()
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleSubs = () => {
        navigate("/manage-subscription")
    }

    return (
        <>
            <div className="left-side-bar">
                <div className="inner">

                    <div className="single-menu-wrapper">
                        <button onClick={() => openModal(<UploadAndChat />)} className="single-menu active">
                            <div className="icon">
                                <img src="/assets/images/logo/logo-02.png" alt="logo" />
                            </div>
                        </button>
                        {/* <Link to="/image/123" class="single-menu">
                            <div class="icon">
                                <img src="/assets/images/icons/05.png" alt="icons" />
                            </div>
                            <p>Image Chat Bot</p>
                        </Link> */}
                    </div>

                    <div className="single-menu-wrapper">

                        <Link to="/manage-subscription" class="single-menu">
                            <div class="icon">
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
                        <button onClick={handleLogout} className="single-menu">
                            <div className="icon">
                                <img src="/assets/images/icons/09.png" alt="icons" />
                            </div>
                            <p>Logout</p>
                        </button>
                        <Dynamic_Modal />
                    </div>
                </div>
                <div class="bottom-user">
                    <div class="user-wrapper">
                        {/* <img src="/assets/images/avatar/02.png" alt="avatar" /> */}
                        <div class="info">
                            <h6 class="title">{user.username}</h6>
                            <a href="#">{user.email}</a>
                        </div>
                        <span>{user.status}</span>
                    </div>
                    <div class="pro-upgrade">
                        <button onClick={handleSubs} class="rts-btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                            <img src="/assets/images/icons/14.png" alt="icons" />
                            {user.status == "pro" ? "Pro User" : "Upgrade To Pro"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftSidebar