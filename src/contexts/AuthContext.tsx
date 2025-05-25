import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface StoredUserCredential {
  user: User;
  password: string;
  // Store normalized values for consistent comparison
  normalizedEmail: string;
  normalizedPassword: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Centralized normalization function - EXACTLY the same logic everywhere
const normalizeCredentials = (email: string, password: string) => {
  // Email: remove ALL whitespace (including tabs, newlines) and convert to lowercase
  const normalizedEmail = email.replace(/\s+/g, '').trim().toLowerCase();
  
  // Password: only trim leading/trailing whitespace, preserve internal spaces
  const normalizedPassword = password.trim();
  
  return {
    normalizedEmail,
    normalizedPassword
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        logout();
      }
    }
    
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Normalize inputs using centralized function
      const { normalizedEmail, normalizedPassword } = normalizeCredentials(email, password);
      
      console.log('Login attempt:', {
        originalEmail: email,
        normalizedEmail,
        originalPassword: password,
        normalizedPasswordLength: normalizedPassword.length
      });
      
      // Demo account for testing
      if (normalizedEmail === 'demo@example.com' && normalizedPassword === 'password123') {
        const mockUser: User = {
          id: 'user-1',
          name: 'Demo User',
          email: 'demo@example.com'
        };
        
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        toast({
          title: "Success!",
          description: "You've successfully logged in.",
        });
        return;
      }
      
      // Check for registered users in local storage
      const registeredUsers = localStorage.getItem('registeredUsers');
      if (registeredUsers) {
        const users: StoredUserCredential[] = JSON.parse(registeredUsers);
        
        console.log('Searching through registered users:', users.map(u => ({
          storedEmail: u.normalizedEmail,
          storedPasswordLength: u.normalizedPassword?.length || 'undefined'
        })));
        
        // First try to find by normalized credentials
        let foundUser = users.find(u => 
          u.normalizedEmail === normalizedEmail && 
          u.normalizedPassword === normalizedPassword
        );
        
        // Fallback: try to find by original email format for backward compatibility
        if (!foundUser) {
          foundUser = users.find(u => {
            const { normalizedEmail: userNormEmail, normalizedPassword: userNormPassword } = 
              normalizeCredentials(u.user.email, u.password);
            
            return userNormEmail === normalizedEmail && userNormPassword === normalizedPassword;
          });
        }
        
        if (foundUser) {
          const mockToken = 'registered-jwt-token';
          
          localStorage.setItem('token', mockToken);
          localStorage.setItem('user', JSON.stringify(foundUser.user));
          
          setUser(foundUser.user);
          toast({
            title: "Welcome Back!",
            description: "You've successfully logged in to your account.",
          });
          return;
        }
      }
      
      // If no matching user is found
      console.log('No matching user found');
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Normalize inputs using centralized function
      const { normalizedEmail, normalizedPassword } = normalizeCredentials(email, password);
      const normalizedName = name.trim();
      
      console.log('Registration attempt:', {
        originalName: name,
        normalizedName,
        originalEmail: email,
        normalizedEmail,
        originalPassword: password,
        normalizedPasswordLength: normalizedPassword.length
      });
      
      // Create a new user object with original display values
      const newUser: User = {
        id: 'user-' + Date.now(),
        name: normalizedName,
        email: normalizedEmail // Store normalized email for consistency
      };
      
      // Store user credentials
      const registeredUsers = localStorage.getItem('registeredUsers');
      const users: StoredUserCredential[] = registeredUsers ? JSON.parse(registeredUsers) : [];
      
      // Check if email already exists (using normalized comparison)
      if (users.some(u => u.normalizedEmail === normalizedEmail)) {
        toast({
          title: "Registration Failed",
          description: "This email is already registered.",
          variant: "destructive",
        });
        throw new Error('Email already registered');
      }
      
      // Add new user to storage with both original and normalized values
      const newUserCredential: StoredUserCredential = {
        user: newUser,
        password: password, // Keep original for backward compatibility
        normalizedEmail,
        normalizedPassword
      };
      
      users.push(newUserCredential);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
      console.log('User registered successfully, stored data:', newUserCredential);
      
      // Mock token and login the user after registration
      const mockToken = 'registered-jwt-token';
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setUser(newUser);
      toast({
        title: "Registration Successful!",
        description: "Your account has been created and you're now logged in.",
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out.",
    });
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};