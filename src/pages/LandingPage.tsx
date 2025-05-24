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

.animate-zoom {
  animation: zoomInOut 2.5s ease-in-out infinite;
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
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Take Control</span> of Your Finances
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                Easily track your income, expenses, and savings with our intuitive Expensia.
                Visualize your spending habits and make informed decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="ml-3 bg-gradient-to-r from-red-600 to-blue-700 hover:from-blue-700 hover:to-red-700 text-white font-medium animate-zoom" 
                  asChild
                >
                  <Link to="/register" className="flex items-center justify-items-stretch">
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
                      className="ml-2 transition-transform duration-300"
                      style={{ transform: `translateX(${arrowPosition}px)` }}
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-2/2 flex justify-center">
             <div className="relative w-full max-w-lg mx-auto"> {/* from max-w-md to max-w-lg */}
  <img 
    src="src/pages/financial-literacy-workshop-teens-fun-3d-scene-with-financial-advisor-teaching-budgeting-s_980716-151020.avif" 
    alt="Finance Tracking" 
    className="w-full h-auto relative rounded-s-full shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
  />
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Powerful Features</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Everything you need to manage your personal finances, all in one place
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 hover:scale-105 animate-fade-in">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-800 to-pink-500 rounded-xl flex items-center justify-center mb-6 transform -rotate-6 hover:rotate-0 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white animate-pulse">
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
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">Track Transactions</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Easily add income and expenses with detailed categorization to keep track of where your money goes.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 hover:scale-105 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-700 to-indigo-500 rounded-xl flex items-center justify-center mb-6 transform -rotate-6 hover:rotate-0 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white animate-pulse">
                  <path d="M12 2v20M2 12h20M4.2 19.8A9.9 9.9 0 0 1 2 12a9.9 9.9 0 0 1 2.2-7.8M19.8 4.2A9.9 9.9 0 0 1 22 12a9.9 9.9 0 0 1-2.2 7.8"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent">Visual Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Beautiful charts and graphs help you understand your spending habits and financial trends at a glance.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 hover:scale-105 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-700 to-orange-400 rounded-xl flex items-center justify-center mb-6 transform -rotate-6 hover:rotate-0 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white animate-pulse">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">Real-time Updates</h3>
              <p className="text-gray-600 dark:text-gray-400">
                See your financial data update instantly as you add new transactions, with immediate recalculation of totals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-600 text-white py-16 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your finances?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are managing their money better with our Expensia.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-blue-600 hover:bg-gray-100 font-medium " 
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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"> Expensia</h3>
              <p className="text-gray-400">Your personal finance management solution</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link>
              <Link to="/register" className="hover:text-blue-400 transition-colors">Register</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Expensia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;