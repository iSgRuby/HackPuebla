import './Header.css'

import { Shield } from "lucide-react"

export default function Header() {
    return (
        <header className="app-header">
            <div className="header-content">
                <div className="header-logo">
                    <Shield />
                    <h1>Take A Look</h1>
                </div>
                <div className="header-tagline">
                    Protecting your family online
                </div>
            </div>
        </header>
    )
}