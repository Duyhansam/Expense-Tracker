import React, { useEffect, useState } from "react";
import ExpenseForm from "./components/TargetList/ExpenseForm";
import ExpenseList from "./components/TargetList/ExpenseList";
import ExpenseSummary from "./components/TargetList/ExpenseSummary";
import { initialExpenses } from "./data/expense.js";
import ExpenseSearch from "./components/TargetList/ExpenseSearch.jsx";
import ExpenseSort from "./components/TargetList/ExpenseSort.jsx";
import ExpenseFilter from "./components/TargetList/ExpenseFilter.jsx";
import { categoryConfig } from "./data/categories.js";
import ExpenseChart from "./components/TargetList/ExpenseChart.jsx";
export default function App() {
  // Danh sách chi tiêu
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (!storedExpenses) return initialExpenses;
    return JSON.parse(storedExpenses).map((exp) => ({
      ...exp,
      date: exp.date ? new Date(exp.date) : null,
    }));
  });
  const [dateFilter, setDateFilter] = useState("Tất cả");
  // Các tìm kiếm
  const [search, setSearch] = useState("");
  // Sắp xếp
  const [sortBy, setSortBy] = useState("category-az");
  // Lọc theo danh mục
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  // Chỉnh sửa chi tiêu
  const [editingExpense, setEditingExpense] = useState(null);
  // Lọc theo số tiền
  const [limitAmount, setLimitAmount] = useState("");
  // Lọc theo tháng
  const [selectedMonth, setSelectedMonth] = useState("Tất cả");
  const [buget, setBudget] = useState(1000000);

  // Lưu chi tiêu vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Lọc chi tiêu theo tìm kiếm và danh mục
  const displayedExpenses = expenses
    .filter((expense) =>
      expense.name.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((expense) =>
      selectedCategory === "Tất cả"
        ? true
        : expense.category === selectedCategory,
    )
    .filter((expense) => {
      switch (limitAmount) {
        case "under-100":
          return expense.amount < 100000;
        case "100k-500k":
          return expense.amount >= 100000 && expense.amount <= 500000;
        case "500k-1m":
          return expense.amount > 500000 && expense.amount <= 1000000;
        case "over-1m":
          return expense.amount > 1000000;
        default:
          return true;
      }
    })
    .filter((expense) => {
      if (!expense.date) {
        return dateFilter === "Tất cả";
      }
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      const expenseDate = new Date(expense.date);
      expenseDate.setHours(0, 0, 0, 0);
      switch (dateFilter) {
        case "7days": {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(today.getDate() - 7);
          return expenseDate >= sevenDaysAgo;
        }
        case "30days": {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(today.getDate() - 30);
          return expenseDate >= thirtyDaysAgo;
        }
        case "thisYear":
          return expenseDate.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    });

  const currentMonth = new Date().getMonth();
  const currentMonthTotal = expenses
    .filter((exp) => new Date(exp.date).getMonth() === currentMonth)
    .reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = buget - currentMonthTotal;
  const percent = (currentMonthTotal / buget) * 100;
  // Hàm xử lý thêm chi tiêu mới
  function handleAddExpense(expense) {
    const newExpense = { ...expense, id: Date.now() };
    setExpenses((prev) => [...prev, newExpense]);
  }
  // Hàm xử lý xóa chi tiêu
  function handleDeleteExpense(id) {
    if (window.confirm("Bạn có chắc muốn xóa chi tiêu này?")) {
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    }
  }
  // Hàm xử lý thay đổi ô tìm kiếm
  function handleSearchChange(e) {
    setSearch(e.target.value);
  }
  // Hàm xử lý thay đổi sắp xếp
  function handleSortChange(e) {
    setSortBy(e.target.value);
  }
  // Hàm xử lý thay đổi bộ lọc theo danh mục
  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }
  // Hàm xử lý bắt đầu chỉnh sửa chi tiêu
  function handleStartEditExpense(expense) {
    setEditingExpense(expense);
  }
  // Hàm xử lý cập nhật chi tiêu sau khi chỉnh sửa
  function handleUpdateExpense(updatedExpense) {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp)),
    );
    setEditingExpense(null);
  }
  // Hàm xử lý thay đổi bộ lọc theo số tiền
  function handleLimitAmountChange(e) {
    setLimitAmount(e.target.value);
  }
  // Hàm xử lý thay đổi bộ lọc theo ngày
  function handleDateFilterChange(e) {
    setDateFilter(e.target.value);
  }

  function handleMonthChange(month) {
    setSelectedMonth(month);
  }

  return (
    <div className="expense-app">
      <ExpenseSearch
        search={search}
        onSearchChange={handleSearchChange}
        limitAmount={limitAmount}
        onLimitAmountChange={handleLimitAmountChange}
      />
      <ExpenseForm
        onAddExpense={handleAddExpense}
        onUpdateExpense={handleUpdateExpense}
        editingExpense={editingExpense}
        expenses={displayedExpenses}
        buget={buget}
        currentMonthTotal={currentMonthTotal}
      />
      <ExpenseFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        dateFilter={dateFilter}
        onDateFilterChange={handleDateFilterChange}
      />
      <ExpenseList
        expenses={displayedExpenses}
        onDeleteExpense={handleDeleteExpense}
        categoryConfig={categoryConfig}
        onEdit={handleStartEditExpense}
      />
      <ExpenseSort sortBy={sortBy} onSortChange={handleSortChange} />

      <div className="dashboard">
        <ExpenseChart expenses={expenses} />
        <ExpenseSummary
          expenses={expenses}
          sortBy={sortBy}
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
        />
      </div>
    </div>
  );
}
