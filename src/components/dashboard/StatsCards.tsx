
import { useTransactions } from "@/contexts/TransactionContext";

export default function StatsCards() {
  const { getTotalIncome, getTotalExpenses, getBalance } = useTransactions();
  
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = getBalance();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="stats-card income-card hover-scale">
        <h3 className="text-lg font-medium text-gray-700">Total Income</h3>
        <p className="text-2xl font-bold text-finance-income">{formatCurrency(totalIncome)}</p>
      </div>
      
      <div className="stats-card expense-card hover-scale">
        <h3 className="text-lg font-medium text-gray-700">Total Expenses</h3>
        <p className="text-2xl font-bold text-finance-expense">{formatCurrency(totalExpenses)}</p>
      </div>
      
      <div className="stats-card balance-card hover-scale">
        <h3 className="text-lg font-medium text-gray-700">Current Balance</h3>
        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-finance-savings' : 'text-finance-expense'}`}>
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  );
}
