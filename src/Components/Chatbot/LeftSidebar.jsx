import React from 'react'
import Dynamic_Modal from '../Modal'
import useModalStore from '../../Store/modalStore'
import useAuthStore from '../../Store/authStore'
import { useNavigate } from 'react-router-dom'
import UploadAndChat from '../UploadAndChat'
import SettingTabs from '../SettingTabs'
const LeftSidebar = () => {
    const { openModal } = useModalStore()
    const navigate = useNavigate()
    const {user,logout} = useAuthStore()
    const userName = localStorage.getItem("userName")
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <div className="left-side-bar">
                <div className="inner">

                    <div className="single-menu-wrapper">
                        <button onClick={() => openModal(<UploadAndChat />)} className="single-menu active">
                            <div className="icon">
                                <img src="/assets/images/logo/logo-02.png" alt="logo"/>
                            </div>
                        </button>

                    </div>
                    <div className="single-menu-wrapper">

                        {/* <button onClick={() => openModal(<SettingTabs />)} className="single-menu">
                            <div className="icon">
                                <img src="/assets/images/icons/08.png" alt="icons" />
                            </div>
                            <p>Settings</p>
                        </button> */}
                        <button onClick={handleLogout} className="single-menu">
                            <div className="icon">
                                <img src="/assets/images/icons/09.png" alt="icons" />
                            </div>
                            <p>Logout</p>
                        </button>
                        <Dynamic_Modal />
                    </div>
                </div>
                {/* <div className="bottom-user">
                    <div className="user-wrapper">
                        <div className="info">
                            <h6 className="title">{userName}</h6>
                            <p>{user.email}</p>
                        </div>
                    </div>

                </div> */}
            </div>
        </>
    )
}

export default LeftSidebar