// function AdminDashboard() {
//   return (
//     <div style={{ display: 'flex',color:'black',minHeight:'100vh' ,width:'100vw'
//     }}>
      
//       {/* Sidebar */}
//       <div style={{ width: '200px', padding: '10px',minHeight:'100vh' ,backgroundColor:'rgb(196 161 161)',borderRight: '8px solid rgb(56 48 48 / 33%)' }}>
//         <h3>Admin Panel</h3>
//         <p>Dashboard</p>
//         <p>Seller Approvals</p>
//       </div>

//       {/* Main Content */}
//       <div style={{ padding: '20px',backgroundColor:'white',flex:'1',alignContent: 'start',
//  }}>
//         <h1>Admin Dashboard</h1>

//         <div style={{ display: 'grid',gridTemplateColumns: 'repeat(3, 300px)',gap: '60px'}}>
//           <div style={{ width: '250px', height:'150px',padding: '10px',backgroundColor:'#c4a1a1c2' ,border: '2px solid rgb(18 12 12 / 19%)',borderRadius:'10px',boxShadow: '0 5px 12px rgba(0,0,0,0.15)'}}>Total Users</div>
//           <div style={{ width: '250px', height:'150px',padding: '10px',backgroundColor:'#c4a1a1c2' ,border: '2px solid rgb(18 12 12 / 19%)',borderRadius:'10px',boxShadow: '0 5px 12px rgba(0,0,0,0.15) '}}>Total Buyers</div>
//           <div style={{ width: '250px', height:'150px',padding: '10px',backgroundColor:'#c4a1a1c2' ,border: '2px solid rgb(18 12 12 / 19%)',borderRadius:'10px',boxShadow: '0 5px 12px rgba(0,0,0,0.15) '}}>Total Sellers</div>
//           <div style={{width: '250px', height:'150px',padding: '10px',backgroundColor:'#c4a1a1c2' ,border: '2px solid rgb(18 12 12 / 19%)',borderRadius:'10px',boxShadow: '0 5px 12px rgba(0,0,0,0.15) '}}>Pending Seller Approvals</div>
//           <div style={{ width: '250px', height:'150px',padding: '10px',backgroundColor:'#c4a1a1c2' ,border: '2px solid rgb(18 12 12 / 19%)',borderRadius:'10px',boxShadow: '0 5px 12px rgba(0,0,0,0.15)' }}>Total Orders</div>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default AdminDashboard;




import { Link } from 'react-router-dom';

import './AdminDashboard.css'; // Import the CSS file

function AdminDashboard() {
  return (
    <div className="admin-container">
      
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Admin Panel</h3>
        <p>
            <Link to="/admin">Dashboard</Link>
        </p>

        <p>
        <Link to="/admin/approvals">Seller Approvals</Link>
        </p>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Admin Dashboard</h1>

        <div className="stats-grid">
          <div className="stats-card">Total Users</div>
          <div className="stats-card">Total Buyers</div>
          <div className="stats-card">Total Sellers</div>
          <div className="stats-card">Pending Seller Approvals</div>
          <div className="stats-card">Total Orders</div>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;