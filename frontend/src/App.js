// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Navbar1 from "./pages/Navbar1";
// // import HomePage from "./pages/Home";
// // import LoginPage from "./pages/LoginPage";
// // import FarmerLogin from "./pages/FarmerLogin";
// // import FarmerRegister from "./pages/FarmerRegister";
// // import ConsumerLogin from "./pages/ConsumerLogin";
// // import ConsumerRegister from "./pages/ConsumerRegister";
// // import FarmerDashboard from "./components/FarmerDashboard";
// // import ConsumerDashboard from "./components/ConsumerDashboard";
// // import { AuthProvider } from "./context/AuthProvider"; // ✅ Import this

// // function App() {
// //   return (
// //     <AuthProvider> {/* ✅ Wrap the entire app in AuthProvider */}
// //       <Router>
// //         <Navbar1 />
// //         <Routes>
// //           <Route path="/" element={<HomePage />} />
// //           <Route path="/LoginPage" element={<LoginPage />} />
// //           <Route path="/farmer-login" element={<FarmerLogin />} />
// //           <Route path="/farmer-register" element={<FarmerRegister />} />
// //           <Route path="/consumer-login" element={<ConsumerLogin />} />
// //           <Route path="/consumer-register" element={<ConsumerRegister />} />
// //           <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
// //           <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
// //         </Routes>
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// // import "../src/i18n";
// import "./pages/styles.css";

// // Context Providers
// import { CartProvider } from "./context/CartContext";
// import { AuthProvider } from "./context/AuthContext";
// import { ProductProvider } from "./context/ProductContext";

// // Navbars & Layout
// import Navbar1 from "./pages/Navbar1";
// import Navbar2 from "./pages/Navbar2";
// import Navbar3 from "./pages/Navbar3";
// import Sidebar from "./components/Sidebar";
// import Chatbot from "./components/Chatbot";

// // Shared Components
// import Cart from "./components/Cart";
// import Contact from "./pages/Contact";
// import ScrollSection from "./pages/ScrollSection";
// import Notifications from "./components/Notifications";
// // import Feeds from "./components/Feeds";
// // import ViewProfile from "./components/ViewProfile";
// // import Help from "./components/Help";
// import Subscription from "./components/Subscribe";

// // Auth & Dashboard
// import LoginPage from "./pages/LoginPage";
// import FarmerLogin from "./pages/FarmerLogin";
// import FarmerRegister from "./pages/FarmerRegister";
// import ConsumerLogin from "./pages/ConsumerLogin";
// import ConsumerRegister from "./pages/ConsumerRegister";
// import FarmerDashboard from "./components/FarmerDashboard";
// import ConsumerDashboard from "./components/ConsumerDashboard";

// // Farmer & Consumer
// // import FarmerProfile from "./components/FarmerDetails";
// import ConsumerProfile from "./components/ConsumerProfile";
// import FarmerProfile from "./components/FarmerProfile";
// import FarmerDetails from "./components/FarmerDetails";
// import ProductDetails from "./components/ProductDetails";
// // import OrderReview from "./pages/OrderReview";
// import AddProduce from "./components/AddProduce";
// import FarmerReviews from "./components/FarmerReview";

// // // Bargaining
// import ConsumerChatList from './components/bargaining/ConsumerChatList';
// import ConsumerChatWindow from './components/bargaining/ConsumerChatWindow';
// import FarmerChatList from './components/bargaining/FarmerChatList';
// import FarmerChatWindow from './components/bargaining/FarmerChatWindow';
// import FarmerBargainOrders from './components/bargaining/farmerbargainorders';
// import ConsumerBargainOrders from './components/bargaining/consumerbargainorders';
// import BargainCart from './components/bargaining/bargainCart';
// import BargainOrderPage from './components/bargaining/bargainOrderPage';

// // // Payment
// // import Payment from "./components/payment";
// // import PaymentSuccess from './components/PaymentSuccess';
// // import PaymentFailed from './components/PaymentFailed';

