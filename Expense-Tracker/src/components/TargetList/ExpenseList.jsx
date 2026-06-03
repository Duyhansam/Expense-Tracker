import ExpenseItem from "./ExpenseItem";
export default function ExpenseList({
  expenses,
  onDeleteExpense,
  categoryConfig,
  onEdit,
}) {
  if (!expenses || expenses.length === 0) return <p>Chưa có chi tiêu.</p>;
  return (
    <ul className="expense-list">
      {expenses.map((exp) => (
        <ExpenseItem
          key={exp.id}
          expense={exp}
          onDelete={() => onDeleteExpense(exp.id)}
          categoryConfig={categoryConfig}
          onEdit={() => onEdit(exp)}
        />
      ))}
    </ul>
  );
}
