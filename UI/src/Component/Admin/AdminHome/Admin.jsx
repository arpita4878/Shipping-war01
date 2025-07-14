import './Admin.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { __productapiurl, __userapiurl } from '../../../API_URL';

export default function Admin() {
  const navigate = useNavigate();
  const [nav, setNav] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeBids: 0,
    closedBids: 0,
    totalUsers: 0,
  });
  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const prodRes = await axios.get(__productapiurl + 'fetch');
        const prods = prodRes.data;
        const active = prods.filter(p => p.bid_status === 1).length;
        const closed = prods.length - active;
        const userRes = await axios.get(__userapiurl + 'fetch');
        setStats({
          totalProducts: prods.length,
          activeBids: active,
          closedBids: closed,
          totalUsers: userRes.data.length,
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
   
      <div className="admin-dashboard-container">
        <header className="dashboard-header">
          <h1>Welcome, Admin</h1>
          <p>Here’s a snapshot of key metrics and tools.</p>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <h2>{stats.totalProducts}</h2>
            <p>Total Products</p>
          </div>
          <div className="stat-card">
            <h2>{stats.activeBids}</h2>
            <p>Active Bids</p>
          </div>
          <div className="stat-card">
            <h2>{stats.closedBids}</h2>
            <p>Closed Bids</p>
          </div>
          <div className="stat-card">
            <h2>{stats.totalUsers}</h2>
            <p>Total Users</p>
          </div>
        </div>

        <section className="manage-section">
          <h2>Quick Actions</h2>
          <div className="manage-cards">
            <Link to="/manageuser" className="manage-card">
              <div className="card-icon">👤</div>
              <div>
                <h3>Manage Users</h3>
                <p>View, edit or remove users</p>
              </div>
            </Link>
            <Link to="/manageproduct" className="manage-card">
              <div className="card-icon">📦</div>
              <div>
                <h3>Manage Products</h3>
                <p>Add, update or delete products</p>
              </div>
            </Link>
            <Link to="/addcategory" className="manage-card">
              <div className="card-icon">🧩</div>
              <div>
                <h3>Categories</h3>
                <p>Add or update categories</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
