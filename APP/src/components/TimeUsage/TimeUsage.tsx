import './TimeUsage.css';
import { Card, CardHeader, CardContent } from "@mui/material";

// Data for the usage stats
const usageData = [
    { category: "Gaming", time: "3h 45m", percentage: 60, type: "gaming" },
    { category: "Social Media", time: "1h 30m", percentage: 25, type: "social" },
    { category: "Education", time: "45m", percentage: 15, type: "education" },
];

export default function TimeUsage() {
    return (
        <div className="time-usage-container">
            <h3>Time Usage</h3>
            <Card className="time-usage-card">
                <CardHeader
                    title="Today's Activity"
                    className="time-usage-card__header"
                />
                <CardContent className="time-usage-card__content">
                    <div className="usage-list">
                        {usageData.map((usage) => (
                            <div key={usage.category} className="usage-item">
                                <div className="usage-item__info">
                                    <span>{usage.category}</span>
                                    <span>{usage.time}</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className={`progress-bar__fill progress-bar__fill--${usage.type}`}
                                        style={{ width: `${usage.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}