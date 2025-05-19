
import StatsCards from "@/components/dashboard/StatsCards";
import ExpensesPieChart from "@/components/dashboard/ExpensesPieChart";
import MonthlyBarChart from "@/components/dashboard/MonthlyBarChart";
import TransactionList from "@/components/transactions/TransactionList";
import AddTransactionForm from "@/components/transactions/AddTransactionForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/20"></div>
          <div className="h-4 w-32 rounded bg-muted"></div>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="container mx-auto py-6 px-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Financial Dashboard</h1>
          <p className="text-muted-foreground">Manage your finances with ease</p>
        </div>

        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <ThemeToggle />
          <AddTransactionForm />
        </div>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-4 border-b border-border/30">
              <h3 className="font-medium text-lg">Expense Distribution</h3>
            </div>
            <div className="p-4">
              <ExpensesPieChart />
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-4 border-b border-border/30">
              <h3 className="font-medium text-lg">Monthly Overview</h3>
            </div>
            <div className="p-4">
              <MonthlyBarChart />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <TransactionList />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
