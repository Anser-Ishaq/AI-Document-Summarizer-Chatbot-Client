import Navbar from '../Components/Chatbot/Navbar';
import Chatbot from '../Components/Chatbot/Chatbot';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <div className="chatbot">
        <Chatbot />
      </div>
    </>
  );
};

export default MainLayout;
