export default function ExpenseSort({ sortBy, onSortChange }) {
  return (
    <div className="expense-sort">
      <label htmlFor="sort">Sắp xếp:</label>
      <select id="sort" value={sortBy} onChange={onSortChange}>
        <option value="category-az">Tên A-Z</option>
        <option value="category-za">Tên Z-A</option>
        <option value="amount-asc">Số tiền (Thấp đến Cao)</option>
        <option value="amount-desc">Số tiền (Cao đến Thấp)</option>
      </select>
    </div>
  );
}
