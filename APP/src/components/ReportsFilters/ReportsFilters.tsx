import './ReportsFilters.css';
import { useState } from 'react';
import { Button } from '@mui/material';

// The filters to be displayed
const filters = [
    { label: 'All', value: '*' },
    { label: 'High Risk', value: 'high-risk' },
    { label: 'Warning', value: 'warning' },
]

interface ReportsFiltersPropt {
    onChange : Function
}

export default function ReportsFilters({ onChange } : ReportsFiltersPropt) {
    const [activeFilter, setActiveFilter] = useState('*')

    return (
        <div className="reports-filters">
            {filters.map(filter => (
                <Button
                    key={filter.value}
                    className={`filter-button ${activeFilter === filter.value ? 'active' : ''}`}
                    onClick={() => {
                        setActiveFilter(filter.value)
                        onChange(filter.value)
                    }}
                >
                    {filter.label}
                </Button>
            ))}
        </div>
    );
}