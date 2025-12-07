import { Table, Input, Select } from 'antd';
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CustomModal from '../../components/shared/CustomModal';
import { ImInfo } from 'react-icons/im';
import BookingDetailsModal from '../../components/modals/BookingDetailsModal';

const { Option } = Select; 

type BookingHistory = {
  key: number;
  date: string; 
  pickupCity: string;
  dropOffCity: string;
  distance: number; 
  className: string;
  classImage: string; 
  categoryName: string;
  price: number; 
  totalAdults: number;
  totalKids: number;
  status: 'Completed' | 'Canceled' | 'Active' | string; 
};

const bookingsData:BookingHistory[] = [
  {
    key: 1,
    date: "2025-05-18",
    pickupCity: "New York",
    dropOffCity: "Boston",
    distance: 215,
    className: "Luxury Spa Treatment",
    classImage: "/car.svg",
    categoryName: "Spa & Wellness",
    price: 150,
    totalAdults: 2,
    totalKids: 1,
    status: "Completed",
  },
  {
    key: 2,
    date: "2025-05-17",
    pickupCity: "Los Angeles",
    dropOffCity: "San Diego",
    distance: 195,
    className: "Executive Car category",
    classImage: "/car.svg",
    categoryName: "Transportation",
    price: 200,
    totalAdults: 1,
    totalKids: 0,
    status: "Pending",
  },
  {
    key: 3,
    date: "2025-05-16",
    pickupCity: "Chicago",
    dropOffCity: "Milwaukee",
    distance: 150,
    className: "Family Van Ride",
    classImage: "/car.svg",
    categoryName: "Shuttle",
    price: 180,
    totalAdults: 2,
    totalKids: 2,
    status: "Canceled",
  },
  {
    key: 4,
    date: "2025-05-15",
    pickupCity: "Miami",
    dropOffCity: "Orlando",
    distance: 380,
    className: "Wellness Retreat Ride",
    classImage: "/car.svg",
    categoryName: "Wellness Travel",
    price: 250,
    totalAdults: 3,
    totalKids: 1,
    status: "Completed",
  },
  {
    key: 5,
    date: "2025-05-14",
    pickupCity: "Houston",
    dropOffCity: "Austin",
    distance: 265,
    className: "Business Shuttle",
    classImage: "/car.svg",
    categoryName: "Corporate Travel",
    price: 175,
    totalAdults: 1,
    totalKids: 0,
    status: "Pending",
  },
  {
    key: 6,
    date: "2025-05-13",
    pickupCity: "Seattle",
    dropOffCity: "Portland",
    distance: 280,
    className: "Nature Explorer",
    classImage: "/car.svg",
    categoryName: "Adventure",
    price: 220,
    totalAdults: 2,
    totalKids: 2,
    status: "Canceled",
  },
  {
    key: 7,
    date: "2025-05-12",
    pickupCity: "Dallas",
    dropOffCity: "Fort Worth",
    distance: 55,
    className: "Quick Ride",
    classImage: "/car.svg",
    categoryName: "Local Commute",
    price: 60,
    totalAdults: 1,
    totalKids: 1,
    status: "Completed",
  },
  {
    key: 8,
    date: "2025-05-11",
    pickupCity: "Denver",
    dropOffCity: "Colorado Springs",
    distance: 115,
    className: "Mountain Journey",
    classImage: "/car.svg",
    categoryName: "Tourism",
    price: 190,
    totalAdults: 2,
    totalKids: 1,
    status: "Pending",
  },
  {
    key: 9,
    date: "2025-05-10",
    pickupCity: "Phoenix",
    dropOffCity: "Tucson",
    distance: 180,
    className: "Desert Trip",
    classImage: "/car.svg",
    categoryName: "Tour & Travel",
    price: 160,
    totalAdults: 2,
    totalKids: 0,
    status: "Completed",
  },
  {
    key: 10,
    date: "2025-05-09",
    pickupCity: "San Francisco",
    dropOffCity: "Sacramento",
    distance: 145,
    className: "Urban Transfer",
    classImage: "/car.svg",
    categoryName: "City Transfer",
    price: 140,
    totalAdults: 1,
    totalKids: 1,
    status: "Canceled",
  }
];

const BookingHistory = () => {
    const [showBookingDetails, setShowBookingDetails] = useState(false); 
    const [showDetails , setShowDetails] = useState<BookingHistory|null>(null) 

const statusOptions = ["Completed", "Pending", "Canceled"];
 
const columns: ColumnsType<any> = [
  {
    title: "S/N",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Pickup City",
    dataIndex: "pickupCity",
    key: "pickupCity",
  },
  {
    title: "Drop Off City",
    dataIndex: "dropOffCity",
    key: "dropOffCity",
  },
  {
    title: "Distance (km)",
    dataIndex: "distance",
    key: "distance",
  },
  
  {
    title: "category Name",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Price ($)",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      let color = "default";
      if (status === "Completed") color = "green";
      else if (status === "Pending") color = "orange";
      else if (status === "Canceled") color = "red";
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className='flex items-center gap-4'> 
        <p onClick={() =>{ setShowDetails(record); setShowBookingDetails(true)}} className='cursor-pointer'> <ImInfo className='text-primary' size={20} /> </p>
        <Select
          defaultValue={record.status}
          style={{ width: 120 }}
          onChange={(value) => {
            console.log("Updated status for:", record.serial, "->", value);
            // You can also trigger a backend update here
          }}
          options={statusOptions.map(status => ({ label: status, value: status }))}
        />
      </div>
    ),
  },
];

    return (
        <div className="">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl text-primary font-semibold">Booking History</h1>
                </div>
                <div className="flex items-center gap-5 justify-end mb-5">
                    <Input
                        style={{
                            maxWidth: 300,
                            height: 42,
                        }}
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                    />

                    {/* Dropdown Filter */}
                    <Select defaultValue="All" className="w-52 h-[42px]">
                        <Option value="All">All</Option>
                        <Option value="Completed">Completed</Option>
                        <Option value="Pending">Pending</Option>
                        <Option value="Canceled">Canceled</Option>
                    </Select>
                </div>
            </div>
            <Table columns={columns} dataSource={bookingsData} rowClassName="hover:bg-gray-100" pagination={{ pageSize: 9}} />
            <CustomModal
                open={showBookingDetails}
                setOpen={setShowBookingDetails}
                body={<BookingDetailsModal showDetails={showDetails} />}
                key={'influencer-details'}
                width={550}
            />
        </div>
    );
};

export default BookingHistory;
