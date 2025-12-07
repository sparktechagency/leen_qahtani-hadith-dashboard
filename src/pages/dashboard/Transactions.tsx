import { Table, Input } from 'antd';

import { SearchOutlined } from '@ant-design/icons';


const data = [
  {
    key: '1',
    username: 'john_doe',
    email: 'john@example.com',
    transactionId: 'TXN123456',
    categoryName: 'Spa & Wellness',
    className: 'Luxury Spa Treatment',
    serial: 1,
  },
  {
    key: '2',
    username: 'jane_smith',
    email: 'jane@example.com',
    transactionId: 'TXN654321',
    categoryName: 'City Transfer',
    className: 'Urban Transfer',
    serial: 2,
  },
  {
    key: '3',
    username: 'alice_lee',
    email: 'alice@example.com',
    transactionId: 'TXN789012',
    categoryName: 'Event Coverage',
    className: 'Premium Coverage',
    serial: 3,
  },
  {
    key: '4',
    username: 'bob_marley',
    email: 'bob@example.com',
    transactionId: 'TXN345678',
    categoryName: 'Photo Shoot',
    className: 'Outdoor Deluxe',
    serial: 4,
  },
  {
    key: '5',
    username: 'emma_watson',
    email: 'emma@example.com',
    transactionId: 'TXN901234',
    categoryName: 'Fitness Training',
    className: 'Yoga Flex Session',
    serial: 5,
  },
  {
    key: '6',
    username: 'tom_hardy',
    email: 'tom@example.com',
    transactionId: 'TXN567890',
    categoryName: 'Chauffeur category',
    className: 'Executive Transfer',
    serial: 6,
  },
  {
    key: '7',
    username: 'lisa_kudrow',
    email: 'lisa@example.com',
    transactionId: 'TXN112233',
    categoryName: 'Hair & Makeup',
    className: 'Bridal Glow Package',
    serial: 7,
  },
  {
    key: '8',
    username: 'mark_twain',
    email: 'mark@example.com',
    transactionId: 'TXN445566',
    categoryName: 'Photography',
    className: 'Studio Portraits',
    serial: 8,
  },
  {
    key: '9',
    username: 'nina_dobrev',
    email: 'nina@example.com',
    transactionId: 'TXN778899',
    categoryName: 'Massage Therapy',
    className: 'Deep Tissue Treatment',
    serial: 9,
  },
  {
    key: '10',
    username: 'david_guetta',
    email: 'david@example.com',
    transactionId: 'TXN000111',
    categoryName: 'DJ Booking',
    className: 'Premium Night Set',
    serial: 10,
  },
];

const Transactions = () => {
 
  const columns = [
    {
      title: 'Serial',
      dataIndex: 'serial',
      key: 'serial',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },
    {
      title: 'category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Class Name',
      dataIndex: 'className',
      key: 'className',
    },
  ];
    return (
        <div className="">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl text-primary font-semibold">Transactions History</h1>
                </div>
                <div className="flex items-center gap-5 justify-end mb-5">
                    <Input
                        style={{
                            width: 400,
                            height: 42,
                        }}
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                    />
               
                </div>
            </div>
            <Table columns={columns} dataSource={data} rowClassName="hover:bg-gray-100" />
           
        </div>
    );
};

export default Transactions;
