import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Add custom animation for zooming effect
const customStyles = `
@keyframes zoomInOut {
  0% { transform: scale(0.8); }
  50% { transform: scale(1.2); }
  100% { transform: scale(0.8); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-zoom {
  animation: zoomInOut 2.5s ease-in-out infinite;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

/* Improved mobile-first button styles */
.hero-button {
  min-height: 48px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

@media (min-width: 640px) {
  .hero-button {
    width: auto;
    max-width: none;
    margin: 0;
    padding: 16px 32px;
    font-size: 18px;
  }
}

.cta-button {
  min-height: 48px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

@media (min-width: 640px) {
  .cta-button {
    width: auto;
    max-width: none;
    padding: 16px 32px;
    font-size: 18px;
  }
}

/* Improved footer for mobile */
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
}

@media (min-width: 768px) {
  .footer-links {
    flex-direction: row;
    gap: 24px;
    width: auto;
  }
}

.footer-link {
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  min-width: 120px;
  text-align: center;
  width: 100%;
  max-width: 200px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

@media (min-width: 768px) {
  .footer-link {
    width: auto;
    max-width: none;
  }
}

.footer-link:hover {
  background-color: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
}

/* Mobile-specific improvements */
@media (max-width: 640px) {
  .mobile-padding {
    padding-left: 16px;
    padding-right: 16px;
  }
  
  .mobile-text-center {
    text-align: center;
  }
  
  .mobile-spacing {
    margin-bottom: 24px;
  }
}
`;

const LandingPage = () => {
  const [arrowPosition, setArrowPosition] = useState(0);
  
  // Effect for arrow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setArrowPosition(prev => prev === 0 ? 5 : 0);
    }, 400);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <style>{customStyles}</style>
      
      {/* Hero Section - Mobile Optimized */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-100 py-8 sm:py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight mobile-padding">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Take Control</span>{" "}
                <span className="text-black">of Your Finances</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0 mobile-padding">
                Easily track your income, expenses, and savings with our intuitive Expensia.
                Visualize your spending habits and make informed decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start mobile-padding">
                <Button 
                  size="lg" 
                  className="hero-button bg-gradient-to-r from-red-600 to-blue-700 hover:from-blue-700 hover:to-red-700 text-white animate-zoom" 
                  asChild
                >
                  <Link to="/register" className="flex items-center justify-center gap-2">
                    Get Started
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="transition-transform duration-300"
                      style={{ transform: `translateX(${arrowPosition}px)` }}
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
                <img 
                  src="/financial-literacy-workshop-teens-fun-3d-scene-with-financial-advisor-teaching-budgeting-s_980716-151020.avif" 
                  alt="Finance Tracking" 
                  className="w-full h-auto rounded-2xl sm:rounded-full shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Optimized */}
      <section className="py-8 sm:py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4 text-black mobile-padding">
            Powerful Features
          </h2>
          <p className="text-center text-gray-600 mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto px-4 text-sm sm:text-base">
            Everything you need to manage your personal finances, all in one place
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 hover:scale-105 animate-fade-in">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-800 to-pink-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 transform -rotate-6 hover:rotate-0 transition-all duration-300 mx-auto sm:mx-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path>
                  <path d="M7 15h0"></path>
                  <path d="M11 15h0"></path>
                  <path d="M7 11h0"></path>
                  <path d="M11 11h0"></path>
                  <path d="M15 11h0"></path>
                  <path d="M7 7h0"></path>
                  <path d="M11 7h0"></path>
                  <path d="M15 7h0"></path>
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent text-center sm:text-left">
                Track Transactions
              </h3>
              <p className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                Easily add income and expenses with detailed categorization to keep track of where your money goes.
              </p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 hover:scale-105 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-700 to-indigo-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 transform -rotate-6 hover:rotate-0 transition-all duration-300 mx-auto sm:mx-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20M4.2 19.8A9.9 9.9 0 0 1 2 12a9.9 9.9 0 0 1 2.2-7.8M19.8 4.2A9.9 9.9 0 0 1 22 12a9.9 9.9 0 0 1-2.2 7.8"></path>
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent text-center sm:text-left">
                Visual Analytics
              </h3>
              <p className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                Beautiful charts and graphs help you understand your spending habits and financial trends at a glance.
              </p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 hover:scale-105 animate-fade-in sm:col-span-2 md:col-span-1" style={{ animationDelay: "0.4s" }}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-700 to-orange-400 rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 transform -rotate-6 hover:rotate-0 transition-all duration-300 mx-auto sm:mx-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent text-center sm:text-left">
                Real-time Updates
              </h3>
              <p className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                See your financial data update instantly as you add new transactions, with immediate recalculation of totals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-600 text-white py-8 sm:py-12 md:py-16 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 mobile-padding">
            Ready to take control of your finances?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto mobile-padding">
            Join thousands of users who are managing their money better with our Expensia.
          </p>
          <Button 
            variant="secondary" 
            className="cta-button bg-white text-blue-600 hover:bg-gray-100" 
            asChild
          >
            <Link to="/register">
              Create Your Free Account
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="text-center md:text-left mobile-spacing">
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Expensia
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">Your personal finance management solution.</p>
            </div>
            <div className="footer-links">
              <Link to="/login" className="footer-link">Login</Link>
              <Link to="/register" className="footer-link">Register</Link>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-800 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Expensia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
