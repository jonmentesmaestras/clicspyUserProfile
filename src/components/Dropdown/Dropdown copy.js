import React, { useState, useRef, useEffect, useContext } from "react";
import "./Dropdown.css";
import { Link } from "react-router-dom";
import messageIcon from "../../assets/message.png";
import handshakeIcon from "../../assets/handshake.png";
import logoutIcon from "../../assets/logout.png";
import userIcon from "../../assets/user.png";
import userDefaultPic from "../../assets/avatar.jpg";
import { deleteStoredValue } from "../../services/UseLocalStorage";
import { URL_LOGIN } from "../../utils/Constants";
import UserContext from '../../UserContext';

function getRandomNumber() {
  return Math.floor(Math.random() * (8000 - 1000 + 1)) + 1000;
}
const Dropdown = () => {
  const { user, imageVersion } = useContext(UserContext);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropDown = (text) => {
    setShowDropDown(!showDropDown);
    if (text === "logout") {
      deleteStoredValue("T-CS");
      deleteStoredValue("user");
      window.location.href = URL_LOGIN;
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdownWrapper" ref={dropdownRef}>
      <div className="userImage">
        {/*<img src={user?.Foto || userDefaultPic} alt="" onClick={handleDropDown} />*/}

        <img src={user?.Foto ? `${user.Foto}?v=${getRandomNumber()}` : userDefaultPic} alt="" onClick={handleDropDown} />
      
      </div>
      {showDropDown && (
        <div className="dropdown">
          <div>
            <div className="usersSection">
              
            <img src={user?.Foto ? `${user.Foto}?v=${getRandomNumber()}` : userDefaultPic} alt="" />
              <div className="nameEmail">
                <h6>
                  {user?.Nombre} {user?.Apellido}
                </h6>
                <p>{user?.Email}</p>
              </div>
            </div>
            <div className="dropdownMenu">
              <div className="dropdownItems">
                <Link to="/" onClick={handleDropDown}>
                  <img src={userIcon} alt="" />
                  Mi cuenta
                </Link>
                <Link to="/convierteenafiliado" onClick={handleDropDown}>
                  <img src={handshakeIcon} alt="" />
                  Conviértete en afiliado
                </Link>
                <Link to="/sugerirunamejora" onClick={handleDropDown}>
                  <img src={messageIcon} alt="" />
                  Sugerir una mejora
                </Link>
                <Link to="/salir" onClick={() => handleDropDown("logout")}>
                  <img src={logoutIcon} alt="" />
                  Salir
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
