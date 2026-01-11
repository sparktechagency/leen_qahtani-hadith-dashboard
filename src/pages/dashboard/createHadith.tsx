import React, { useEffect, useState } from "react";
import {
  Table,
  Select,
  Input,
  Button,
  Modal,
  Form,
  message,
  Popconfirm,
  Space,
} from "antd";
import {
  IoEyeOutline,
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoPencil,
  IoTrashOutline,
} from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../utils/axiosInstance";
import { getImageUrl } from "../../utils/imageUrl";
import { AxiosResponse } from "axios";

const { Option } = Select;
const { Search } = Input;

// Define styling object for Arabic text reuse
const arabicTextStyle = {
  direction: "rtl" as const,
  textAlign: "right" as const,
  fontFamily: "'Traditional Arabic', 'Amiri', serif",
  fontSize: "18px",
  lineHeight: "2"
};

type HadithData = {
  _id: string;
  title: string;
  refrence?: string;
  category?: any;
  hadith: string;
  description: string;
  icon?: string;
  status?: boolean;
  daily?: boolean;
};

type Category = { _id: string; name: string };

const HadithManagement: React.FC = () => {
  const [hadithList, setHadithList] = useState<HadithData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredList, setFilteredList] = useState<HadithData[]>([]);
  const [filterCategory, setFilterCategory] = useState<string | undefined>();
  const [filterReference, setFilterReference] = useState<string | undefined>();
  const [searchText, setSearchText] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewData, setViewData] = useState<HadithData | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editData, setEditData] = useState<HadithData | null>(null);
  const [hadith, setHadith] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [, setImageUrl] = useState<string | null>(null);
  const [form] = Form.useForm();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hadithRes, catRes] = await Promise.all([
          axiosInstance.get("/hadith/by-daily?daily=false", { headers: { "Cache-Control": "no-cache" } }),
          axiosInstance.get("/category", { headers: { "Cache-Control": "no-cache" } }),
        ]);

        setHadithList(hadithRes.data.data || []);
        setCategories(catRes.data.data || []);
      } catch (err) {
        message.error("Failed to load data");
      }
    };
    fetchData();
  }, []);

  // Filter logic
  useEffect(() => {
    let list = hadithList;

    if (filterCategory) {
      list = list.filter(
        (item) =>
          (typeof item.category === "object" && item.category?._id === filterCategory) ||
          item.category === filterCategory
      );
    }

    if (filterReference) {
      list = list.filter((item) =>
        item.refrence?.toLowerCase().includes(filterReference.toLowerCase())
      );
    }

    if (searchText) {
      list = list.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredList(list);
  }, [hadithList, filterCategory, filterReference, searchText]);

  const toggleStatus = async (id: string, current: boolean) => {
    try {
      await axiosInstance.patch(`/hadith/status/${id}`, { status: !current });
      setHadithList(prev =>
        prev.map(h => (h._id === id ? { ...h, status: !current } : h))
      );
      message.success("Status updated");
    } catch (err) {
      message.error("Failed to update status");
    }
  };

  const deleteHadith = async (id: string) => {
    try {
      await axiosInstance.delete(`/hadith/${id}`);
      setHadithList(prev => prev.filter(h => h._id !== id));
      message.success("Hadith deleted");
    } catch (err) {
      message.error("Failed to delete");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("hadith", hadith);
      formData.append("description", description);

      if (values.refrence) formData.append("refrence", values.refrence);
      formData.append("daily", String(values.daily || false));
      if (imageFile) formData.append("icon", imageFile);

      let res: AxiosResponse<any, any, {}>;
      if (editData) {
        res = await axiosInstance.patch(`/hadith/${editData._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Hadith updated successfully");
        setHadithList(prev =>
          prev.map(h => (h._id === editData._id ? res.data.data : h))
        );
      } else {
        res = await axiosInstance.post("/hadith", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Hadith created successfully");
        setHadithList(prev => [...prev, res.data.data]);
      }

      setIsModalOpen(false);
      setEditData(null);
      form.resetFields();
      setHadith("");
      setDescription("");
      setImageFile(null);
      setImageUrl(null);

    } catch (err: any) {
      console.error("Hadith save error:", err.response?.data || err);
      message.error(err.response?.data?.message || "Failed to save Hadith");
    }
  };

  const columns = [
    {
      title: "الرقم التسلسلي",
      key: "index",
      width: 80,
      render: (_: any, __: any, index: number) => {
        // Convert index+1 to string, then replace digits with Arabic equivalents
        const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
        return (index + 1)
          .toString()
          .replace(/\d/g, (d) => arabicNumbers[parseInt(d)]);
      },
    },
    { title: "العنوان", dataIndex: "title", key: "title" },
    {
      title: "الفئات",
      key: "category",
      render: (record: HadithData) =>
        typeof record.category === "object" ? record.category?.name : record.category || "-",
    },
    { title: "المرجع", dataIndex: "refrence", key: "refrence" },

    {
      title: "الحديث",
      key: "hadith",
      render: (record: HadithData) => (
        <div
          style={{ 
            maxWidth: 300, 
            whiteSpace: "pre-wrap", 
            overflow: "hidden", 
            textOverflow: "ellipsis",
            direction: "rtl",
            textAlign: "right",
            fontFamily: "'Traditional Arabic', serif",
            fontSize: "16px"
          }}
          className="text-gray-700"
        >
          {record.hadith}
        </div>
      ),  
    },

    {
      title: "الوصف",
      key: "desc",
      render: (record: HadithData) => (
        <div
          dangerouslySetInnerHTML={{ __html: record.description }}
          style={{ maxWidth: 300 }}
          className="text-gray-700"
        />
      ),
    },
    {
      title: "الحالة",
      key: "status",
      width: 130,
      render: (_: any, record: any) => (
        <button className="flex items-center gap-2 hover:opacity-80 transition">
          {record.status ? (
            <span className="text-green-600 font-medium">نشط</span>
          ) : (
            <span className="text-red-600 font-medium">غير نشط</span>
          )}
        </button>
      ),
    },
    {
      title: "الإجراء",
      key: "action",
      width: 150,
      fixed: "right" as const,
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setViewData(record);
              setIsViewModalOpen(true);
            }}
            className="hover:text-blue-600"
          >
            <IoEyeOutline className="text-xl text-primary" />
          </button>

          <button
            onClick={() => {
              setEditData(record);
              setHadith(record.hadith); 
              form.setFieldsValue({
                title: record.title,
                refrence: record.refrence,
                category: typeof record.category === "object" ? record.category?._id : record.category,
                hadith: record.hadith,
                daily: record.daily || false,
              });
              setDescription(record.description || "");
              if (record.icon) {
                setImageUrl(getImageUrl(record.icon));
              }
              setIsModalOpen(true);
            }}
            className="hover:text-blue-600"
          >
            <IoPencil className="text-xl text-primary" />
          </button>

          <button
            onClick={() => toggleStatus(record._id, record.status)}
            className="hover:opacity-70"
          >
            {record.status ? (
              <IoLockOpenOutline className="text-green-500 text-xl" />
            ) : (
              <IoLockClosedOutline className="text-red-500 text-xl" />
            )}
          </button>

          <Popconfirm
            title="Are you sure to delete this Hadith?"
            onConfirm={() => deleteHadith(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <IoTrashOutline className="text-xl text-red-500 cursor-pointer hover:text-red-700" />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div style={{ padding: "24px 40px", background: "#fff", minHeight: "100vh" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: "bold", margin: 0 }}>الحديث</h1>
      </div>

      {/* Filters + Add Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 16 }}>
        <Space>
          <Search
            placeholder="يبحث"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
        </Space>
        <Select
          placeholder="فئات"
          allowClear
          style={{ width: 180 }}
          onChange={(v) => setFilterCategory(v || undefined)}
        >
          {categories.map((cat) => (
            <Option key={cat._id} value={cat._id}>{cat.name}</Option>
          ))}
        </Select>

        <Select
          placeholder="مرجع"
          allowClear
          showSearch
          style={{ width: 200 }}
          onChange={(v) => setFilterReference(v || undefined)}
        >
          {Array.from(new Set(hadithList.map(h => h.refrence).filter(Boolean))).map(ref => (
            <Option key={ref} value={ref}>{ref}</Option>
          ))}
        </Select>

        <Button
          htmlType="button"
          style={{ background: "#2e7d32", border: "none" }}
          type="primary"
          onClick={() => {
            setEditData(null);
            form.resetFields();
            setHadith("");
            setDescription("");
            setImageFile(null);
            setImageUrl(null);
            setIsModalOpen(true);
          }}
        >
          إضافة جديد
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredList}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1300 }}
        bordered={false}
      />

      {/* View Modal */}
      <Modal
        title="View Hadith"
        open={isViewModalOpen}
        footer={null}
        onCancel={() => setIsViewModalOpen(false)}
        width={700}
      >
        {viewData && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{viewData.title}</h3>
            <p><strong>Reference:</strong> {viewData.refrence}</p>
            <p><strong>Category:</strong> {typeof viewData.category === "object" ? viewData.category?.name : viewData.category}</p>
            <p><strong>Daily:</strong> {viewData.daily ? "Yes" : "No"}</p>
            {viewData.icon && (
              <img src={getImageUrl(viewData.icon)} alt="icon" className="w-32 h-32 object-cover rounded" />
            )}
            
            <p className="font-bold mt-4">Hadith Text:</p>
            {/* UPDATED: Container for View Modal Hadith */}
            <div style={{
              background: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #e9ecef",
              ...arabicTextStyle 
            }}>
              {viewData.hadith}
            </div>

            <p className="font-bold mt-4">Description:</p>
            <div dangerouslySetInnerHTML={{ __html: viewData.description }} />
          </div>
        )}
      </Modal>

      {/* Add/Edit Modal */}
      <Modal
        title={editData ? "تعديل الحديث" : "إضافة حديث جديد"}
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          setEditData(null);
          form.resetFields();
          setHadith("");
          setDescription("");
          setImageFile(null);
          setImageUrl(null);
        }}
        width={800}
      >
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleSubmit}
          initialValues={{ daily: false }}
        >
          <Form.Item 
            label="العنوان" 
            name="title" 
            rules={[{ required: true, message: "العنوان مطلوب" }]}
          >
            <Input placeholder="أدخل عنوان الحديث" style={arabicTextStyle} />
          </Form.Item>

          <Form.Item label="مرجع" name="refrence">
            <Input placeholder="أدخل المرجع" style={arabicTextStyle} />
          </Form.Item>

          <Form.Item 
            label="الفئة" 
            name="category"
            rules={[{ required: true, message: "الفئة مطلوبة" }]}
          >
            <Select placeholder="اختر الفئة" style={arabicTextStyle}>
              {categories.map(cat => (
                <Option key={cat._id} value={cat._id}>{cat.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="حديث (بالعربية)"
            name="hadith"
            rules={[{ required: true, message: "نص الحديث مطلوب" }]}
          >
            {/* UPDATED: Input Field for Arabic RTL */}
            <Input.TextArea 
              rows={6} 
              placeholder="أدخل نص الحديث هنا" 
              value={hadith}
              onChange={(e) => setHadith(e.target.value)}
              style={arabicTextStyle}
            />
          </Form.Item>

          <Form.Item label="الوصف">
            <ReactQuill 
              value={description} 
              onChange={setDescription} 
              style={{ height: 200, marginBottom: 50 }} 
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              style={{ background: "#2e7d32", border: "none" }}
            >
              {editData ? "Update" : "Save"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HadithManagement;
