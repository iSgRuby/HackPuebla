import './Alerts.css';
import { useState, useEffect } from 'react';
import ReportsList from "../components/ReportsList/ReportsList";
import ReportsFilters from '../components/ReportsFilters/ReportsFilters';
import HighlightedReports from "../components/HighlightedReports/HighlightedReports";

import { Report } from '../components/ReportsList/ReportsList';
import getAllAlerts from '../api/alerts'

interface AlertResponse {
    description : string
    createdAt : Date
    risk : string
    app? : string
    title? : string
    icon? : string
}

export default function Alerts() {
    const [activeFilter, setActiveFilter] = useState("all")
    const [reports, setReports] = useState<Report[]>([])

    useEffect(() => {
        (async () => {
            const email = 'fab@gmail.com'
            const reports = await getAllAlerts(email) as AlertResponse[]
            setReports(reports.map((rep, index) => {
                return {
                    id : index,
                    severity : rep.risk,
                    title : rep.title ?? '',
                    content : rep.description,
                    app : rep.app ?? 'unknown',
                    timestamp : rep.createdAt,
                    from : 'unknown origin',
                    type : 'risk',
                    icon : rep.icon
                }
            }))
        })()
    }, [])

    return (
        <div className="alerts-page">
            <h1 className="page-title">Flagged Activity</h1>
            <HighlightedReports />
            <ReportsFilters onChange={setActiveFilter} />
            <ReportsList reports={reports} />
        </div>
    );
}