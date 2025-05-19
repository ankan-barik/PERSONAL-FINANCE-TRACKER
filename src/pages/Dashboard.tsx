
import StatsCards from "@/components/dashboard/StatsCards";
import ExpensesPieChart from "@/components/dashboard/ExpensesPieChart";
import MonthlyBarChart from "@/components/dashboard/MonthlyBarChart";
import TransactionList from "@/components/transactions/TransactionList";
import AddTransactionForm from "@/components/transactions/AddTransactionForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <p>Loading...</p>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Financial Dashboard</h1>
        <AddTransactionForm />
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ExpensesPieChart />
        <MonthlyBarChart />
      </div>
      
      <TransactionList />
    </div>
  );
};

export default Dashboard;
