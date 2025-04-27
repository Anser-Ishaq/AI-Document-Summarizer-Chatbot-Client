import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import useAlert from '../Hooks/useAlerts';
// Reusable action button component
const ActionButton = ({ variant, onClick, label }) => {
    return (
        <Button
            style={{ fontSize: '10px', width: '30%', maxWidth: '120px', minWidth: '80px' }}
            variant={variant}
            className="rounded-pill"
            onClick={onClick}
        >
            {label}
        </Button>
    );
};

// Reusable action row component
const ActionRow = ({ label, buttonVariant, buttonLabel, onButtonClick }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="me-2">{label}</span>
            <ActionButton
                variant={buttonVariant}
                label={buttonLabel}
                onClick={onButtonClick}
            />
        </div>
    );
};

function SettingTabs() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
    const { showError, showSuccess } = useAlert()

    // Handle screen size changes
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 576);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Action handlers - replace with your actual logic
    const handleDeleteAllChats = () => {
        console.log('Delete all chats clicked');
        showSuccess("Chats deleted successfully");

        // Implement your delete all chats logic here
    };

    const handleLogout = () => {
        console.log('Logout clicked');
        showSuccess("Logged out successfully");

        // Implement your logout logic here
    };

    const handleExportChats = () => {
        console.log('Chats exported successfully');
        showSuccess('Chats exported successfully')
        // Implement your delete account logic here
    };
    const handleDeleteAccount = () => {
        console.log('Delete account clicked');
        showSuccess("Account deleted successfully")
        // Implement your delete account logic here
    };

    // Render different tab layout based on screen size
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
                                    buttonLabel="Delete All"
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
                                    onButtonClick={handleDeleteAccount}
                                />
                                <ActionRow
                                    label="Delete Account"
                                    buttonVariant="danger"
                                    buttonLabel="Delete"
                                    onButtonClick={handleDeleteAccount}
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