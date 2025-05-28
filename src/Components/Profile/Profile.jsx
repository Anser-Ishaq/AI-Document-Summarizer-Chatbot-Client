import React, { useEffect, useState } from 'react'
import LeftSidebar from '../Chatbot/LeftSidebar'
import Navbar from '../Chatbot/Navbar'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import { changeUserNameByUserId, getUserById } from '../../api/authApi';
import useAuthStore from '../../Store/authStore';
import useAlert from '../../Hooks/useAlerts';
const Profile = () => {
    const { user } = useAuthStore();
    const [userNameInput, setUserNameInput] = useState(user?.username || '');
    const [theme, setTheme] = useState(() => localStorage.getItem('fluxi-theme') || 'light');
    const { showError, showSuccess } = useAlert()

    const handleUserName = async (e) => {
        e.preventDefault();
        if (userNameInput === user.username) {
            showError("No changes made");
            return;
        }
        try {
            const res = await changeUserNameByUserId(user.id, userNameInput);
            const updatedUser = { ...user, username: userNameInput };
            useAuthStore.getState().setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            showSuccess("Username updated successfully");
        } catch (err) {
            showError(err.response?.data?.message || "Failed to update username");
        }
    };

    const handleThemeChange = (selectedTheme) => {
        setTheme(selectedTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('fluxi-theme', theme);
    }, [theme]);
    return (
        <>
            <Navbar />
            <div className="dash-board-main-wrapper">
                <LeftSidebar />
                <div className="main-center-content-m-left center-content search-sticky" style={{maxWidth:"100%"}}>
                    <Form onSubmit={handleUserName}>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control placeholder={user.email} style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} disabled />
                        </Form.Group>

                        <Form.Group style={{position:"relative"}} className="mb-3" controlId="formGridAddress2">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                value={userNameInput}
                                onChange={(e) => setUserNameInput(e.target.value)}
                                style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} 
                                
                                
                                />
                            <div style={{position:"absolute", top:0,right:0}} class="edit__icon openuptip" tooltip="Edit It">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </div>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Status</Form.Label>
                                <Form.Control placeholder={user.role === "admin" ? "ADMIN": user.status} disabled style={{ border: "1px solid #3F3EED", background: "#F7F7FF" }} />
                            </Form.Group>
                        </Row>

                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Profile