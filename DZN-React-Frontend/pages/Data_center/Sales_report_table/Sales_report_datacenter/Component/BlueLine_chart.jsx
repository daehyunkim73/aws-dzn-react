import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

const data = [
    { name: '1', uv: 43 },
    { name: '2', uv: 25 },
    { name: '3', uv: 45 },
    { name: '4', uv: 42 },
    { name: '5', uv: 25 },
    { name: '6', uv: 35 },
    { name: '7' },
];

const BlueLine_chart = () => {
    return (
        <React.Fragment>
            <div className="big_report_chart_box">
                <div className="sales_report_graph_box">
                    <LineChart
                        width={1100}
                        height={300}
                        data={data}
                        margin={{
                            top: 10, right: 30, left: 0, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                        <YAxis />
                        <Tooltip />
                        <Line connectNulls type="category" dataKey="uv" stroke="#00a8fd" fill="#00a8fd" />
                    </LineChart>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BlueLine_chart;