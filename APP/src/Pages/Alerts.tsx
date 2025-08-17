import './Alerts.css';
import { useState } from 'react';
import ReportsList from "../components/ReportsList/ReportsList";
import ReportsFilters from '../components/ReportsFilters/ReportsFilters';
import HighlightedReports from "../components/HighlightedReports/HighlightedReports";

export default function Alerts() {
    const [activeFilter, setActiveFilter] = useState("all");

    return (
        <div className="alerts-page">
            <h1 className="page-title">Flagged Activity</h1>
            <HighlightedReports />
            <ReportsFilters onChange={setActiveFilter} />
            <ReportsList />
        </div>
    );
}