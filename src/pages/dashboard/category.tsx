import { Button, Flex, Table } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import AddCategoryModal from "../../components/modals/categoryModel";
import axiosInstance from "../../utils/axiosInstance";
import { getImageUrl } from "../../utils/imageUrl";

const categorys = () => {
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);

    const fetchCategories = async () => {
        const res = await axiosInstance.get("/category");
        setCategories(res.data.data || []);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },

        {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (img: string) => (
        <img
            src={getImageUrl(img)}
            alt="category"
            className="h-14 rounded-md object-cover"
        />
    ),
},
        {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => (
                <div className="flex items-center gap-3">
                    <button onClick={() => { setIsOpen(true); setEditData(record); }}>
                        <AiOutlineEdit className="text-xl text-primary" />
                    </button>
                    <button>
                        <IoTrashOutline className="text-xl text-red-500" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Flex justify="space-between" align="center" className="my-2">
                <h1 className="text-2xl text-primary font-semibold">Manage Categories</h1>

                <Button type="primary" style={{ height: 40 }} onClick={() => { setIsOpen(true); setEditData(null); }}>
                    Add Category
                </Button>
            </Flex>

            <Table dataSource={categories} columns={columns} pagination={{ pageSize: 8 }} />

            <AddCategoryModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                editData={editData}
                onSuccess={fetchCategories}
            />
        </div>
    );
};

export default categorys;

