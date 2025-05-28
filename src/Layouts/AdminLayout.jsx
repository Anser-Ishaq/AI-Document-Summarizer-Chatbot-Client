import React from 'react'
import Navbar from '../Components/Chatbot/Navbar'
import LeftSidebar from '../Components/Chatbot/LeftSidebar'
import { Outlet } from 'react-router-dom';
const Layout = ({ children }) => {
    console.log("✅ Admin Layout loaded");

    return (
        <>
            <Navbar />
            <div className="dash-board-main-wrapper">
                <LeftSidebar />
                <div
                    className="main-center-content-m-left center-content search-sticky"
                    style={{ maxWidth: '100%' }}
                >
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout