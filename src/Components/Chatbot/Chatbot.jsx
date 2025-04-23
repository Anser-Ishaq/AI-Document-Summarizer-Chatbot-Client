import React, { useState, useEffect } from 'react'
import Dynamic_Modal from '../Modal';
import useModalStore from '../../Store/modalStore';
import UploadAndChat from '../UploadAndChat';
import LoadScripts from '../../Hooks/LoadScripts';
import useAuthStore from '../../Store/authStore';
import useChatStore from '../../Store/chatStore';
import { getChatByUserId, sendChatMessage } from '../../api/documentsApi';
import Loader from '../Loader';

const Chatbot = () => {
    LoadScripts();
    const { toggleModal, openModal } = useModalStore();
    const [message, setMessage] = useState("");
    const [chatData, setChatData] = useState(null);
    const [loading, setLoading] = useState(false)
    const { user } = useAuthStore();
    const { chatId } = useChatStore();
    console.log("chat id from bot", chatId)
    console.log("user id from bot", user?.id)


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        setLoading(true)
        try {
            const response = await sendChatMessage({
                chatId,
                userId: user.id,
                message,
            });

            console.log("Chat response:", response);

            if (response?.success) {
                setLoading(false)
                const { userMessage, aiMessage } = response.data;

                // Update the chatData state with the new messages
                setChatData((prev) => ({
                    ...prev,
                    messages: [...prev.messages, userMessage, aiMessage],
                }));
            }

            setMessage(""); // Clear input
        } catch (error) {
            setLoading(false)
            console.error("Failed to send message:", error);
        }
    };


    LoadScripts();
    useEffect(() => {
        const fetchChat = async () => {
            try {
                const res = await getChatByUserId({ chatId, userId: user?.id });
                console.log("red from bot", res)
                setChatData(res.data);
                console.log(res.data)
            } catch (err) {
                console.error("Failed to load chat:", err);
            }
        };

        if (user?.id && chatId) fetchChat();
    }, [user?.id, chatId]);

    if (!chatData) return <p>Loading chat...</p>;
    return (
        <>
            <div className="dash-board-main-wrapper">
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

                            <button onClick={toggleModal} className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/08.png" alt="icons" />
                                </div>
                                <p>Settings</p>
                            </button>
                            <a href="/login" className="single-menu">
                                <div className="icon">
                                    <img src="/assets/images/icons/09.png" alt="icons" />
                                </div>
                                <p>Logout</p>
                            </a>
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
                <div className="main-center-content-m-left center-content search-sticky">
                    <div className="question_answer__wrapper__chatbot">
                        {chatData.messages.map((msg) => (
                            <div className="single__question__answer" key={msg.id}>
                                {msg.role === "user" ? (
                                    <div className="question_user">
                                        <div className="left_user_info">
                                            <img src="/assets/images/avatar/06.png" alt="user avatar" />
                                            <div className="question__user">{msg.content}</div>
                                        </div>
                                        <div className="edit__icon openuptip" tooltip="Edit It">
                                            <i className="fa-regular fa-pen-to-square"></i>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="answer__area">
                                        <div className="thumbnail">
                                            <img src="/assets/images/avatar/04.png" alt="ai avatar" />
                                        </div>
                                        <div className="answer_main__wrapper">
                                            <h4 className="common__title">{chatData.title}</h4>
                                            <p className="disc">{msg.content}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="search-form">
                        <input
                            type="text"
                            placeholder="Message Doc Summarizer..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit">
                            {loading ? <Loader /> : <i className="fa-regular fa-arrow-up"></i>}

                        </button>
                    </form>
                    <div className="copyright-area-bottom">
                        <p> <a href="#">AI DOC Summarizer©</a> 2025. All Rights Reserved.</p>
                    </div>
                </div>
                <div className="right-side-bar-new-chat-option">
                    {/* <div  className="new-chat-option">
                        <img src="/assets/images/logo/logo-02.png" alt="logo" />
                        <img src="/assets/images/icons/04.png" alt="icons" />
                    </div> */}
                    <div className="chat-history-wrapper">
                        <div className="chat-history-area-start">
                            <h6 className="title">Today</h6>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>ranking water is essential</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>These foods are calorie</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>If you're struggling to</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                        </div>
                        <div className="chat-history-area-start">
                            <h6 className="title">Yesterday</h6>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>ranking water is essential</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>These foods are calorie</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>If you're struggling to</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                        </div>
                        <div className="chat-history-area-start">
                            <h6 className="title">11/03/2024</h6>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>ranking water is essential</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>These foods are calorie</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>If you're struggling to</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                        </div>
                        <div className="chat-history-area-start">
                            <h6 className="title">28/04/2024</h6>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>ranking water is essential</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>These foods are calorie</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>If you're struggling to</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                            <div className="single-history">
                                <p>Online School Education</p>
                                <img src="/assets/images/icons/05.svg" alt="icons" />
                            </div>
                        </div>
                    </div>
                    <div className="right-side-open-clouse" id="collups-right">
                        <img src="/assets/images/icons/01.svg" alt="icons" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chatbot