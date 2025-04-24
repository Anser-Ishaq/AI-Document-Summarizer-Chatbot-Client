import React from 'react'
import Dynamic_Modal from '../Modal'
import useModalStore from '../../Store/modalStore'
import useAuthStore from '../../Store/authStore'
import { useNavigate } from 'react-router-dom'
import UploadAndChat from '../UploadAndChat'
const LeftSidebar = () => {
    const { openModal } = useModalStore()
    const navigate = useNavigate()
    const {logout} = useAuthStore()

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
                                <img src="/assets/images/icons/04.png" alt="icons" />
                            </div>
                            <p>AI Chat Bot</p>
                        </button>

                    </div>
                    <div className="single-menu-wrapper">

                        <button className="single-menu">
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
                <div className="bottom-user">
                    <div className="user-wrapper">
                        <img src="/assets/images/avatar/06.png" alt="avatar" />
                        <div className="info">
                            <h6 className="title">Anser Ishaq</h6>
                            <a href="#">anser@gmail.com</a>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LeftSidebar