
import { useState } from 'react';
import { useTransactions } from '@/contexts/TransactionContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionCategory, TransactionType } from '@/types';
import { ChevronDown, ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TransactionList() {
  const { transactions, deleteTransaction } = useTransactions();
  const [filter, setFilter] = useState<TransactionType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Filter and sort transactions
  const filteredAndSortedTransactions = [...transactions]
    // Filter by type
    .filter(transaction => {
      if (filter === 'all') return true;
      return transaction.type === filter;
    })
    // Sort by selected criteria
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return sortDirection === 'asc' 
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'amount':
          return sortDirection === 'asc' 
            ? a.amount - b.amount
            : b.amount - a.amount;
        case 'category':
          return sortDirection === 'asc' 
            ? a.category.localeCompare(b.category)
            : b.category.localeCompare(a.category);
        default:
          return 0;
      }
    });
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  const formatCategoryName = (category: TransactionCategory): string => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleSortSelect = (value: string) => {
    if (value === 'date' || value === 'amount' || value === 'category') {
      setSortBy(value);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle>Recent Transactions</CardTitle>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0 w-full sm:w-auto">
            <Select value={filter} onValueChange={(value: string) => setFilter(value as TransactionType | 'all')}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-[150px] justify-between">
                  <span>Sort by {sortBy}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuItem onClick={() => handleSortSelect('date')}>
                  Date
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortSelect('amount')}>
                  Amount
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortSelect('category')}>
                  Category
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="w-10 h-10"
            >
              <ArrowUpDown className={`h-4 w-4 transition-all ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredAndSortedTransactions.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">No transactions found</p>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{formatCategoryName(transaction.category)}</TableCell>
                    <TableCell className={transaction.type === 'income' ? 'text-finance-income' : 'text-finance-expense'}>
                      {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteTransaction(transaction.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
