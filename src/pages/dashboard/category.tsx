import { Button, Table, Popconfirm, message, Input } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline, IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import AddCategoryModal from "../../components/modals/categoryModel";
import axiosInstance from "../../utils/axiosInstance";
import { getImageUrl } from "../../utils/imageUrl";
const { Search } = Input;

const categorys = () => {
  const [categories, setCategories] = useState<any[]>([]);
 const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/category");
      setCategories(res.data.data || []);
      setFilteredCategories(res.data.data || []);
      filteredCategories;
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

// Search filter
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCategories(categories);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = categories.filter((cat) =>
        (cat.name || "").toLowerCase().includes(term) ||
        (cat.status ? "نشط" : "غير نشط").includes(term)
      );
      setFilteredCategories(filtered);
    }
  }, [searchTerm, categories]);

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
      title: "اسم",
      dataIndex: "name",
      key: "name",
      align: "center" as const,
    },
    {
      title: "رمز",
      dataIndex: "image",
      key: "image",
      render: (img: string) => (
        <img
          src={getImageUrl(img)}
          alt="category"
          className="h-14 w-14 rounded-md object-cover"
        />
      ),
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) => (
        <button className="flex items-center gap-1">
          {record.status ? (
            <div className="flex items-center gap-1">
              
              <span className="text-green-600 font-medium">نشط</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <span className="text-red-600 font-medium">غير نشط</span>
            </div>
          )}
        </button>
      ),
    },
    {
      title: "الإجراء",
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-primary font-semibold">الفئات</h1>

        <div className="flex items-center gap-3">
          <Search
            placeholder="ابحث في الفئات..."
            allowClear
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 250 }}
            
          />
        

        <Button
          htmlType="button"
          className="bg-[#82968D]"
          style={{ height: 40 }}
          onClick={() => { setIsOpen(true); setEditData(null); }}
        >
          إضافة فئة جديدة
        </Button >
      </div>
      </div>

      <Table
        dataSource={filteredCategories}
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

