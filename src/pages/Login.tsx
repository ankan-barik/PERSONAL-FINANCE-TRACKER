import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, ArrowLeft, CheckCircle, XCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [emailValidation, setEmailValidation] = useState({ isValid: false, message: "", isChecking: false });
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Simple email format validation (no backend calls)
  useEffect(() => {
    if (!resetEmail || !showForgotPassword) {
      setEmailValidation({ isValid: false, message: "", isChecking: false });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(resetEmail)) {
      setEmailValidation({ 
        isValid: true, 
        message: "Email format is valid", 
        isChecking: false 
      });
    } else {
      setEmailValidation({ 
        isValid: false, 
        message: "Please enter a valid email format", 
        isChecking: false 
      });
    }
  }, [resetEmail, showForgotPassword]);
  
  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // This will call your actual login API
      await login(email, password);
      
      // Navigate to dashboard on successful login
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");
    
    if (!resetEmail) {
      setError("Please enter your email address");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setError("Please enter a valid email format");
      return;
    }
    
    try {
      setIsResetting(true);
      
      // Simulate successful password reset for demo
      // Replace this with your actual API call when backend is ready
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      setResetMessage(`Password reset instructions have been sent to ${resetEmail}. Please check your inbox and follow the instructions to reset your password. The link will expire in 1 hour.`);
      setResetEmail("");
      setEmailValidation({ isValid: false, message: "", isChecking: false });
      
      // Uncomment below when your backend API is ready:
      /*
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          email: resetEmail,
          resetUrl: `${window.location.origin}/reset-password`
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setResetMessage(`Password reset instructions have been sent to ${resetEmail}. Please check your inbox and follow the instructions to reset your password. The link will expire in ${data.expiresIn || '1 hour'}.`);
        setResetEmail("");
        setEmailValidation({ isValid: false, message: "", isChecking: false });
      } else if (response.status === 404) {
        setError("Email not found in our records");
      } else if (response.status === 429) {
        setError("Too many reset attempts. Please try again later");
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.message || "Failed to send reset email. Please try again.");
      }
      */
      
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsResetting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const backToLogin = () => {
    setShowForgotPassword(false);
    setError("");
    setResetMessage("");
    setResetEmail("");
    setEmailValidation({ isValid: false, message: "", isChecking: false });
  };

  const getEmailValidationIcon = () => {
    if (emailValidation.isChecking) {
      return <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />;
    }
    if (resetEmail && emailValidation.message) {
      return emailValidation.isValid ? 
        <CheckCircle className="h-4 w-4 text-green-500" /> : 
        <XCircle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const getEmailValidationColor = () => {
    if (!resetEmail || !emailValidation.message) return "";
    return emailValidation.isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";
  };
  
  if (showForgotPassword) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900">
        <div className="w-full max-w-md p-4 animate-fade-in">
          <Card className="shadow-2xl border-0 bg-white dark:bg-slate-800 rounded-xl">
            <CardHeader className="space-y-1 pb-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={backToLogin}
                  className="p-1 h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">Reset Password</CardTitle>
              </div>
              <CardDescription className="text-center text-gray-500 dark:text-gray-400">
                Enter your email address and we'll send you instructions to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resetEmail">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="resetEmail"
                      type="email"
                      placeholder="name@example.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className={`pl-10 pr-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
                        resetEmail && emailValidation.message ? 
                        (emailValidation.isValid ? 'border-green-500 focus:border-green-500' : 'border-red-500 focus:border-red-500') : ''
                      }`}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {getEmailValidationIcon()}
                    </div>
                  </div>
                  {resetEmail && emailValidation.message && (
                    <p className={`text-xs ${getEmailValidationColor()}`}>
                      {emailValidation.message}
                    </p>
                  )}
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                  </div>
                )}
                
                {resetMessage && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">{resetMessage}</p>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50" 
                  disabled={isResetting || emailValidation.isChecking}
                >
                  {isResetting ? "Sending..." : "Send Reset Email"}
                </Button>
                
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  <p>Reset link will be valid for 1 hour</p>
                  <p>Check your spam folder if you don't see the email</p>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <button 
                  onClick={backToLogin}
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Back to Login
                </button>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900">
      <div className="w-full max-w-md p-4 animate-fade-in">
        <Card className="shadow-2xl border-0 bg-white dark:bg-slate-800 rounded-xl">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">Welcome Back</CardTitle>
            <CardDescription className="text-center text-gray-500 dark:text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button 
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              
              <div className="text-sm text-center text-muted-foreground bg-gray-50 dark:bg-gray-700/30 p-2 rounded-md border border-gray-100 dark:border-gray-700">
                <span className="text-muted-foreground">For testing, use: </span>
                <span className="font-medium">demo@example.com / password123</span>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;