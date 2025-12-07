import { Table } from 'antd';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import CustomModal from '../../components/shared/CustomModal';
import ReviewForm from '../../components/modals/ReviewForm';
import { useState } from 'react';

// Sample data
const data = [
    {
        key: '1',
        date: '02-02-2024',
        userName: 'Christine Brooks',
        email: 'alma.lawson@example.com',
    },
    {
        key: '2',
        date: '02-02-2024',
        userName: 'Rosie Pearson',
        email: 'tim.jennings@example.com',
    },
    {
        key: '3',
        date: '02-02-2024',
        userName: 'Darrell Caldwell',
        email: 'debra.holt@example.com',
    },
    {
        key: '4',
        date: '02-02-2024',
        userName: 'Gilbert Johnston',
        email: 'kenzi.lawson@example.com',
    },
    {
        key: '5',
        date: '02-02-2024',
        userName: 'Alan Cain',
        email: 'willie.jennings@example.com',
    },
    {
        key: '6',
        date: '02-02-2024',
        userName: 'Alfred Murray',
        email: 'georgia.young@example.com',
    },
    {
        key: '7',
        date: '02-02-2024',
        userName: 'Maggie Sullivan',
        email: 'michelle.rivera@example.com',
    },
    {
        key: '8',
        date: '02-02-2024',
        userName: 'Rosie Todd',
        email: 'bill.sanders@example.com',
    },
    {
        key: '9',
        date: '02-02-2024',
        userName: 'Dollie Hines',
        email: 'deanna.curtis@example.com',
    },
];

// Column definitions

const Review = () => {
    const [viewReview, setViewReview] = useState(false);
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: "User's Name",
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Actions',
            key: 'action',
            render: () => (
                <div className="flex items-center gap-3">
                    <button onClick={() => setViewReview(true)} className="text-primary">
                        <AiOutlineEye size={24} />
                    </button>
                    <button className="text-red-500">
                        <AiOutlineDelete size={24} />
                    </button>
                </div>
            ),
        },
    ];
    return (
        <div className="">
            <div className="my-3">
                <h1 className="text-2xl text-primary font-semibold">Manage Reviews</h1>
            </div>
            <Table columns={columns} dataSource={data} rowClassName="hover:bg-gray-100" />
            <CustomModal
                body={<ReviewForm />}
                open={viewReview}
                setOpen={setViewReview}
                key={'review'}
                title="Review"
                width={532}
            />
        </div>
    );
};

export default Review;
