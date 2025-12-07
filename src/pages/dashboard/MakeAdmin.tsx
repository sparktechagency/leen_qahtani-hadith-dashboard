import { BsTrash } from 'react-icons/bs';
import { Button, ConfigProvider, Flex, Form, Input, Popconfirm, Table } from 'antd';
import CustomModal from '../../components/shared/CustomModal';
import { useState } from 'react'; 

const dummyData = [
  {
    key: "1",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "2",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "3",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "4",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "5",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "6",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "7",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "8",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "9",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "11",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "12",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "13",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "14",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "15",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "16",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "17",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
  {
    key: "18",

    email: "asad@gmail.com",
    admin_name: "Asad",
    admin_type: "Super admin",
  },
];

const MakeAdmin = () => {
    const [makeAdminModal, setMakeAdminModal] = useState(false);
    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            width: 150,
        },
        {
            title: 'Admin Name',
            dataIndex: 'admin_name',
            key: 'admin_name',
        },

        {
            title: 'Admin Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Admin Type',
            dataIndex: 'admin_type',
            key: 'admin_type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            textAlign: 'center',
            render: () => (
                <Popconfirm title="Delete User" description="Are you sure to delete this task?">
                    <button>
                        <BsTrash className="text-red-600" size={20} />
                    </button>
                </Popconfirm>
            ),
        },
    ];

    const addAdminForm = (
        <Form
            style={{
                color: '#767676',
            }}
            layout="vertical"
        >
            <Form.Item label="Name" name="name">
                <Input
                    style={{
                        height: '40px',
                    }}
                    placeholder="John Doe"
                />
            </Form.Item>
            <Form.Item label="Email">
                <Input
                    style={{
                        height: '40px',
                    }}
                    type="email"
                    placeholder="email@gmail.com"
                />
            </Form.Item>
            <Form.Item label="Password">
                <Input
                    style={{
                        height: '40px',
                    }}
                    type="password"
                    placeholder="******"
                />
            </Form.Item>
            <Form.Item>
                <div className="flex justify-center w-full">
                    <Button
                        type="primary"
                        style={{
                            height: 40,
                            width: '100%',
                        }}
                    >
                        Add Admin
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

    return (
        <div>
            <Flex vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <div className="my-4">
                        <h1 className="text-3xl text-primary font-semibold">Admin Management</h1>
                    </div>
                </div>

                <div
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Button
                        onClick={() => setMakeAdminModal(true)}
                        type="primary"
                        style={{
                            height: 40,
                        }}
                    >
                        Add Admin
                    </Button>
                </div>
            </Flex>

            <ConfigProvider
            // theme={{
            //     components: {
            //         Table: {
            //             headerBg: '#E9EFFA',
            //             headerBorderRadius: 0,
            //             rowHoverBg: '#F5F5F5',
            //         },
            //     },
            // }}
            >
                <Table columns={columns} dataSource={dummyData} />
            </ConfigProvider>

            <CustomModal
                open={makeAdminModal}
                setOpen={setMakeAdminModal}
                title="Make Admin"
                width={500}
                body={addAdminForm}
            />
        </div>
    );
};

export default MakeAdmin;
