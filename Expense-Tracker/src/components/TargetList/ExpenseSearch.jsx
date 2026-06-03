export default function ExpenseSearch({
  search,
  onSearchChange,
  limitAmount,
  onLimitAmountChange,
}) {
  return (
    <div className="expense-search">
      <input
        className="expense-search-input"
        type="text"
        placeholder="Tìm kiếm chi tiêu..."
        value={search}
        onChange={onSearchChange}
      />
      <select
        className="amount-filter-select"
        value={limitAmount}
        onChange={onLimitAmountChange}
      >
        <option value="">Tất cả số tiền</option>
        <option value="under-100">Dưới 100k</option>
        <option value="100k-500k">100k - 500k</option>
        <option value="500k-1m">500k - 1 triệu</option>
        <option value="over-1m">Trên 1 triệu</option>
      </select>
    </div>
  );
}
