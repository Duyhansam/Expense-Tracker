import React, { useEffect, useState } from "react";

export default function ExpenseForm({
  onAddExpense,
  onUpdateExpense,
  editingExpense,
  buget,
  currentMonthTotal,
}) {
  const today = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Ăn uống");
  const [date, setDate] = useState(today);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setName(editingExpense.name);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    } else {
      setName("");
      setAmount("");
      setCategory("Danh mục");
      setDate(today);
    }
  }, [editingExpense]);

  function handleSubmit(e) {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!name.trim()) {
      setError("Vui lòng nhập tên chi tiêu .");
      return;
    }
    if (isNaN(amt) || amt <= 0) {
      setError("Vui lòng nhập số tiền hợp lệ.");
      return;
    }
    if (category === "Danh mục") {
      setError("Vui lòng chọn danh mục.");
      return;
    }
    if (!date) {
      setError("Vui lòng chọn ngày.");
      return;
    }
    setError("");
    const expense = {
      name: name.trim(),
      amount: amt,
      category,
      date,
    };
    if (editingExpense) {
      onUpdateExpense && onUpdateExpense({ ...expense, id: editingExpense.id });
    } else {
      onAddExpense && onAddExpense(expense);
    }
    setName("");
    setAmount("");
    setCategory("Danh mục");
    setDate(today);
  }

  return (
    <>
      <form className="expense-form" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="Tên chi tiêu"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Danh mục</option>
          <option>Ăn uống</option>
          <option>Di chuyển</option>
          <option>Giải trí</option>
          <option>Giáo dục</option>
          <option>Hóa đơn</option>
          <option>Mua sắm</option>
          <option>Sức khỏe</option>
          <option>Khác</option>
        </select>
        <input
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError("");
          }}
          placeholder="Số tiền"
          type="number"
          min="0"
          step="1"
        />
        <input
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setError("");
          }}
          type="date"
        />
        <button type="submit" className="primary-button">
          {editingExpense ? "Cập nhật" : "Thêm"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <div>
        <h2>Ngân sách tháng </h2>
        <h3>
          {" "}
          Ngân sách:
          <strong> {buget.toLocaleString()} ₫</strong>
        </h3>
        <p>
          Đã chi: <strong>{currentMonthTotal.toLocaleString()} ₫</strong>
        </p>
        <p>
          Còn lại:{" "}
          <strong>{(buget - currentMonthTotal).toLocaleString()} ₫</strong>
        </p>
        <p>
          Đã sử dụng:{" "}
          <strong>{((currentMonthTotal / buget) * 100).toFixed(1)}%</strong>
        </p>
      </div>
    </>
  );
}
