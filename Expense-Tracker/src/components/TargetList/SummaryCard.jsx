export default function SummaryCard({ cat, amt, percentage }) {
  return (
    <>
      <div key={cat} className="summary-card">
        <div className="summary-meta">
          <div className="cat-name">{cat}</div>

          <div className="cat-amt">
            {amt.toLocaleString()}₫ - {percentage}%
          </div>
        </div>

        <div className="summary-bar-outer">
          <div
            className="summary-bar-inner"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    </>
  );
}
