import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

// SAME utility function as in Login component
const normalizeInput = (value: string, type: 'email' | 'password' | 'text') => {
  if (!value) return '';
  
  switch (type) {
    case 'email':
      // Remove all whitespace and convert to lowercase
      return value.replace(/\s+/g, '').toLowerCase();
    case 'password':
      // Only trim leading/trailing whitespace, preserve internal spaces
      return value.trim();
    case 'text':
      // Trim whitespace
      return value.trim();
    default:
      return value.trim();
  }
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  // Input handlers - store raw values, normalize on submission
  const handleNameChange = (e) => {
    const rawValue = e.target.value;
    setName(rawValue);
  };

  const handleEmailChange = (e) => {
    const rawValue = e.target.value;
    setEmail(rawValue);
  };

  const handlePasswordChange = (e) => {
    const rawValue = e.target.value;
    setPassword(rawValue);
  };

  const handleConfirmPasswordChange = (e) => {
    const rawValue = e.target.value;
    setConfirmPassword(rawValue);
  };

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 6 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Normalize inputs using SAME function as Login
    const normalizedName = normalizeInput(name, 'text');
    const normalizedEmail = normalizeInput(email, 'email');
    const normalizedPassword = normalizeInput(password, 'password');
    const normalizedConfirmPassword = normalizeInput(confirmPassword, 'password');

    console.log('Registration Debug:', {
      rawName: name,
      normalizedName,
      rawEmail: email,
      normalizedEmail,
      rawPassword: password,
      normalizedPasswordLength: normalizedPassword.length
    });

    if (!normalizedName || !normalizedEmail || !normalizedPassword || !normalizedConfirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password strength
    const passwordError = validatePassword(normalizedPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (normalizedPassword !== normalizedConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Use SAME normalized values as Login would use
      await register(normalizedName, normalizedEmail, normalizedPassword);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. This email may already be in use. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                autoCapitalize="words"
                autoCorrect="off"
                autoComplete="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your full name"
                className="text-base" // Prevents zoom on iOS
                required
              />
            </div>
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
                className="text-base" // Prevents zoom on iOS
                required
              />
              <p className="text-xs text-gray-500">
                Normalized: {normalizeInput(email, 'email')}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Create a password"
                  className="text-base" // Prevents zoom on iOS
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <p>Password must contain:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>At least 6 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One special character</li>
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm your password"
                  className="text-base" // Prevents zoom on iOS
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
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
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;