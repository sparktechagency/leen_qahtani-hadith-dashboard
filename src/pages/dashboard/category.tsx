// import { Button, Flex, Table } from "antd";
// import { useEffect, useState } from "react";
// import { AiOutlineEdit } from "react-icons/ai";
// import { IoTrashOutline } from "react-icons/io5";
// import AddCategoryModal from "../../components/modals/categoryModel";
// import axiosInstance from "../../utils/axiosInstance";
// import { getImageUrl } from "../../utils/imageUrl";

// const categorys = () => {
//     const [categories, setCategories] = useState([]);
//     const [isOpen, setIsOpen] = useState(false);
//     const [editData, setEditData] = useState<any>(null);

//     const fetchCategories = async () => {
//         const res = await axiosInstance.get("/category");
//         setCategories(res.data.data || []);
//     };

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const columns = [
//         {
//             title: "Name",
//             dataIndex: "name",
//             key: "name",
//         },

//         {
//     title: "Image",
//     dataIndex: "image",
//     key: "image",
//     render: (img: string) => (
//         <img
//             src={getImageUrl(img)}
//             alt="category"
//             className="h-14 rounded-md object-cover"
//         />
//     ),
// },
//         {
//             title: "Action",
//             key: "action",
//             render: (_: any, record: any) => (
//                 <div className="flex items-center gap-3">
//                     <button onClick={() => { setIsOpen(true); setEditData(record); }}>
//                         <AiOutlineEdit className="text-xl text-primary" />
//                     </button>
//                     <button>
//                         <IoTrashOutline className="text-xl text-red-500" />
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div>
//             <Flex justify="space-between" align="center" className="my-2">
//                 <h1 className="text-2xl text-primary font-semibold">Manage Categories</h1>

//                 <Button type="primary" style={{ height: 40 }} onClick={() => { setIsOpen(true); setEditData(null); }}>
//                     Add Category
//                 </Button>
//             </Flex>

//             <Table dataSource={categories} columns={columns} pagination={{ pageSize: 8 }} />

//             <AddCategoryModal
//                 isOpen={isOpen}
//                 setIsOpen={setIsOpen}
//                 editData={editData}
//                 onSuccess={fetchCategories}
//             />
//         </div>
//     );
// };

import { Button, Table, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline, IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import AddCategoryModal from "../../components/modals/categoryModel";
import axiosInstance from "../../utils/axiosInstance";
import { getImageUrl } from "../../utils/imageUrl";

const categorys = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/category");
      setCategories(res.data.data || []);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await axiosInstance.patch(`/category/status/${id}`, { status: !currentStatus });
      message.success("Status updated successfully");
      fetchCategories();
    } catch (error) {
      console.log(error);
      message.error("Failed to update status");
    }
  };

  // Delete category
  const deleteCategory = async (id: string) => {
    try {
      await axiosInstance.delete(`/category/${id}`);
      message.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      console.log(error);
      message.error("Failed to delete category");
    }
  };

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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) => (
        <button onClick={() => toggleStatus(record._id, record.status)}>
          {record.status ? (
            <div className="flex items-center gap-1">
              
              <span>Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <span>Inactive</span>
            </div>
          )}
        </button>
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
        {/* locked icon and unlock icon */}
          <button onClick={() => toggleStatus(record._id, record.status)}>
            {record.status ? (
             <IoLockOpenOutline className="text-green-500 text-xl" />
            ) : (
              <IoLockClosedOutline className="text-red-500 text-xl" />
            )}
          </button>

          
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => deleteCategory(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <IoTrashOutline className="text-xl text-red-500 cursor-pointer" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center my-2">
        <h1 className="text-2xl text-primary font-semibold">Manage Categories</h1>
        <Button
          type="primary"
          style={{ height: 40 }}
          onClick={() => { setIsOpen(true); setEditData(null); }}
        >
          Add Category
        </Button>
      </div>

      <Table
        dataSource={categories}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 8 }}
      />

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

