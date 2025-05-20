
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
      
      // Demo account for testing
      if (email === 'demo@example.com' && password === 'password123') {
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
        const foundUser = users.find(u => u.user.email === email && u.password === password);
        
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
      
      // Create a new user object
      const newUser: User = {
        id: 'user-' + Date.now(),
        name,
        email
      };
      
      // Store user credentials
      const registeredUsers = localStorage.getItem('registeredUsers');
      const users: StoredUserCredential[] = registeredUsers ? JSON.parse(registeredUsers) : [];
      
      // Check if email already exists
      if (users.some(u => u.user.email === email)) {
        toast({
          title: "Registration Failed",
          description: "This email is already registered.",
          variant: "destructive",
        });
        throw new Error('Email already registered');
      }
      
      // Add new user to storage
      users.push({
        user: newUser,
        password
      });
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
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
