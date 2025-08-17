import './ReportsList.css'; // Import the stylesheet
import { useState } from 'react';
import { Card, CardContent, Button } from "@mui/material";
import { Eye, EyeOff, ChevronDown, ChevronRight } from "lucide-react";
import formatDatetime from '../../utils/formatDatetime';

// Dummy data for the reports

export interface Report {
    id : number
    title : string
    timestamp : Date
    app : string
    content : string
    type : string
    severity : string
    from? : string
    icon? : string
}

interface ReportsListProps {
    reports : Report[]
}

export default function ReportsList({ reports } : ReportsListProps) {
    const [expanded, setExpanded] = useState<Set<number>>(new Set());
    const [revealed, setRevealed] = useState<Set<number>>(new Set());

    const toggleExpansion = (id: number) => {
        setExpanded(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleScreenshot = (id: number) => {
        setRevealed(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <div className="reports-list">
            {reports.map((report) => (
                <Card key={report.id} className="report-card">
                    <CardContent className="report-card-content">
                        {/* Compact Header View */}
                        <div className="report-header" onClick={() => toggleExpansion(report.id)}>
                            <div className="report-header__main">
                                <span className={`report-badge report-badge--${report.type}`}>{report.severity}</span>
                                <span className="report-icon">{report.icon ?? '💬'}</span>
                                <div className="report-details">
                                    <p className="report-title">{report.title} <span className="report-from">- {report.from}</span></p>
                                    {/* <p className="report-content-preview">{report.content}</p> */}
                                </div>
                            </div>
                            <div className="report-header__meta">
                                <span className="report-timestamp">{formatDatetime(report.timestamp)}</span>
                                {expanded.has(report.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                            </div>
                        </div>

                        {/* Expanded Details View */}
                        {expanded.has(report.id) && (
                            <div className="report-expanded-content">
                                <div
                                    className="screenshot-thumbnail"
                                    onClick={(e) => { e.stopPropagation(); toggleScreenshot(report.id); }}
                                >
                                    {revealed.has(report.id) ? <EyeOff /> : <Eye />}
                                    <span>{revealed.has(report.id) ? 'Click to Hide' : 'Click to Reveal'}</span>
                                </div>
                                <div className="expanded-details">
                                    <div className="triggered-content">
                                        <p>Triggered Content:</p>
                                        <span>{report.content}</span>
                                    </div>
                                    <div className="app-info">
                                        <span className="report-icon">{report.icon ?? '💬'}</span>
                                        <span>{report.app}</span>
                                    </div>
                                    <div className="action-buttons">
                                        <Button className="action-button">Mark as Safe</Button>
                                        <Button className="action-button">View Context</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}