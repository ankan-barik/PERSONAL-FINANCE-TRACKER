import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo and App Name - Fixed positioning */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 no-underline">
              <div className="relative group flex-shrink-0">
                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 150 150"
                  className="drop-shadow-2xl hover:drop-shadow-2xl transition-all duration-500 hover:scale-105"
                  style={{ minWidth: '90px', minHeight: '90px' }}
                >
                  <defs>
                    {/* Advanced Gradients */}
                    <radialGradient id="treeCore" cx="40%" cy="20%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="30%" stopColor="#22c55e" />
                      <stop offset="70%" stopColor="#16a34a" />
                      <stop offset="100%" stopColor="#15803d" />
                    </radialGradient>
                    
                    <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#92400e" />
                      <stop offset="50%" stopColor="#a16207" />
                      <stop offset="100%" stopColor="#ca8a04" />
                    </linearGradient>
                    
                    <radialGradient id="leafGradient" cx="30%" cy="30%">
                      <stop offset="0%" stopColor="#84cc16" />
                      <stop offset="50%" stopColor="#65a30d" />
                      <stop offset="100%" stopColor="#4d7c0f" />
                    </radialGradient>
                    
                    <linearGradient id="moneyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    
                    <radialGradient id="glowEffect" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="70%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </radialGradient>

                    {/* Filters */}
                    <filter id="leafGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="leafBlur"/>
                      <feMerge> 
                        <feMergeNode in="leafBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    
                    <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="goldBlur"/>
                      <feMerge> 
                        <feMergeNode in="goldBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Base Shadow */}
                  <ellipse cx="80" cy="115" rx="45" ry="18" fill="#1f2937" opacity="0.3" />
                  
                  {/* Money Tree Trunk */}
                  <g className="group-hover:animate-pulse">
                    <rect x="65" y="80" width="20" height="40" fill="url(#trunkGradient)" rx="10" />
                    <rect x="67" y="85" width="4" height="30" fill="#d97706" opacity="0.6" />
                    <rect x="79" y="90" width="4" height="25" fill="#d97706" opacity="0.6" />
                  </g>
                  
                  {/* Main Tree Crown */}
                  <g className="group-hover:animate-bounce" style={{ animationDuration: '2s' }}>
                    {/* Large Center Leaf */}
                    <circle cx="75" cy="60" r="25" fill="url(#treeCore)" stroke="#16a34a" strokeWidth="3" filter="url(#leafGlow)" />
                    
                    {/* Side Leaves */}
                    <circle cx="50" cy="55" r="18" fill="url(#leafGradient)" opacity="0.8" />
                    <circle cx="100" cy="55" r="18" fill="url(#leafGradient)" opacity="0.8" />
                    <circle cx="60" cy="35" r="15" fill="url(#leafGradient)" opacity="0.7" />
                    <circle cx="90" cy="35" r="15" fill="url(#leafGradient)" opacity="0.7" />
                    <circle cx="75" cy="25" r="12" fill="url(#leafGradient)" opacity="0.6" />
                  </g>
                  
                  {/* Falling Money Leaves */}
                  <g className="animate-bounce" style={{ animationDuration: '3s' }}>
                    <g transform="translate(40,45)">
                      <circle r="6" fill="url(#moneyGradient)" stroke="#d97706" strokeWidth="1" filter="url(#goldGlow)" />
                      <text textAnchor="middle" y="3" fontSize="8" fontWeight="bold" fill="#ffffff">$</text>
                      <animateTransform 
                        attributeName="transform" 
                        type="translate" 
                        values="40,45; 35,70; 30,95" 
                        dur="4s" 
                        repeatCount="indefinite"
                      />
                    </g>
                    
                    <g transform="translate(110,40)">
                      <circle r="6" fill="url(#moneyGradient)" stroke="#d97706" strokeWidth="1" filter="url(#goldGlow)" />
                      <text textAnchor="middle" y="3" fontSize="8" fontWeight="bold" fill="#ffffff">€</text>
                      <animateTransform 
                        attributeName="transform" 
                        type="translate" 
                        values="110,40; 115,65; 120,90" 
                        dur="5s" 
                        repeatCount="indefinite"
                      />
                    </g>
                    
                    <g transform="translate(25,30)">
                      <circle r="5" fill="url(#moneyGradient)" stroke="#d97706" strokeWidth="1" filter="url(#goldGlow)" />
                      <text textAnchor="middle" y="2" fontSize="7" fontWeight="bold" fill="#ffffff">¥</text>
                      <animateTransform 
                        attributeName="transform" 
                        type="translate" 
                        values="25,30; 20,60; 15,90" 
                        dur="6s" 
                        repeatCount="indefinite"
                      />
                    </g>
                  </g>
                  
                  {/* Growing Branches */}
                  <g className="animate-pulse" style={{ animationDuration: '2s' }}>
                    <path d="M75,80 Q85,70 95,60" stroke="#a16207" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
                    <path d="M75,80 Q65,70 55,60" stroke="#a16207" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
                    <path d="M75,75 Q80,65 85,55" stroke="#a16207" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
                    <path d="M75,75 Q70,65 65,55" stroke="#a16207" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
                  </g>
                  
                  {/* Orbiting Success Coins */}
                  <g className="animate-spin" style={{ transformOrigin: '75px 65px', animationDuration: '10s' }}>
                    <g transform="translate(75,15)">
                      <circle r="8" fill="url(#moneyGradient)" stroke="#d97706" strokeWidth="2" />
                      <text textAnchor="middle" y="4" fontSize="10" fontWeight="bold" fill="#ffffff">$</text>
                    </g>
                    
                    <g transform="translate(125,65)">
                      <circle r="8" fill="url(#moneyGradient)" stroke="#d97706" strokeWidth="2" />
                      <text textAnchor="middle" y="4" fontSize="10" fontWeight="bold" fill="#ffffff">£</text>
                    </g>
                    
                    <g transform="translate(25,65)">
                      <circle r="8" fill="url(#moneyGradient)" stroke="#d97706" strokeWidth="2" />
                      <text textAnchor="middle" y="4" fontSize="10" fontWeight="bold" fill="#ffffff">€</text>
                    </g>
                  </g>
                  
                  {/* Growth Sparkles */}
                  <g className="animate-ping" style={{ animationDuration: '2s' }}>
                    <path d="M35,30 L37,34 L41,34 L38,37 L39,41 L35,39 L31,41 L32,37 L29,34 L33,34 Z" fill="#fbbf24" opacity="0.8" />
                    <path d="M115,35 L117,39 L121,39 L118,42 L119,46 L115,44 L111,46 L112,42 L109,39 L113,39 Z" fill="#34d399" opacity="0.8" />
                    <path d="M45,25 L47,29 L51,29 L48,32 L49,36 L45,34 L41,36 L42,32 L39,29 L43,29 Z" fill="#22c55e" opacity="0.7" />
                  </g>
                  
                  {/* Root System (Underground Growth) */}
                  <g opacity="0.4" className="animate-pulse" style={{ animationDuration: '3s' }}>
                    <path d="M75,120 Q85,125 95,130" stroke="#92400e" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M75,120 Q65,125 55,130" stroke="#92400e" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M75,120 Q80,128 85,135" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M75,120 Q70,128 65,135" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </g>
                  
                  {/* Prosperity Aura */}
                  <circle 
                    cx="75" 
                    cy="65" 
                    r="40" 
                    fill="none" 
                    stroke="url(#glowEffect)" 
                    strokeWidth="1" 
                    opacity="0.2"
                    className="animate-pulse"
                    style={{ animationDuration: '4s' }}
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start justify-center flex-shrink-0">
                <span className="text-3xl font-bold bg-gradient-to-r from-yellow-500 via-green-600 to-emerald-500 bg-clip-text text-transparent whitespace-nowrap">
                  Expensia
                </span>
                <span className="text-xs text-gray-500 tracking-wide whitespace-nowrap">"Simplify Spending. Amplify Success."</span>
              </div>
            </Link>
          </div>

          {/* Auth Section - Fixed positioning */}
          <div className="flex items-center flex-shrink-0 ml-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 hidden sm:inline whitespace-nowrap">
                  Welcome, {user?.name || 'User'}
                </span>
                <Button variant="outline" onClick={logout} className="whitespace-nowrap">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild className="whitespace-nowrap">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="whitespace-nowrap">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}