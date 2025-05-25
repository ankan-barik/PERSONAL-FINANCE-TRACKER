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
  const [emailValidation, setEmailValidation] = useState({
    isValid: false,
    message: "",
    isChecking: false
  });

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Simple email format validation for reset
  useEffect(() => {
    if (!resetEmail || !showForgotPassword) {
      setEmailValidation({ isValid: false, message: "", isChecking: false });
      return;
    }

    const normalizedEmail = resetEmail.replace(/\s+/g, '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(normalizedEmail)) {
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
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Input handlers - store raw values exactly as user types
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleResetEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetEmail(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    // Basic email validation before attempting login
    const normalizedEmailForValidation = email.replace(/\s+/g, '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmailForValidation)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Pass raw values to login - normalization happens in AuthContext
      await login(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      setError("Invalid credentials. Please check your email and password and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResetMessage("");

    const normalizedResetEmail = resetEmail.replace(/\s+/g, '').trim().toLowerCase();

    if (!normalizedResetEmail) {
      setError("Please enter your email address");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedResetEmail)) {
      setError("Please enter a valid email format");
      return;
    }

    try {
      setIsResetting(true);
      // Simulate successful password reset for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setResetMessage(`Password reset instructions have been sent to ${normalizedResetEmail}. Please check your inbox and follow the instructions to reset your password. The link will expire in 1 hour.`);
      setResetEmail("");
      setEmailValidation({ isValid: false, message: "", isChecking: false });
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

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={backToLogin}
                className="p-1 h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            </div>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password.
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
                    autoCapitalize="none"
                    autoCorrect="off"
                    autoComplete="email"
                    value={resetEmail}
                    onChange={handleResetEmailChange}
                    placeholder="Enter your email"
                    className="pl-10 pr-10 text-base"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getEmailValidationIcon()}
                  </div>
                </div>
                {emailValidation.message && (
                  <p className={`text-sm ${emailValidation.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {emailValidation.message}
                  </p>
                )}
              </div>
              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md border border-red-200">
                  {error}
                </div>
              )}
              {resetMessage && (
                <div className="text-green-600 text-sm text-center p-3 bg-green-50 rounded-md border border-green-200">
                  {resetMessage}
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isResetting || !emailValidation.isValid}
              >
                {isResetting ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <button 
                onClick={backToLogin}
                className="text-blue-600 hover:underline"
              >
                Back to login
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
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
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="text-base"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className="text-base"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;