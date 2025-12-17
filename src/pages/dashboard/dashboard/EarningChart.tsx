import { Select } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import axiosInstance from '../../../utils/axiosInstance';
import { useEffect, useState } from 'react';
const { Option } = Select;
// const data = [
//     { name: 'Jan', earnings: 8000 },
//     { name: 'Feb', earnings: 12000 },
//     { name: 'Mar', earnings: 10000 },
//     { name: 'Apr', earnings: 22314 },
//     { name: 'May', earnings: 16000 },
//     { name: 'Jun', earnings: 15000 },
//     { name: 'Jul', earnings: 11000 },
//     { name: 'Aug', earnings: 17000 },
//     { name: 'Sep', earnings: 9000 },
//     { name: 'Oct', earnings: 15000 },
//     { name: 'Nov', earnings: 14000 },
//     { name: 'Dec', earnings: 17000 },
// ];


const EarningChart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const MONTH_NAMES = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/api/v1/users/app-id-statistics?year=${year}`
        );

        const formatted = res.data.statistics.map((item: any) => ({
          name: MONTH_NAMES[item.month - 1],
          earnings: item.monthlyCount, 
        }));

        setData(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  return (
    <div className="flex flex-col gap-2">
      <div className="px-2 flex items-center justify-between">
        <h1 className="text-xl font-medium">Monthly Earnings</h1>

        <Select
          value={year}
          onChange={setYear}
          className="w-32 h-[40px]"
        >
          {[2024,2025,2026,2027,2028,2029,2030].map(y => (
            <Option key={y} value={y}>{y}</Option>
          ))}
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 20, right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#6C4A00"
            strokeWidth={2}
            dot={{ r: 4 }}
            isAnimationActive={!loading}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningChart;

