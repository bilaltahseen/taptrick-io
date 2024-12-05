'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart({ data }) {

    // Ensure data is an array and contains at least one object
    if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
        return <div>No data available</div>;
    }

    console.log(data);

    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#09f" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}


