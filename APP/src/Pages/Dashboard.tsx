import './Dashboard.css'; // Import the new CSS file
import RecentActivity from "../components/RecentActivity/RecentActivity";
import TimeUsage from "../components/TimeUsage/TimeUsage";

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Guardian Dashboard</h2>
            <RecentActivity />
            <TimeUsage />
        </div>
    );
}