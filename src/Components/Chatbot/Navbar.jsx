import React, { useEffect } from 'react'
import LoadScripts from '../../Hooks/LoadScripts'
import useModalStore from '../../Store/modalStore'
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../Store/authStore';

const Navbar = () => {
  const { openModal } = useModalStore();
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const profileRoute = () => {
    navigate("/profile")
  }
  LoadScripts()
  return (
    <div className="header-area-one">
      <div className="container-30">
        <div className="col-lg-12">
          <div className="header-inner-one">
            <div className="left-logo-area">
              <a href={user?.role === "user" ? '/' : '/admin'} className="logo">
                <img src="/assets/images/logo/logo-01.png" alt="logo-image" />
              </a>

            </div>
            <div className="header-right">
              {/* <div class="button-area">
                <Link to="/manage-subscription" class="rts-btn btn-primary"  >
                  <img src="/assets/images/icons/02.svg" alt="icons" />
                  {user?.status == "pro" ? "Pro User" : "Update"}

                </Link>
              </div> */}
              <div className="left-logo-area">

                {/* <div className="left-side-open-clouse" id="collups-left">
                  <img src="/assets/images/icons/01.svg" alt="icons" />
                </div> */}
              </div>
              <div className="action-interactive-area__header">

                <div className="single_action__haeader user_avatar__information openuptip"  >
                  <div onClick={profileRoute} className="avatar">
                    <img src="/assets/images/avatar/06.png" alt="avatar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar