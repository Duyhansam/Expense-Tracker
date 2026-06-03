export default function ExpenseChart({ expenses = [] }) {
  const monthData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const total = expenses
      .filter((exp) => {
        const expMonth = new Date(exp.date).getMonth() + 1;
        return expMonth === month;
      })
      .reduce((sum, exp) => sum + exp.amount, 0);

    const prevTotal =
      i === 0
        ? 0
        : expenses
            .filter((exp) => {
              const expMonth = new Date(exp.date).getMonth() + 1;
              return expMonth === month - 1;
            })
            .reduce((sum, exp) => sum + exp.amount, 0);

    let change = null;
    if (prevTotal > 0 && total > 0) {
      change = (((total - prevTotal) / prevTotal) * 100).toFixed(1); // Tăng 100% nếu tháng trước là 0 và tháng này có chi tiêu
    }
    return { month, total, prevTotal, change };
  });

  return (
    <>
      <div className="expense-chart">
        <h2>Chi tiêu theo tháng</h2>

        <div className="month-grid">
          {monthData.map((item) => (
            <div key={item.month} className="month-card">
              <h4>Tháng {item.month}</h4>
              <p>{item.total.toLocaleString()} ₫</p>
              {item.change !== null && (
                <p
                  className={
                    Number(item.change) >= 0 ? "month-up" : "month-down"
                  }
                >
                  {Number(item.change) >= 0 ? "📈" : "📉"}{" "}
                  {Number(item.change) > 0
                    ? `+${item.change}%`
                    : `${item.change}%`}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
