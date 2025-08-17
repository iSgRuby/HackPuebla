import './TabsMenu.css';
import { Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { Shield, Flag } from 'lucide-react'; // Assuming you'll use icons

interface TabsMenuProps {
    labels: string[];
    views: React.ReactNode[];
}

// Example icons to match the labels
const icons = [<Shield />, <Flag />]

export default function TabsMenu({ labels, views }: TabsMenuProps) {
    const [value, setValue] = useState(0);

    const handleChange = (e: unknown, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box className="tabs-menu-container">
            <Tabs
                value={value}
                onChange={handleChange}
                className="tabs-menu"
                // The indicator is hidden and styling is handled by the active tab's background
                TabIndicatorProps={{ style: { display: 'none' } }}
            >
                {labels.map((label, index) => (
                    <Tab
                        key={index}
                        label={label}
                        value={index}
                        className="tab-item"
                        icon={icons[index]}
                        iconPosition="start"
                    />
                ))}
            </Tabs>
            <Box className="tab-content">
                {views[value]}
            </Box>
        </Box>
    );
}