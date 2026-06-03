import React from "react";

export default function ExpenseItem({
  expense,
  onDelete,
  categoryConfig,
  onEdit,
}) {
  const category = categoryConfig[expense.category] || categoryConfig["Khác"];
  console.log(expense.date);
  console.log(typeof expense.date);

  return (
    <li className="expense-item">
      <div className="expense-left">
        <div className="expense-name">{expense.name}</div>

        <div className="expense-meta">
          <div className="expense-category" style={{ color: category.color }}>
            {category.icon} {expense.category}
          </div>

          <div className="expense-date">
            {expense.date
              ? new Date(expense.date).toLocaleDateString("vi-VN")
              : "Chưa có ngày"}
          </div>
        </div>
      </div>

      <div className="expense-right">
        <div className="expense-amount">
          {Number(expense.amount).toLocaleString()}₫
        </div>

        <button className="secondary-button" onClick={onEdit}>
          Sửa
        </button>

        <button className="secondary-button" onClick={onDelete}>
          Xóa
        </button>
      </div>
    </li>
  );
}
