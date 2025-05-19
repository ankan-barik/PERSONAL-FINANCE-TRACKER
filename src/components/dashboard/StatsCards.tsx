
import { useTransactions } from "@/contexts/TransactionContext";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";

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
      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-l-4 border-finance-income hover:shadow-md transition-shadow">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Total Income</p>
            <p className="text-2xl font-bold text-finance-income">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-finance-income/10 flex items-center justify-center">
            <ArrowUpRight className="h-6 w-6 text-finance-income" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-l-4 border-finance-expense hover:shadow-md transition-shadow">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold text-finance-expense">{formatCurrency(totalExpenses)}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-finance-expense/10 flex items-center justify-center">
            <ArrowDownRight className="h-6 w-6 text-finance-expense" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-finance-savings hover:shadow-md transition-shadow">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-finance-savings' : 'text-finance-expense'}`}>
              {formatCurrency(balance)}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-finance-savings/10 flex items-center justify-center">
            <Wallet className="h-6 w-6 text-finance-savings" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
