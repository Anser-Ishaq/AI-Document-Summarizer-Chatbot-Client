import React, { useState, useEffect, useRef } from 'react'
import Dynamic_Modal from '../Modal';
import useModalStore from '../../Store/modalStore';
import UploadAndChat from '../UploadAndChat';
import LoadScripts from '../../Hooks/LoadScripts';
import useAuthStore from '../../Store/authStore';
import useChatStore from '../../Store/chatStore';
import { getChatByUserId, sendChatMessage } from '../../api/documentsApi';
import Loader from '../Loader';
import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';
import { useParams, useNavigate } from 'react-router-dom';

const Chatbot = () => {
    LoadScripts();
    const bottomRef = useRef(null);
    const { isOpen, openModal } = useModalStore();
    const [message, setMessage] = useState("");
    const [chatData, setChatData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuthStore();
    const { setChatId, chatId, setChatMessagesData, chatMessagesData } = useChatStore();
    // const { chatTitles } = useChatStore();
    const { chatId: urlChatId } = useParams();
    const navigate = useNavigate();

    console.log("chat id from bot", chatId);
    console.log("user id from bot", user?.id);
    console.log("chat data", chatData);
    console.log("chat data from store", chatMessagesData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim() || !chatId) return;

        setLoading(true);
        try {
            const response = await sendChatMessage({
                chatId,
                userId: user.id,
                message,
            });

            console.log("Chat response:", response);

            if (response?.success) {
                setLoading(false);
                const { userMessage, aiMessage } = response.data;

                // Update the chatData state with the new messages
                setChatData((prev) => ({
                    ...prev,
                    messages: [...prev.messages, userMessage, aiMessage],
                }));
                // Update the chatData state with the new messages
                setChatMessagesData((prev) => ({
                    ...prev,
                    messages: [...prev.messages, userMessage, aiMessage],
                }));
            }

            setMessage(""); // Clear input
        } catch (error) {
            setLoading(false);
            console.error("Failed to send message:", error);
        }
    };

    const handleCreateNewChat = () => {
        openModal(<UploadAndChat />);
    };

    useEffect(() => {
        if (chatId === null && user?.id) {
            openModal(<UploadAndChat />);
        }
    }, [chatId, user?.id]);

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const res = await getChatByUserId({ chatId, userId: user?.id });
                console.log("res from bot", res);
                setChatData(res.data);
                setChatMessagesData(res.data)
            } catch (err) {
                console.error("Failed to load chat:", err);
                setChatData(null);
                setChatMessagesData(null)
            }
        };

        if (user?.id && chatId) {
            fetchChat();
        } else {
            setChatData(null);
            setChatMessagesData(null);
        }
    }, [user?.id, chatId]);

    useEffect(() => {
        // Scroll to bottom when new messages arrive
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatData?.messages]);

    useEffect(() => {
        // Set the active chat ID from URL parameters
        if (urlChatId && urlChatId !== chatId) {
            setChatId(urlChatId);
        } else if (!urlChatId && chatId) {
            // If no chat ID in URL but we have one active, update URL
            navigate(`/chat/${chatId}`, { replace: true });
        }
    }, [urlChatId, chatId, setChatId, navigate]);
    if (!user?.id) return <Loader />;

    return (
        <>
            <Dynamic_Modal />
            <div className="dash-board-main-wrapper">
                <LeftSidebar />
                <div className="main-center-content-m-left center-content search-sticky">
                    {!chatId ? (
                        <div className="no-active-chat-container">
                            <div className="empty-chat-message">
                                <h3 >No active chat</h3>
                                <p >Start a new chat by uploading a document</p>
                                <button
                                    className="btn btn-primary mt-4"
                                    onClick={handleCreateNewChat}
                                >
                                    Create New Chat
                                </button>
                            </div>
                        </div>
                    ) : chatData ? (
                        <>
                            <div className="question_answer__wrapper__chatbot">
                                {chatData.messages.map((msg) => (
                                    <div className="single__question__answer" key={msg.id}>
                                        {msg.role === "user" ? (
                                            <div className="question_user">
                                                <div className="left_user_info">
                                                    <img src="/assets/images/avatar/06.png" alt="user avatar" />
                                                    <div className="question__user">{msg.content}</div>
                                                </div>
 
                                            </div>
                                        ) : (
                                            <div className="answer__area">
                                                <div className="thumbnail">
                                                    <img src="/assets/images/avatar/04.png" alt="ai avatar" />
                                                </div>
                                                <div className="answer_main__wrapper">
                                                    <h4 className="common__title">{chatData.documents.filename}</h4>
                                                    <p className="disc">{msg.content}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div ref={bottomRef} />
                            <form onSubmit={handleSubmit} className="search-form">
                                <input
                                    type="text"
                                    placeholder="Message Doc Summarizer..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button type="submit" disabled={!chatId}>
                                    {loading ? <Loader /> : <i className="fa-regular fa-arrow-up"></i>}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            START CHATING
                        </>
                    )}
                </div>
                <RightSidebar />
            </div>
        </>
    );
};

export default Chatbot;