// // // Community Pages
// // import HomePageC from './pages/HomePage';
// // import JoinCommunity from './pages/JoinCommunity';
// // import CreateCommunity from './pages/CreateCommunity';
// // import CommunityDetails from './pages/CommunityDetails';
// // import AdminCommunityPage from './pages/AdminCommunityPage';
// // import MemberCommunityPage from './pages/MemberCommunityPage';
// // import OrderPageC from './pages/OrderPage';
// // import MemberOrderPage from "./pages/MemberOrderPage";
// // import CommunityOrderPage from "./pages/CommunityOrderPage";

// // Other Pages
// import HomePage from "./pages/Home";
// import OrderPage from "./components/OrderPage";
// // import HelpFarmers from "./components/HelpFarmers";

// function App() {
//   return (
//     <ProductProvider>
//       <AuthProvider>
//         <CartProvider>
//           <Router>
//             <Main />
//           </Router>
//         </CartProvider>
//       </AuthProvider>
//     </ProductProvider>
//   );
// }

// const Main = () => {
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const path = location.pathname;

//   const getNavbar = () => {
//     if (
//       path.startsWith("/farmer") ||
//       path.startsWith("/farmer-dashboard") ||
//       path.startsWith("/farmers/my-reviews") ||
//       path.startsWith("/helpfarmers") ||
//       path.startsWith("/add-produce") ||
//       path.startsWith("/FarmerProfile") ||
//       path.startsWith("/help") ||
//       path.startsWith("/community") ||
//       path.startsWith("/view-profile") ||
//       path.startsWith("/order-review") ||
//       path.startsWith("/notifications") ||
//       path.startsWith("/feeds") ||
//       path.startsWith("/farmer-orders") ||
//       path.startsWith("/bargain_farmer") ||
//       path.startsWith("/chat") ||
//       /\/profile\/[A-Za-z0-9]+/.test(path) ||
//       /\/farmer\/[A-Za-z0-9]+\/personal-details/.test(path) ||
//       /\/farmer\/[A-Za-z0-9]+\/farm-details/.test(path)
//     ) {
//       return <Navbar2 />;
//     }

//     if (
//       path.startsWith("/consumer-dashboard") ||
//       /\/productDetails\/[A-Za-z0-9]+/.test(path) ||
//       /\/consumerprofile\/[A-Za-z0-9]+/.test(path) ||
//       /\/farmerDetails\/[A-Za-z0-9]+/.test(path) ||
//       path.startsWith("/payment") ||
//       path.startsWith("/orderpage") ||
//       path.startsWith("/consumerprofile") ||
//       path.startsWith("/cart") ||
//       path.startsWith("/bargain_consumer") ||
//       path.startsWith("/bargain") ||
//       path.startsWith("/community-home") ||
//       path.startsWith("/consumer-orders") ||
//       path === "/subscribe"
//     ) {
//       return <Navbar3 />;
//     }

//     return (
//       <Navbar1
//         isLoginPage={path === "/LoginPage"}
//         isAuthPage={
//           path.startsWith("/farmer-login") ||
//           path.startsWith("/farmer-register") ||
//           path.startsWith("/consumer-login") ||
//           path.startsWith("/consumer-register")
//         }
//       />
//     );
//   };

//   const showSidebar = () =>
//     path.startsWith("/farmer-dashboard") ||
//     path.startsWith("/farmer/") ||
//     path.startsWith("/add-produce") ||
//     path.startsWith("/FarmerProfile") ||
//     path.startsWith("/help") ||
//     path.startsWith("/view-profile") ||
//     path.startsWith("/order-review") ||
//     path.startsWith("/notifications") ||
//     path.startsWith("/feeds") ||
//     path.startsWith("/farmers/my-reviews") ||
//     path.startsWith("/chat") ||
//     path.startsWith("/farmer-orders");

//   const showChatbot = () =>
//     path.startsWith("/farmer-dashboard") || path.startsWith("/consumer-dashboard");

