import SummaryCard from "./SummaryCard";
export default function ExpenseSummary({
  expenses = [],
  sortBy,
  selectedMonth = "Tất cả",
  onMonthChange,
}) {
  // Tính tổng chi tiêu
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  // Lọc chi tiêu theo tháng đã chọn
  const monthExpenses = expenses.filter((expense) => {
    if (selectedMonth === "Tất cả") return true;
    if (!expense.date) return false;
    const expenseMonth = new Date(expense.date).getMonth() + 1;
    return expenseMonth === Number(selectedMonth);
  });

  // Nhóm chi tiêu theo danh mục
  const byCategory = monthExpenses.reduce((acc, expense) => {
    const cat = expense.category;

    acc[cat] = (acc[cat] || 0) + expense.amount;
    return acc;
  }, {});
  // Sắp xếp danh mục theo yêu cầu
  const sortedCategories = Object.entries(byCategory).sort((a, b) => {
    switch (sortBy) {
      case "amount-asc":
        return a[1] - b[1];
      case "amount-desc":
        return b[1] - a[1];
      case "category-az":
        return a[0].localeCompare(b[0]);
      case "category-za":
        return b[0].localeCompare(a[0]);
      default:
        return 0;
    }
  });
  // Sắp xếp danh mục theo số tiền giảm dần để tìm ra danh mục chi nhiều nhất và ít nhất
  const categoriesByAmount = Object.entries(byCategory).sort(
    (a, b) => b[1] - a[1],
  );
  // Lấy danh mục chi nhiều nhất và ít nhất
  const [topName, topAmount] = categoriesByAmount[0] || ["N/A", 0];
  const [lowestName, lowestAmount] = categoriesByAmount[
    categoriesByAmount.length - 1
  ] || ["N/A", 0];
  const percent = (amt) => (total ? Math.round((amt / total) * 100) : 0);

  return (
    <div className="expense-summary">
      <h2>Tổng: {total.toLocaleString()}₫</h2>
      <h3>Tổng số danh mục: {Object.keys(byCategory).length} </h3>
      <h4>🔥 Danh mục chi nhiều nhất</h4>
      <p>
        {topName}: {topAmount.toLocaleString()} ₫ - {percent(topAmount)}%
      </p>
      <h4>🧊 Danh mục chi ít nhất</h4>
      <p>
        {lowestName}: {lowestAmount.toLocaleString()} ₫ -{" "}
        {percent(lowestAmount)}%
      </p>
      <div className="summary-controls">
        <label className="summary-label" htmlFor="month-select">
          Chọn tháng:
        </label>
        <select
          id="month-select"
          className="summary-month-select"
          value={selectedMonth}
          onChange={(e) => onMonthChange?.(e.target.value)}
        >
          <option value="Tất cả">Tất cả</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Tháng {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="summary-cards">
        {sortedCategories.map(([cat, amt]) => {
          const percentage = percent(amt);

          return (
            <SummaryCard
              key={cat}
              cat={cat}
              amt={amt}
              percentage={percentage}
            />
          );
        })}
      </div>
    </div>
  );
}
