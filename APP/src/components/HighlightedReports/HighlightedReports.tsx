import './HighlightedReports.css';
import { Flag } from "lucide-react";
import { Card, CardContent, Button } from "@mui/material";

// Data for the alerts, making the component reusable
const alerts = [
  {
    type: 'suspicious',
    title: 'Suspicious Language Detected',
    source: 'Discord',
  },
  {
    type: 'inappropriate',
    title: 'Inappropriate Content',
    source: 'Chrome Browser',
  }
];

export default function HighlightedReports() {
  return (
    <div className="urgent-alerts-container">
      <h3>Urgent Alerts</h3>
      <div className="alerts-grid">
        {alerts.map((alert) => (
          <Card key={alert.title} className={`alert-card alert-card--${alert.type}`}>
            <CardContent className="alert-card-content">
              <Flag className="alert-icon" />
              <div className="alert-details">
                <p className="alert-title">{alert.title}</p>
                <p className="alert-source">{alert.source}</p>
                <Button className="alert-button">Review</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}