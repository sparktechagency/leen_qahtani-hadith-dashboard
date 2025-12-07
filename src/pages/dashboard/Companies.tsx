import { Button, Table } from 'antd';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import AddCompaniesModal from '../../components/modals/AddCompaniesModal';

// Sample data
const data = [
    {
        key: '1',
        logo: '/company1.png',
    },
    {
        key: '2',
        logo: '/company2.png',
    },
    {
        key: '3',
        logo: '/company3.png',
    },
    {
        key: '4',
        logo: '/company1.png',
    },
    {
        key: '5',
        logo: '/company2.png',
    },
    {
        key: '6',
        logo: '/company3.png',
    },
    {
        key: '7',
        logo: '/company1.png',
    },
    {
        key: '8',
        logo: '/company3.png',
    },
    {
        key: '9',
        logo: '/company2.png',
    },
];

// Column definitions

const Companies = () => {
    const [isOpen, setIsOpen] = useState(false);

    const columns = [
        {
            title: 'S/No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Company Logo',
            dataIndex: 'logo',
            key: 'logo',
            render: (logo: string) => <img src={logo} alt="logo" style={{ width: 50, height: 43, objectFit: 'contain' }} />,
        },
        {
            title: 'Actions',
            key: 'action',
            render: () => (
                <div className="flex items-center gap-3">

                    <button className="text-red-500">
                        <AiOutlineDelete size={24} />
                    </button>
                </div>
            ),
        },
    ];
    return (
        <div className="">
            <div className="my-3 flex items-center justify-between mb-5">
                <h1 className="text-2xl text-primary font-semibold">Companies</h1>
                <Button
                    onClick={() => setIsOpen(true)}
                    style={{
                        height: 40,
                    }}
                    type="primary"
                >
                    Create Companies
                </Button>
            </div>
            <Table columns={columns} dataSource={data} rowClassName="hover:bg-gray-100" pagination={{ pageSize: 8 }} />
            <AddCompaniesModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default Companies;