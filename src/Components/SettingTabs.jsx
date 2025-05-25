import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import useAlert from '../Hooks/useAlerts';
import { ActionRow } from '../UI/TabButtons';
import useAuthStore from '../Store/authStore';
import { deleteAllUserChats } from '../api/documentsApi';
import { useNavigate } from 'react-router-dom';
import useChatStore from '../Store/chatStore';
import { exportChatsToPDF } from '../Utils/ExportChats';
import { deleteAccount } from '../api/authApi';
function SettingTabs() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
    const { showError, showSuccess } = useAlert()
    const { user,logout } = useAuthStore()
    const { setChatId, resetChatData, chatMessagesData } = useChatStore()
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteResult, setDeleteResult] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    console.log("chatMessagesData from settings", chatMessagesData)

    // Handle screen size changes
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 576);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Action handlers - replace with your actual logic
    const handleDeleteAllChats = async () => {
        // Confirm with the user before proceeding
        const confirmDelete = window.confirm(
            'Are you sure you want to delete all your chats? This action cannot be undone.'
        );

        if (!confirmDelete) return;

        try {
            setIsDeleting(true);
            setError(null);

            // Call the API function to delete all chats
            const result = await deleteAllUserChats(user.id);
            resetChatData();
            setDeleteResult(result);
            console.log('All chats deleted successfully:', result);
            showSuccess(result.message)
            setChatId(null); // Make sure this is the same function from useChatStore
            localStorage.removeItem("chatId");
            localStorage.removeItem("documentId");
            navigate("/", { replace: true })

        } catch (err) {
            console.error('Failed to delete chats:', err);
            setError(err.response?.data?.message || 'Failed to delete chats');
            showError(err.response?.data?.message || 'Failed to delete chats')
        } finally {
            setIsDeleting(false);
        }
    };

    const handleLogout = () => {
        logout()
        console.log('Logout clicked');
        showSuccess("Logged out successfully");
        navigate("/login")

        // Implement your logout logic here
    };

    const handleExportChats = async () => {
        try {
            if (!chatMessagesData || !chatMessagesData.messages || chatMessagesData.messages.length === 0) {
                showError('No chat data available to export.');
                return;
            }

            // Wrap in array because exportChatsToPDF expects an array of chat objects
            await exportChatsToPDF([chatMessagesData], user.id);
            showSuccess('Chats exported successfully');
        } catch (error) {
            console.error('Error exporting chats:', error);
            showError('Failed to export chats');
        }
    };
    // const handleDeleteAccount = async () => {
    //         localStorage.removeItem("authToken");
    //         localStorage.removeItem("chatId");
    //         localStorage.removeItem("documentId");
    //         localStorage.removeItem("user");
    //         console.log('Delete account clicked');
    //         showSuccess("Account deleted successfully")
    //         window.location.href = "/login";
    //     // try {
    //     //     await deleteAccount(user?.id);
    //     // } 
    //     // catch (error) {
    //     //     console.error("Delete account error:", error);
    //     //     await deleteAccount(user?.id);
    //     //     localStorage.removeItem("authToken");
    //     //     localStorage.removeItem("chatId");
    //     //     localStorage.removeItem("documentId");
    //     //     localStorage.removeItem("user");
    //     //     console.log('Delete account clicked');
    //     //     showSuccess("Account deleted successfully")
    //     //     window.location.href = "/login";
    //     //     showError("Account Deleted");
    //     // }
    // };

    const handleManageSubscription = ()=>{
        navigate("/manage-subscription")
    }

    return (
        <Container fluid className="p-0">
            <Tab.Container id="settings-tabs" defaultActiveKey="first">
                <Row className="g-0">
                    {/* For mobile, tabs appear horizontally at top */}
                    {isMobile ? (
                        <Col xs={12} className="mb-3">
                            <Nav variant="pills" className="flex-row border-bottom pb-2">
                                <Nav.Item className="me-2">
                                    <Nav.Link eventKey="first">General</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Account</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    ) : (
                        // For desktop, tabs appear vertically on left side
                        <Col sm={4} md={3} className="mb-3 mb-sm-0">
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">General</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Account</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    )}

                    <Col xs={12} sm={8} md={9}>
                        <Tab.Content className={isMobile ? "pt-2" : "ps-3 ps-sm-4 border-start"}>
                            <Tab.Pane eventKey="first">
                                <h5 className="mb-4">General Settings</h5>
                                <ActionRow
                                    label="Delete All Chats"
                                    buttonVariant="danger"
                                    buttonLabel={isDeleting ? 'Deleting...' : 'Delete'}
                                    onButtonClick={handleDeleteAllChats}
                                />
                                <ActionRow
                                    label="Log out from this device"
                                    buttonVariant="primary"
                                    buttonLabel="Logout"
                                    onButtonClick={handleLogout}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h5 className="mb-4">Account Settings</h5>
                                <ActionRow
                                    label="Export Chats"
                                    buttonVariant="primary"
                                    buttonLabel="Export"
                                    onButtonClick={handleExportChats}
                                />
                                {/* <ActionRow
                                    label="Delete Account"
                                    buttonVariant="danger"
                                    buttonLabel="Delete"
                                    onButtonClick={handleDeleteAccount}
                                /> */}
                                <ActionRow
                                    label="Manage Subscription"
                                    buttonVariant="primary"
                                    buttonLabel="Manage"
                                    onButtonClick={handleManageSubscription}
                                />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export default SettingTabs;