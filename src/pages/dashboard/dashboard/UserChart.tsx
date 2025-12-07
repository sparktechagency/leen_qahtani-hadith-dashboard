import { Select } from 'antd';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Legend, Bar } from 'recharts';
const { Option } = Select;
const UserChart = () => {
    interface UserData {
        month: string;
        totalUsers: number;
        newUsers: number;
    }

    const data: UserData[] = [
        { month: 'February', totalUsers: 120, newUsers: 30 },
        { month: 'March', totalUsers: 200, newUsers: 45 },
        { month: 'April', totalUsers: 150, newUsers: 40 },
        { month: 'May', totalUsers: 220, newUsers: 50 },
        { month: 'June', totalUsers: 180, newUsers: 35 },
        { month: 'July', totalUsers: 300, newUsers: 70 },
        { month: 'August', totalUsers: 250, newUsers: 60 },
        { month: 'September', totalUsers: 270, newUsers: 80 },
        { month: 'October', totalUsers: 320, newUsers: 90 },
        { month: 'November', totalUsers: 280, newUsers: 75 },
        { month: 'December', totalUsers: 350, newUsers: 100 },
    ];

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
            }}
        >
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-xl font-medium">user activities</h1>
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
            <ResponsiveContainer width="100%" height={600}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalUsers" fill="#82968D" />
                    <Bar dataKey="newUsers" fill="#ffc09cff" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserChart;
