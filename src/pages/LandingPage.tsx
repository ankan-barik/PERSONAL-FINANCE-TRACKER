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

/* Custom responsive button styles */
.hero-button {
  min-height: 48px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .hero-button {
    width: auto;
    max-width: none;
    margin: 0;
  }
}

.cta-button {
  min-height: 48px;
  padding: 12px 32px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  display: allow;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}

@media (min-width: 600px) {
  .cta-button {
    width: auto;
    max-width: none;
  }
}

/* Footer link improvements */
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

@media (min-width: 768px) {
  .footer-links {
    flex-direction: row;
    gap: 24px;
  }
}

.footer-link {
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.3s ease;
  min-width: 100px;
  text-align: center;
}

.footer-link:hover {
  background-color: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-100 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2 text-center md:text-left">
             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Take Control</span> <span className="text-black">of Your Finances</span>
</h1>

              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
                Easily track your income, expenses, and savings with our intuitive Expensia.
                Visualize your spending habits and make informed decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
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
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-sm md:max-w-lg mx-auto">
                <img 
                  src="src/image/financial-literacy-workshop-teens-fun-3d-scene-with-financial-advisor-teaching-budgeting-s_980716-151020.avif" 
                  alt="Finance Tracking" 
                  className="w-full h-auto rounded-full shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* Features Section */}
<section className="py-12 md:py-20 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-black">Powerful Features</h2>
    <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
      Everything you need to manage your personal finances, all in one place
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 hover:scale-105 animate-fade-in">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-800 to-pink-500 rounded-xl flex items-center justify-center mb-4 md:mb-6 transform -rotate-6 hover:rotate-0 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white animate-pulse">
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
        <h3 className="text-lg md:text-xl font-semibold mb-3 bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">Track Transactions</h3>
        <p className="text-gray-600 text-sm md:text-base">
          Easily add income and expenses with detailed categorization to keep track of where your money goes.
        </p>
      </div>
      
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 hover:scale-105 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-700 to-indigo-500 rounded-xl flex items-center justify-center mb-4 md:mb-6 transform -rotate-6 hover:rotate-0 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white animate-pulse">
            <path d="M12 2v20M2 12h20M4.2 19.8A9.9 9.9 0 0 1 2 12a9.9 9.9 0 0 1 2.2-7.8M19.8 4.2A9.9 9.9 0 0 1 22 12a9.9 9.9 0 0 1-2.2 7.8"></path>
          </svg>
        </div>
        <h3 className="text-lg md:text-xl font-semibold mb-3 bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent">Visual Analytics</h3>
        <p className="text-gray-600 text-sm md:text-base">
          Beautiful charts and graphs help you understand your spending habits and financial trends at a glance.
        </p>
      </div>
      
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 hover:scale-105 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-700 to-orange-400 rounded-xl flex items-center justify-center mb-4 md:mb-6 transform -rotate-6 hover:rotate-0 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white animate-pulse">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
        </div>
        <h3 className="text-lg md:text-xl font-semibold mb-3 bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">Real-time Updates</h3>
        <p className="text-gray-600 text-sm md:text-base">
          See your financial data update instantly as you add new transactions, with immediate recalculation of totals.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-600 text-white py-12 md:py-16 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to take control of your finances?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto px-4">
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Expensia</h3>
              <p className="text-gray-400">Your personal finance management solution.</p>
            </div>
            <div className="footer-links">
              <Link to="/login" className="footer-link">Login</Link>
              <Link to="/register" className="footer-link">Register</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Expensia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