//   return (
//     <div>
//       {getNavbar()}
//       {showSidebar() && (
//         <Sidebar
//           farmerId={location.state?.farmerId}
//           isOpen={sidebarOpen}
//           toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
//         />
//       )}
//       <div className="main-content">
//         <Routes>
//           {/* General Pages */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/ScrollSection" element={<ScrollSection />} />
//           <Route path="/Contact" element={<Contact />} />
//           <Route path="/LoginPage" element={<LoginPage />} />

//           {/* Auth Pages */}
//           <Route path="/farmer-login" element={<FarmerLogin />} />
//           <Route path="/farmer-register" element={<FarmerRegister />} />
//           <Route path="/consumer-login" element={<ConsumerLogin />} />
//           <Route path="/consumer-register" element={<ConsumerRegister />} />

//           {/* Dashboards */}
//           <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
//           <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />

//           {/* Profiles */}
//           {/* <Route path="/farmer" element={<FarmerProfile />} /> */}
//           <Route path="/consumerprofile/:consumer_id" element={<ConsumerProfile />} />
//           <Route path="/farmer/:farmer_id/profile" element={<FarmerProfile />} />
//            <Route path="/farmerDetails/:farmer_id" element={<FarmerDetails />} />
//           {/* <Route path="/view-profile" element={<ViewProfile />} />  */}

//           {/* Products and Orders */}
//           <Route path="/productDetails/:product_id" element={<ProductDetails />} />
//           <Route path="/add-produce" element={<AddProduce />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/orderpage" element={<OrderPage />} />
//           {/* <Route path="/order-review" element={<OrderReview isSidebarOpen={sidebarOpen} />} /> */}

//           {/* Bargaining */}
//           <Route path="/bargain" element={<ConsumerChatList />} />
//           <Route path="/bargain/:bargainId" element={<ConsumerChatWindow />} />
//           <Route path="/farmer/bargain" element={<FarmerChatList />} />
//           <Route path="/farmer/bargain/:bargainId" element={<FarmerChatWindow />} />
//           <Route path="/farmer-orders" element={<FarmerBargainOrders />} />
//           <Route path="/consumer-orders" element={<ConsumerBargainOrders />} />
//           <Route path="/bargain-cart" element={<BargainCart />} />
//           <Route path="/bargain-orderpage" element={<BargainOrderPage />} />

//           {/* Community */}
//           {/* <Route path="/community-home" element={<HomePageC />} />
//           <Route path="/join-community" element={<JoinCommunity />} />
//           <Route path="/create-community" element={<CreateCommunity />} />
//           <Route path="/community-details" element={<CommunityDetails />} />
//           <Route path="/community-page/:communityId/admin" element={<AdminCommunityPage />} />
//           <Route path="/community-page/:communityId/member" element={<MemberCommunityPage />} />
//           <Route path="/order/:communityId" element={<OrderPageC />} />
//           <Route path="/community/:communityId/member/:memberId" element={<MemberOrderPage />} />
//           <Route path="/community/:communityId/order/:orderId" element={<CommunityOrderPage />} /> */}

//           {/* Other */}
//           <Route path="/notifications" element={<Notifications />} />
//            {/* <Route path="/feeds" element={<Feeds />} />
//           <Route path="/help" element={<Help />} />
//           <Route path="/HelpFarmers" element={<HelpFarmers />} /> */}
//           <Route path="/farmers/my-reviews" element={<FarmerReviews />} />
//           <Route path="/subscribe" element={<Subscription />} /> 

//           {/* Payments */}
//           {/* <Route path="/payment" element={<Payment />} />
//           <Route path="/payment-success" element={<PaymentSuccess />} />
//           <Route path="/payment-failed" element={<PaymentFailed />} /> */}
//         </Routes>

//         {showChatbot() && <Chatbot />}
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Context Providers
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

// Navbars & Layout
import Navbar1 from "./pages/Navbar1";
import Navbar2 from "./pages/Navbar2";
import Navbar3 from "./pages/Navbar3";
import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";

// import googleTranslator from './components/GoogleTranslate';
// Shared Components
import Cart from "./components/Cart";
import Contact from "./pages/Contact";
import ScrollSection from "./pages/ScrollSection";
import Notifications from "./components/Notifications";
import Subscription from "./components/Subscribe";

// Auth & Dashboard
import LoginPage from "./pages/LoginPage";
import FarmerLogin from "./pages/FarmerLogin";
import FarmerRegister from "./pages/FarmerRegister";
import ConsumerLogin from "./pages/ConsumerLogin";
import ConsumerRegister from "./pages/ConsumerRegister";
import FarmerDashboard from "./components/FarmerDashboard";
import ConsumerDashboard from "./components/ConsumerDashboard";

// Farmer & Consumer
import ConsumerProfile from "./components/ConsumerProfile";
import FarmerProfile from "./components/FarmerProfile";
import FarmerDetails from "./components/FarmerDetails";
import ProductDetails from "./components/ProductDetails";
import AddProduce from "./components/AddProduce";
import FarmerReviews from "./components/FarmerReview";

// Bargaining
import ConsumerChatList from './components/bargaining/ConsumerChatList';
import ConsumerChatWindow from './components/bargaining/ConsumerChatWindow';
import FarmerChatList from './components/bargaining/FarmerChatList';
import FarmerChatWindow from './components/bargaining/FarmerChatWindow';
import FarmerBargainOrders from './components/bargaining/farmerbargainorders';
import ConsumerBargainOrders from './components/bargaining/consumerbargainorders';
import BargainCart from './components/bargaining/bargainCart';
import BargainOrderPage from './components/bargaining/bargainOrderPage';

// Other Pages
import HomePage from "./pages/Home";
import OrderPage from "./components/OrderPage";
import GoogleTranslate from "./components/GoogleTranslate";

function App() {
  return (
    <ProductProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <GoogleTranslate />
            <Main />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ProductProvider>
  );
}

const Main = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [language, setLanguage] = useState('en');

  const path = location.pathname;

  // // Initialize Google Translate
  // useEffect(() => {
  //   const addGoogleTranslateScript = () => {
  //     const script = document.createElement('script');
  //     script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  //     script.async = true;
  //     document.body.appendChild(script);
      
  //     window.googleTranslateElementInit = () => {
  //       new window.google.translate.TranslateElement(
  //         {
  //           pageLanguage: 'en',
  //           includedLanguages: 'en,hi,kn',
  //           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
  //         },
  //         'google_translate_element'
  //       );
  //     };
  //   };

  //   addGoogleTranslateScript();

  //   return () => {
  //     // Cleanup function
  //     const googleTranslateScript = document.querySelector('script[src*="translate.google.com"]');
  //     if (googleTranslateScript) {
  //       document.body.removeChild(googleTranslateScript);
  //     }
  //     delete window.googleTranslateElementInit;
  //   };
  // }, []);

  const getNavbar = () => {
    if (
      path.startsWith("/farmer") ||
      path.startsWith("/farmer-dashboard") ||
      path.startsWith("/farmers/my-reviews") ||
      path.startsWith("/helpfarmers") ||
      path.startsWith("/add-produce") ||
      path.startsWith("/FarmerProfile") ||
      path.startsWith("/help") ||
      path.startsWith("/community") ||
      path.startsWith("/view-profile") ||
      path.startsWith("/order-review") ||
      path.startsWith("/notifications") ||
      path.startsWith("/feeds") ||
      path.startsWith("/farmer-orders") ||
      path.startsWith("/bargain_farmer") ||
      path.startsWith("/chat") ||
      /\/profile\/[A-Za-z0-9]+/.test(path) ||
      /\/farmer\/[A-Za-z0-9]+\/personal-details/.test(path) ||
      /\/farmer\/[A-Za-z0-9]+\/farm-details/.test(path)
    ) {
      return (
        <>
          <Navbar2 />
          
        </>
      );
    }

    if (
      path.startsWith("/consumer-dashboard") ||
      /\/productDetails\/[A-Za-z0-9]+/.test(path) ||
      /\/consumerprofile\/[A-Za-z0-9]+/.test(path) ||
      /\/farmerDetails\/[A-Za-z0-9]+/.test(path) ||
      path.startsWith("/payment") ||
      path.startsWith("/orderpage") ||
      path.startsWith("/consumerprofile") ||
      path.startsWith("/cart") ||
      path.startsWith("/bargain_consumer") ||
      path.startsWith("/bargain") ||
      path.startsWith("/community-home") ||
      path.startsWith("/consumer-orders") ||
      path === "/subscribe"
    ) {
      return (
        <>
          <Navbar3 />
          
       </>
      );
    }

    return (
      <>
        <Navbar1
          isLoginPage={path === "/LoginPage"}
          isAuthPage={
            path.startsWith("/farmer-login") ||
            path.startsWith("/farmer-register") ||
            path.startsWith("/consumer-login") ||
            path.startsWith("/consumer-register")
          }
        />
        {/* <div id="google_translate_element" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}></div> */}
      </>
    );
  };

  const showSidebar = () =>
    path.startsWith("/farmer-dashboard") ||
    path.startsWith("/farmer/") ||
    path.startsWith("/add-produce") ||
    path.startsWith("/FarmerProfile") ||
    path.startsWith("/help") ||
    path.startsWith("/view-profile") ||
    path.startsWith("/order-review") ||
    path.startsWith("/notifications") ||
    path.startsWith("/feeds") ||
    path.startsWith("/farmers/my-reviews") ||
    path.startsWith("/chat") ||
    path.startsWith("/farmer-orders");

  const showChatbot = () =>
    path.startsWith("/farmer-dashboard") || path.startsWith("/consumer-dashboard");

  return (
    <div>
      {getNavbar()}
      {showSidebar() && (
        <Sidebar
          farmerId={location.state?.farmerId}
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      )}
      <div className="main-content">
        <Routes>
          {/* General Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/ScrollSection" element={<ScrollSection />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/LoginPage" element={<LoginPage />} />

          {/* Auth Pages */}
          <Route path="/farmer-login" element={<FarmerLogin />} />
          <Route path="/farmer-register" element={<FarmerRegister />} />
          <Route path="/consumer-login" element={<ConsumerLogin />} />
          <Route path="/consumer-register" element={<ConsumerRegister />} />

          {/* Dashboards */}
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />

          {/* Profiles */}
          <Route path="/consumerprofile/:consumer_id" element={<ConsumerProfile />} />
          <Route path="/farmer/:farmer_id/profile" element={<FarmerProfile />} />
          <Route path="/farmerDetails/:farmer_id" element={<FarmerDetails />} />

          {/* Products and Orders */}
          <Route path="/productDetails/:product_id" element={<ProductDetails />} />
          <Route path="/add-produce" element={<AddProduce />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderpage" element={<OrderPage />} />

          {/* Bargaining */}
          <Route path="/bargain" element={<ConsumerChatList />} />
          <Route path="/bargain/:bargainId" element={<ConsumerChatWindow />} />
          <Route path="/farmer/bargain" element={<FarmerChatList />} />
          <Route path="/farmer/bargain/:bargainId" element={<FarmerChatWindow />} />
          <Route path="/farmer-orders" element={<FarmerBargainOrders />} />
          <Route path="/consumer-orders" element={<ConsumerBargainOrders />} />
          <Route path="/bargain-cart" element={<BargainCart />} />
          <Route path="/bargain-orderpage" element={<BargainOrderPage />} />

          {/* Other */}
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/farmers/my-reviews" element={<FarmerReviews />} />
          <Route path="/subscribe" element={<Subscription />} />
        </Routes>

        {showChatbot() && <Chatbot />}
      </div>
    </div>
  );
};

export default App;