export default function ExpenseFilter({
  selectedCategory,
  onCategoryChange,
  dateFilter,
  onDateFilterChange,
}) {
  return (
    <div className="expense-filter">
      <select
        name="category"
        id="category"
        value={selectedCategory}
        onChange={onCategoryChange}
      >
        <option value="Tất cả">Tất cả</option>
        <option value="Ăn uống">Ăn uống</option>
        <option value="Di chuyển">Di chuyển</option>
        <option value="Giải trí">Giải trí</option>
        <option value="Giáo dục">Giáo dục</option>
        <option value="Hóa đơn">Hóa đơn</option>
        <option value="Mua sắm">Mua sắm</option>
        <option value="Sức khỏe">Sức khỏe</option>
        <option value="Khác">Khác</option>
      </select>
      <select
        name="date"
        id="date"
        value={dateFilter}
        onChange={onDateFilterChange}
      >
        <option value="all">Tất cả thời gian</option>
        <option value="7days">7 ngày gần nhất</option>
        <option value="30days">30 ngày gần nhất</option>
        <option value="thisYear">Năm nay</option>
      </select>
    </div>
  );
}
