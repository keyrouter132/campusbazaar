import "./SellerDashboard.css";

function SellerDashboard() {
  const stats = [
    { label: "Current Balance", value: "₹3,734" },
    { label: "Total Earnings", value: "₹3,734" },
    { label: "Total Orders", value: 29 },
    { label: "Total Views", value: 128 },
  ];

  const topProducts = [
    { name: "Notebook", value: 80 },
    { name: "Calculator", value: 65 },
    { name: "Pen", value: 40 },
    { name: "Bottle", value: 30 },
  ];

  const viewedProducts = [
    { name: "Notebook", value: 120 },
    { name: "Calculator", value: 90 },
    { name: "Pen", value: 70 },
    { name: "Bottle", value: 40 },
  ];

  return (
    <div className="seller-dashboard">
      <h1 className="dashboard-title">Seller Dashboard</h1>

      {/* Top Stats */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <p className="stat-label">{s.label}</p>
            <h2>{s.value}</h2>
          </div>
        ))}
      </div>

      {/* Sales Analytics (Fake Chart Block) */}
      <div className="analytics-card">
        <h3>Sales Analytics</h3>
        <div className="fake-chart">
          {[40, 70, 20, 90, 60, 30, 80].map((h, i) => (
            <div
              key={i}
              className="chart-bar"
              style={{ height: `${h}%` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Bottom Analytics */}
      <div className="bottom-grid">
        <div className="analytics-card">
          <h3>Top Selling Products</h3>
          {topProducts.map((p, i) => (
            <div key={i} className="bar-row">
              <span>{p.name}</span>
              <div className="bar">
                <div style={{ width: `${p.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="analytics-card">
          <h3>Most Viewed Products</h3>
          {viewedProducts.map((p, i) => (
            <div key={i} className="bar-row">
              <span>{p.name}</span>
              <div className="bar yellow">
                <div style={{ width: `${p.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
