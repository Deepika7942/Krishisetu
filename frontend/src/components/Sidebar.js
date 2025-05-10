import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Sidebar.css';

// Import individual icons
import { FaHome, FaStar, FaHandshake, FaLeaf, FaBars, FaTimes } from 'react-icons/fa';

const FarmerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { farmer } = useContext(AuthContext);

  const menuItems = [
    {
      path: '/farmer-dashboard',
      icon: <FaHome className="farmer-menu-icon" />,
      label: 'Dashboard',
      active: location.pathname === '/farmer-dashboard'
    },
    {
      path: '/farmers/my-reviews',
      icon: <FaStar className="farmer-menu-icon" />,
      label: 'My Reviews',
      active: location.pathname === '/farmers/my-reviews'
    },
    {
      path: '/farmer/bargain',
      icon: <FaHandshake className="farmer-menu-icon" />,
      label: 'Bargain',
      active: location.pathname === '/farmer/bargain'
    },
    {
      path: null,
      icon: <FaLeaf className="farmer-menu-icon" />,
      label: 'Plant Health',
      action: () => window.open('https://plant-disease-detection-system-for-sustainable-agriculture-yg2.streamlit.app/', '_blank')
    }
  ];

  const navigateWithFarmerId = (path) => {
    if (!farmer?.farmer_id) {
      alert("Please log in first");
      navigate("/farmer-login");
      return;
    }
    navigate(`${path}?farmer_id=${farmer.farmer_id}`);
  };

  return (
    <div className={`farmer-sidebar-container ${isOpen ? 'farmer-sidebar-open' : ''}`}>
      <div className="farmer-sidebar-header">
        <button 
          className="farmer-sidebar-hamburger" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <FaTimes className="farmer-hamburger-icon" />
          ) : (
            <FaBars className="farmer-hamburger-icon" />
          )}
        </button>
      </div>
      
      <div className="farmer-sidebar-menu">
        {menuItems.map((item, index) => (
          <div 
            key={`farmer-menu-${index}`}
            className={`farmer-menu-item ${item.active ? 'farmer-menu-active' : ''}`}
            onClick={() => item.path ? navigateWithFarmerId(item.path) : item.action()}
            data-farmer-tooltip={isOpen ? '' : item.label}
          >
            <div className="farmer-menu-icon-container">
              {item.icon}
            </div>
            {isOpen && <span className="farmer-menu-label">{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerSidebar;