
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Men from "./pages/Men";
// import Women from "./pages/Women";
// import Kids from "./pages/Kids";
// import Accessories from "./pages/Accessories";
// import Beauty from "./pages/Beauty";
// import Footwear from "./pages/Footwear";
// import ProductDetail from "./pages/ProductDetail";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import Admin from "./pages/Admin";
// import BrandPage from "./pages/BrandPage";
// import Cart from "./pages/Cart";
// import Wishlist from "./pages/Wishlist";
// import Categories from "./pages/Categories";
// import Payment from "./pages/Payment";
// import PaymentSuccess from "./pages/PaymentSuccess";
// import GiftCards from "./pages/GiftCards";
// import ContactUs from "./pages/ContactUs";
// import FAQs from "./pages/FAQs";
// import Legal from "./pages/Legal";
// import Orders from "./pages/Orders";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import TermsConditions from "./pages/TermsConditions";
// import ShippingInfo from "./pages/ShippingInfo";
// import Returns from "./pages/Returns";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/men" element={<Men />} />
//           <Route path="/women" element={<Women />} />
//           <Route path="/kids" element={<Kids />} />
//           <Route path="/accessories" element={<Accessories />} />
//           <Route path="/beauty" element={<Beauty />} />
//           <Route path="/footwear" element={<Footwear />} />
//           <Route path="/categories" element={<Categories />} />
//           <Route path="/product/:id" element={<ProductDetail />} />
//           <Route path="/brands/:brandName" element={<BrandPage />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/wishlist" element={<Wishlist />} />
//           <Route path="/payment" element={<Payment />} />
//           <Route path="/payment-success" element={<PaymentSuccess />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/admin" element={<Admin />} />
//           <Route path="/gift-cards" element={<GiftCards />} />
//           <Route path="/contact-us" element={<ContactUs />} />
//           <Route path="/faqs" element={<FAQs />} />
//           <Route path="/legal" element={<Legal />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/terms-conditions" element={<TermsConditions />} />
//           <Route path="/shipping-info" element={<ShippingInfo />} />
//           <Route path="/returns" element={<Returns />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/Header';
import Footer from './components/Footer';
// import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="min-h-screen">
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              {/* Add more routes as needed */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;