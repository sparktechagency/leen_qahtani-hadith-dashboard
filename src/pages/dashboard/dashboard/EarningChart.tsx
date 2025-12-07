import { Select } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
const { Option } = Select;
const data = [
    { name: 'Jan', earnings: 8000 },
    { name: 'Feb', earnings: 12000 },
    { name: 'Mar', earnings: 10000 },
    { name: 'Apr', earnings: 22314 },
    { name: 'May', earnings: 16000 },
    { name: 'Jun', earnings: 15000 },
    { name: 'Jul', earnings: 11000 },
    { name: 'Aug', earnings: 17000 },
    { name: 'Sep', earnings: 9000 },
    { name: 'Oct', earnings: 15000 },
    { name: 'Nov', earnings: 14000 },
    { name: 'Dec', earnings: 17000 },
];

const EarningChart = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
            }}
        >
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-xl font-medium">Monthly Earning</h1>
                <Select defaultValue="2024" className="w-32 h-[40px]">
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                    <Option value="2026">2026</Option>
                    <Option value="2027">2027</Option>
                    <Option value="2028">2028</Option>
                    <Option value="2029">2029</Option>
                    <Option value="2030">2030</Option>
                </Select>
            </div>
            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[5000, 25000]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="earnings"
                        stroke="#6C4A00"
                        strokeWidth={2}
                        dot={{ fill: '#6C4A00', stroke: '#6C4A00', strokeWidth: 2, r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EarningChart;
