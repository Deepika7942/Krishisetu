// import React, { useEffect, useState } from 'react';
// import logo from '../assets/logo.jpg';
// import './Navbar1.css';
// import { useNavigate } from 'react-router-dom';

// const Navbar1 = ({ isLoginPage = false, isAuthPage = false }) => {
//   const navigate = useNavigate();
//   const [translateLoaded, setTranslateLoaded] = useState(false);

//   // Initialize Google Translate
//   useEffect(() => {
//     let script;
//     const loadGoogleTranslate = () => {
//       // Check if already initialized
//       if (window.google && window.google.translate) {
//         initializeTranslate();
//         return;
//       }

//       // Check if script already exists
//       if (document.querySelector('script[src*="translate.google.com"]')) {
//         return;
//       }

//       script = document.createElement('script');
//       script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//       script.async = true;
//       script.onerror = () => {
//         console.error('Failed to load Google Translate script');
//         setTranslateLoaded(false);
//       };

//       window.googleTranslateElementInit = initializeTranslate;
//       document.body.appendChild(script);
//     };

//     const initializeTranslate = () => {
//       try {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             includedLanguages: 'en,hi,kn',
//             layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
//           },
//           'google_translate_element'
//         );
//         setTranslateLoaded(true);
//       } catch (error) {
//         console.error('Error initializing Google Translate:', error);
//         setTranslateLoaded(false);
//       }
//     };

//     loadGoogleTranslate();

//     return () => {
//       // Cleanup
//       if (script) {
//         script.remove();
//       }
//       delete window.googleTranslateElementInit;
//     };
//   }, []);

//   // Navigation Handlers
//   const handleHomeClick = (e) => {
//     e.preventDefault();
//     navigate('/');
//   };

//   const handleLoginClick = (e) => {
//     e.preventDefault();
//     navigate('/LoginPage');
//   };

//   return (
//     <nav className="navbar1">
//       <div className="logo" onClick={handleHomeClick}>
//         <img src={logo} alt="Logo" />
//         <span className="navbar-name">KRISHISETU</span>
//       </div>
      
//       <div className="navbar-right-content">
//         {translateLoaded && (
//           <div id="google_translate_element" className="translate-container"></div>
//         )}
        
//         <ul className="navbar-links">
//           <li>
//             <a href="/" className="navbar-link" onClick={handleHomeClick}>
//               HOME
//             </a>
//           </li>

//           {isAuthPage && (
//             <li>
//               <a href="/LoginPage" className="navbar-link" onClick={handleLoginClick}>
//                 LOG IN
//               </a>
//             </li>
//           )}

//           {!isLoginPage && !isAuthPage && (
//             <>
//               <li>
//                 <a href="#about" className="navbar-link">
//                   ABOUT US
//                 </a>
//               </li>
//               <li>
//                 <a href="#contact" className="navbar-link">
//                   CONTACT US
//                 </a>
//               </li>
//               <li>
//                 <a href="/LoginPage" className="navbar-link" onClick={handleLoginClick}>
//                   LOG IN
//                 </a>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar1;
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.jpg';
import './Navbar1.css';
import { useNavigate } from 'react-router-dom';


const Navbar1 = ({ isLoginPage = false, isAuthPage = false }) => {
  const navigate = useNavigate();

  // Navigation Handlers
  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/LoginPage');
  };

  return (
    <nav className="navbar1">
      <div className="logo" onClick={handleHomeClick}>
        <img src={logo} alt="Logo" />
        <span className="navbar-name">KRISHISETU</span>
      </div>
      
      <div className="navbar-right-content">
       
        
        <ul className="navbar-links">
          <li>
            <a href="/" className="navbar-link" onClick={handleHomeClick}>
              HOME
            </a>
          </li>

          {isAuthPage && (
            <li>
              <a href="/LoginPage" className="navbar-link" onClick={handleLoginClick}>
                LOG IN
              </a>
            </li>
          )}

          {!isLoginPage && !isAuthPage && (
            <>
              <li>
                <a href="#about" className="navbar-link">
                  ABOUT US
                </a>
              </li>
              <li>
                <a href="#contact" className="navbar-link">
                  CONTACT US
                </a>
              </li>
              <li>
                <a href="/LoginPage" className="navbar-link" onClick={handleLoginClick}>
                  LOG IN
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar1;