import React, { useEffect } from 'react';
import useAuthStore from '../Store/authStore';
import useModalStore from '../Store/modalStore';
import UploadAndChat from './UploadAndChat';
import useChatStore from '../Store/chatStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuthStore();
  const { openModal } = useModalStore();
  const { chatId, chatTitles } = useChatStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If there's an active chat, navigate to it
    if (chatId) {
      navigate(`/chat/${chatId}`);
    } else if (user?.id && !chatId) {
      // If user is logged in but no active chat, prompt to create one
      openModal(<UploadAndChat />);
    }
  }, [chatId, user?.id, navigate, openModal]);
  
  return (
    <div className="home-container">
      <div className="welcome-message">
        <h2>Welcome to AI Doc Summarizer</h2>
        <p>Start a new chat or select an existing conversation from the sidebar.</p>
        <button 
          className="btn btn-primary mt-4" 
          onClick={() => openModal(<UploadAndChat />)}
        >
          Create New Chat
        </button>
      </div>
    </div>
  );
};

export default Home;