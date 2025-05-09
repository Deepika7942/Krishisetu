import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSeedling, FaPlus, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpg';
import './Navbar2.css';
import GoogleTranslator from '../components/GoogleTranslate';

const Navbar2 = () => {
  const navigate = useNavigate();
  const { farmer } = useAuth();

  const handleLogout = () => {
    navigate('/LoginPage');
  };

  return (
    <nav className="navbar2">
      <div className="logo" onClick={() => navigate('/farmer-dashboard')}>
        <img src={logo} alt="KrishiSetu Logo" />
        <span className="navbar-name">KRISHISETU</span>
      </div>

      <div className="navbar-right-content">
        <div className="translator-container">
          <GoogleTranslator />
        </div>

        <ul className="navbar-icons">
          <li>
            <Link to="/add-produce" className="icon-link" title="Add Produce">
              <div className="icon-container">
                <FaSeedling className="icon" aria-label="Add Produce" />
                <FaPlus className="plus-icon" aria-label="Add" />
              </div>
              <span className="icon-text">Add Produce</span>
            </Link>
          </li>

          <li>
            <Link to="/notifications" className="icon-link" title="Notifications">
              <FaBell className="icon" aria-label="Notifications" />
              <span className="icon-text">Notifications</span>
            </Link>
          </li>

          <li>
            <Link 
              to={`/farmer/${farmer?.farmer_id}/profile`} 
              className="icon-link" 
              title="Profile"
            >
              <FaUser className="icon" aria-label="Profile" />
              <span className="icon-text">Profile</span>
            </Link>
          </li>

          <li>
            <button className="icon-link logout" title="Logout" onClick={handleLogout}>
              <FaSignOutAlt className="icon" aria-label="Logout" />
              <span className="icon-text">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar2;