import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, CheckCircle, XCircle, User, Mail } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    special: false,
    match: false
  });
  const [emailValidation, setEmailValidation] = useState({
    isValid: false,
    message: "",
    isChecking: false
  });

  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Email validation effect
  useEffect(() => {
    if (!email) {
      setEmailValidation({ isValid: false, message: "", isChecking: false });
      return;
    }

    const normalizedEmail = email.replace(/\s+/g, '').trim().toLowerCase();
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
  }, [email]);

  // Password validation effect
  useEffect(() => {
    const trimmedPassword = password.trim();
    
    setPasswordValidation({
      length: trimmedPassword.length >= 6,
      uppercase: /[A-Z]/.test(trimmedPassword),
      lowercase: /[a-z]/.test(trimmedPassword),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(trimmedPassword),
      match: trimmedPassword === confirmPassword.trim() && trimmedPassword.length > 0
    });
  }, [password, confirmPassword]);

  // Input handlers - store raw values exactly as user types
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  // Password validation function
  const validatePassword = (password: string) => {
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation with trimmed values
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    // Name validation
    if (trimmedName.length < 2) {
      setError("Name must be at least 2 characters long");
      return;
    }

    // Basic email validation
    const normalizedEmail = trimmedEmail.replace(/\s+/g, '').toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password strength
    const passwordError = validatePassword(trimmedPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Pass raw values to register - normalization happens in AuthContext
      await register(name, email, password);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.message === 'Email already registered') {
        setError("This email is already registered. Please use a different email or try logging in.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getValidationIcon = (isValid: boolean) => {
    return isValid ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getEmailValidationIcon = () => {
    if (emailValidation.isChecking) {
      return <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />;
    }
    if (email && emailValidation.message) {
      return emailValidation.isValid ? 
        <CheckCircle className="h-4 w-4 text-green-500" /> : 
        <XCircle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const isFormValid = () => {
    return name.trim().length >= 2 &&
           emailValidation.isValid &&
           passwordValidation.length &&
           passwordValidation.uppercase &&
           passwordValidation.lowercase &&
           passwordValidation.special &&
           passwordValidation.match;
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
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="name"
                  type="text"
                  autoCapitalize="words"
                  autoCorrect="off"
                  autoComplete="name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Enter your full name"
                  className="pl-10 text-base"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
                  className="text-base pr-10"
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
              
              {password && (
                <div className="text-xs space-y-1 bg-gray-50 p-3 rounded-md">
                  <p className="font-medium text-gray-700">Password Requirements:</p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      {getValidationIcon(passwordValidation.length)}
                      <span className={passwordValidation.length ? 'text-green-600' : 'text-red-600'}>
                        At least 6 characters
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getValidationIcon(passwordValidation.uppercase)}
                      <span className={passwordValidation.uppercase ? 'text-green-600' : 'text-red-600'}>
                        One uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getValidationIcon(passwordValidation.lowercase)}
                      <span className={passwordValidation.lowercase ? 'text-green-600' : 'text-red-600'}>
                        One lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getValidationIcon(passwordValidation.special)}
                      <span className={passwordValidation.special ? 'text-green-600' : 'text-red-600'}>
                        One special character
                      </span>
                    </div>
                  </div>
                </div>
              )}
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
                  className="text-base pr-10"
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
              
              {confirmPassword && (
                <div className="flex items-center space-x-2 text-xs">
                  {getValidationIcon(passwordValidation.match)}
                  <span className={passwordValidation.match ? 'text-green-600' : 'text-red-600'}>
                    Passwords {passwordValidation.match ? 'match' : 'do not match'}
                  </span>
                </div>
              )}
            </div>
            
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting || !isFormValid()}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;