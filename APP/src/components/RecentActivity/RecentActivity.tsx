import './RecentActivity.css'

export default function RecentActivity() {

    const regs = [
        { icon: "🎮", description: "Gaming session started", app: "Steam", time: "2:30 PM" },
        { icon: "💬", description: "Message sent", app: "Discord", time: "2:15 PM" },
        { icon: "🌐", description: "Website visited", app: "Chrome", time: "1:45 PM" },
        {
            icon: "📚",
            description: "Educational content accessed",
            app: "Khan Academy",
            time: "1:20 PM",
        },
        { icon: "📱", description: "Social media activity", app: "Instagram", time: "12:55 PM" },
    ]

    return <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-card">
            <div className="activity-list">
                {regs.map((activity, index) => (
                    <div className="activity-item" key={index}>
                        <div className="activity-item__main">
                            <span className="activity-item__icon">{activity.icon}</span>
                            <div className="activity-item__details">
                                <p className="activity-item__description">{activity.description}</p>
                                <p className="activity-item__app">{activity.app}</p>
                            </div>
                        </div>
                        <span className="activity-item__time">{activity.time}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
}