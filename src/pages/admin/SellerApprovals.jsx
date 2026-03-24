// function SellerApprovals() {
//   return (
//     <div style={{ display: 'flex',minHeight: '100vh',width: '100vw',color: 'black',
//       }}
//     >
//       {/* Sidebar */}
//       <div style={{ width: '220px',padding: '10px',minHeight: '100vh',backgroundColor: 'rgb(196 161 161)',borderRight: '8px solid rgb(56 48 48 / 33%)',
//         }}
//       >
//         <h3>Admin Panel</h3>
//         <p>Dashboard</p>
//         <p>Seller Approvals</p>
//       </div>

//       {/* Main Content */}
//       <div style={{padding: '20px',backgroundColor: 'white',flex: 1,
//         }}
//       >
//         <h1>Pending Seller Approvals</h1>

//         {/* Dummy seller card */}
//         <div
//           style={{ padding: '15px', marginBottom: '15px', border: '1px solid #ccc',borderRadius: '8px',boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//           }}
//         >
//           <p><b>UID:</b> 2305034</p>
//           <p><b>Name:</b> Sample User</p>
//           <p><b>Class/Position:</b>Student</p>
//           <p><b>Category:</b> Bakery</p>
//           <p><b>Shop Name:</b>Bakehouse</p>
//           <p><b>Shop Description:</b>Serves fresh cookies, cupcakes,bombolonies and chocoloate delicacies</p>
//           <button>Approve</button>
//         </div> 
//          {/* Another dummy seller */}
//         <div
//           style={{ padding: '15px', marginBottom: '15px', border: '1px solid #ccc',borderRadius: '8px',boxShadow: '0 2px 6px rgba(0,0,0,0.1)',transition: 'transform 0.2s ease, box-shadow 0.2s ease'
//           }}
//         >
//           <p><b>UID:</b> 2305036</p>
//           <p><b>Name:</b> Sample User2</p>
//           <p><b>Class/Position:</b>Faculty</p>
//           <p><b>Category:</b> Study Notes</p>
//           <p><b>Shop Name:</b>EasyMath</p>
//           <p><b>Shop Description:</b>Easy math solutions and notes to crack the End Sems </p>
//           <button>Approve</button>
//         </div> 
//          <div
//           style={{ padding: '15px', marginBottom: '15px', border: '1px solid #ccc',borderRadius: '8px',boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//           }}
//         >
//           <p><b>UID:</b> 2305036</p>
//           <p><b>Name:</b> Sample User2</p>
//           <p><b>Class/Position:</b>Faculty</p>
//           <p><b>Category:</b> Study Notes</p>
//           <p><b>Shop Name:</b>EasyMath</p>
//           <p><b>Shop Description:</b>Easy math solutions and notes to crack the End Sems </p>
//           <button>Approve</button>
//         </div> 


       
        
//       </div>
//     </div>
//   );
// }

// export default SellerApprovals;



import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

import "./SellerApprovals.css";

function SellerApprovals() {
  const [sellers, setSellers] = useState([]);
  const [message, setMessage] = useState("");

  // 🔹 Fetch pending seller applications
  useEffect(() => {
    const fetchSellerRequests = async () => {
      const { data, error } = await supabase
        .from("seller_requests")
        .select(`
          id,
          uid,
          shop_name,
          shop_description,
          category,
          college_users (
            name,
            class_or_designation
          )
        `)
        .eq("status", "pending");

      if (error) {
        console.error("Fetch error:", error);
      } else {
        setSellers(data);
      }
    };

    fetchSellerRequests();
  }, []);

  // 🔹 Approve Seller
  const handleApprove = async (requestId, uid) => {
    setMessage("");

    const { error: requestError } = await supabase
      .from("seller_requests")
      .update({ status: "approved" })
      .eq("id", requestId);

    const { error: userError } = await supabase
      .from("users")
      .update({ seller_status: "approved" })
      .eq("uid", uid);

    if (requestError || userError) {
      console.error(requestError || userError);
      setMessage("Error approving seller ");
    } else {
      setSellers(prev =>
        prev.filter(seller => seller.id !== requestId)
      );
      setMessage("Seller approved successfully ");
    }
  };

  // 🔹 Reject Seller
  const handleReject = async (requestId, uid) => {
    setMessage("");

    const { error: requestError } = await supabase
      .from("seller_requests")
      .update({ status: "rejected" })
      .eq("id", requestId);

    const { error: userError } = await supabase
      .from("users")
      .update({ seller_status: "rejected" })
      .eq("uid", uid);

    if (requestError || userError) {
      console.error(requestError || userError);
      setMessage("Error rejecting seller ");
    } else {
      setSellers(prev =>
        prev.filter(seller => seller.id !== requestId)
      );
      setMessage("Seller rejected successfully ");
    }
  };

  return (
    <div className="admin-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h3>Admin Panel</h3>
        <p><Link to="/admin">Dashboard</Link></p>
        <p><Link to="/admin/approvals">Seller Approvals</Link></p>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Pending Seller Approvals</h1>

        {/* Feedback Message */}
        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {/* Empty State */}
        {sellers.length === 0 && (
          <div className="empty-state-card">
            {/* <h3>All caught up!</h3> */}
            <p>No pending seller approvals.</p>
          </div>
        )}

        {/* Seller Cards */}
        {sellers.map((seller) => (
          <div className="seller-card" key={seller.id}>

            <p><b>UID:</b> {seller.uid}</p>

            <p>
              <b>Name:</b>{" "}
              {seller.college_users?.name || "N/A"}
            </p>

            <p>
              <b>Class / Position:</b>{" "}
              {seller.college_users?.class_or_designation || "N/A"}
            </p>

            <p><b>Shop Name:</b> {seller.shop_name}</p>
            <p><b>Shop Description:</b> {seller.shop_description}</p>
            <p><b>Category:</b> {seller.category}</p>

            <div className="action-buttons">
              <button
                className="approve-btn"
                onClick={() => handleApprove(seller.id, seller.uid)}
              >
                Approve
              </button>

              <button
                className="reject-btn"
                onClick={() => handleReject(seller.id, seller.uid)}
              >
                Reject
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default SellerApprovals;
