// src/components/ChartCard.js
export default function ChartCard({ title }) {
  return (
    <div className="chart-card">
      <h4>{title}</h4>
      <div style={{ padding: "1rem", textAlign: "center", color: "#666" }}>
        [Chart Placeholder]
      </div>
    </div>
  );
}
