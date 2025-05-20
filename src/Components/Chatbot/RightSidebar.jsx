import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import useChatStore from '../../Store/chatStore';
import useAuthStore from '../../Store/authStore';
import { getAllChatsByUserId, deleteChatById as deleteChatAPI } from '../../api/documentsApi';
import { useNavigate } from 'react-router-dom';

const RightSidebar = () => {
    const { user } = useAuthStore();
    const { setChatId, setChatTitles, chatTitles, chatId, setDocId } = useChatStore();
    const [chatList, setChatList] = useState([]);
    const navigate = useNavigate();
    console.log("chat list", chatList);

    const fetchChats = async () => {
        const chats = await getAllChatsByUserId(user?.id);
        console.log("chat from rightsidebar", chats)
        if (chats.length > 0) {
            const sorted = chats.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
            setChatList(sorted);
            setChatTitles(sorted.map((chat) => chat.title));
            if (!chatId) setChatId(sorted[0].id);
        } else {
            // If no chats remain, clear the current selection
            setChatId(null);
            setDocId(null);
            localStorage.removeItem("chatId");
            localStorage.removeItem("documentId");
        }
    };

    const handleDeleteChat = async (idToDelete) => {
        try {
            await deleteChatAPI(idToDelete, user?.id);

            // If the deleted chat is the current active chat
            if (idToDelete === chatId) {
                console.log("Deleting active chat:", idToDelete);

                // Clear from localStorage
                localStorage.removeItem("chatId");
                localStorage.removeItem("documentId");

                // Clear from state
                setChatId(null);
                setDocId(null);
            }

            // Refresh the chat list
            await fetchChats();
        } catch (error) {
            console.error("Error deleting chat:", error);
        }
    };

    useEffect(() => {
        if (user?.id) fetchChats();
    }, [user?.id]);

    // Custom dropdown component to handle clicks properly
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <div
            ref={ref}
            onClick={(e) => {
                e.stopPropagation();
                onClick(e);
            }}
            style={{ cursor: 'pointer' }}
        >
            {children}
        </div>
    ));

    return (
        <>
            <div className="right-side-bar-new-chat-option">
                <div className="chat-history-wrapper">
                    <div className="chat-history-area-start">
                        {chatList.length > 0 ? (
                            chatList.map((chat) => (
                                <div
                                    key={chat.id}
                                    className={`single-history flex justify-between items-center ${chat.id === chatId ? 'active-chat' : ''}`}
                                    style={chat.id === chatId ? { backgroundColor: '#E9E9FF' } : {}}
                                    onClick={() => {
                                        setChatId(chat.id);
                                        setDocId(chat.document_id);
                                        localStorage.setItem("chatId", chat.id);
                                        localStorage.setItem("documentId", chat.document_id);
                                        navigate(`/chat/${chat.id}`);
                                    }}
                                >
                                    <p>{chat.title}</p>
                                    {/* <Dropdown>
                                        <Dropdown.Toggle
                                            as={CustomToggle}
                                            id={`dropdown-${chat.id}`}
                                        >
                                            <img
                                                src="/assets/images/icons/05.svg"
                                                alt="More options"
                                                style={{ width: '20px', height: '20px' }}
                                            />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteChat(chat.id);
                                                }}
                                            >
                                                🗑 Delete
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown> */}
                                </div>
                            ))

                        ) : (
                            <div className="no-chats-message">
                                <p>No chat history</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="right-side-open-clouse" id="collups-right">
                    <img src="/assets/images/icons/01.svg" alt="toggle icon" />
                </div>
            </div>
        </>
    );
};

export default RightSidebar;