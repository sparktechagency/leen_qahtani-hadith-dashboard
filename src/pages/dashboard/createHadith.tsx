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

type HadithData = {
  _id: string;
  title: string;
  refrence?: string;
  category?: any;
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

        console.log("Hadith:", hadithRes.data.data);
        console.log("Categories:", catRes.data.data);

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

  // const handleImageUpload = (info: any) => {
  //   const file = info.file.originFileObj || info.file;
  //   setImageFile(file);
  //   setImageUrl(URL.createObjectURL(file));
  // };

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      // Required fields
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("description", description);

      // Optional fields
      if (values.refrence) formData.append("refrence", values.refrence);
      formData.append("daily", String(values.daily || false));
      if (imageFile) formData.append("icon", imageFile);

      let res: AxiosResponse<any, any, {}>;
      if (editData) {
        // Update existing hadith
        res = await axiosInstance.patch(`/hadith/${editData._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Hadith updated successfully");
        
        // Update the list
        setHadithList(prev =>
          prev.map(h => (h._id === editData._id ? res.data.data : h))
        );
      } else {
        // Create new hadith
        res = await axiosInstance.post("/hadith", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Hadith created successfully");
        
        // Add to the list
        setHadithList(prev => [...prev, res.data.data]);
      }

      // Close modal and reset form
      setIsModalOpen(false);
      setEditData(null);
      form.resetFields();
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
      title: "Serial No",
      key: "index",
      width: 80,
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "Hadith", dataIndex: "title", key: "title" },
    {
      title: "Categories",
      key: "category",
      render: (record: HadithData) =>
        typeof record.category === "object" ? record.category?.name : record.category || "-",
    },
    { title: "Reference", dataIndex: "refrence", key: "refrence" },
    {
      title: "Description",
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
      title: "Status",
      key: "status",
      width: 130,
      render: (_: any, record: any) => (
        <button className="flex items-center gap-2 hover:opacity-80 transition">
          {record.status ? (
            <span className="text-green-600 font-medium">Active</span>
          ) : (
            <span className="text-red-600 font-medium">Inactive</span>
          )}
        </button>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: "right" as const,
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          {/* View */}
          <button
            onClick={() => {
              setViewData(record);
              setIsViewModalOpen(true);
            }}
            className="hover:text-blue-600"
          >
            <IoEyeOutline className="text-xl text-primary" />
          </button>

          {/* Edit */}
          <button
            onClick={() => {
              setEditData(record);
              form.setFieldsValue({
                title: record.title,
                refrence: record.refrence,
                category: typeof record.category === "object" ? record.category?._id : record.category,
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

          {/* Toggle Status */}
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

          {/* Delete */}
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
        <h1 style={{ fontSize: 24, fontWeight: "bold", margin: 0 }}>Hadith</h1>
      </div>

      {/* Filters + Add Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 16 }}>
        <Space>
          <Search
            placeholder="Search"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
        </Space>
        <Select
          placeholder="Categories"
          allowClear
          style={{ width: 180 }}
          onChange={(v) => setFilterCategory(v || undefined)}
        >
          {categories.map((cat) => (
            <Option key={cat._id} value={cat._id}>{cat.name}</Option>
          ))}
        </Select>

        <Select
          placeholder="Reference"
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
          // className="bg-[#82968D]"
          style={{ background: "#2e7d32", border: "none" }}
          onClick={() => {
            setEditData(null);
            form.resetFields();
            setDescription("");
            setImageFile(null);
            setImageUrl(null);
            setIsModalOpen(true);
          }}
        >
          Add New
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
            <div dangerouslySetInnerHTML={{ __html: viewData.description }} />
          </div>
        )}
      </Modal>

      {/* Add/Edit Modal */}
      <Modal
        title={editData ? "Edit Hadith" : "Add New Hadith"}
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          setEditData(null);
          form.resetFields();
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
            label="Hadith Title" 
            name="title" 
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="Enter hadith title" />
          </Form.Item>

          <Form.Item label="Reference" name="refrence">
            <Input placeholder="Enter reference" />
          </Form.Item>

          <Form.Item 
            label="Category" 
            name="category"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select placeholder="Select category">
              {categories.map(cat => (
                <Option key={cat._id} value={cat._id}>{cat.name}</Option>
              ))}
            </Select>
          </Form.Item>
{/* 
          <Form.Item label="Daily" name="daily" valuePropName="checked">
            <Switch />
          </Form.Item> */}

          <Form.Item label="Description">
            <ReactQuill 
              value={description} 
              onChange={setDescription} 
              style={{ height: 200, marginBottom: 50 }} 
            />
          </Form.Item>

          {/* <Form.Item label="Hadith Image (optional)">
            <Upload
              accept="image/*"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleImageUpload}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt="Preview" 
                style={{ marginTop: 10, height: 150, objectFit: "cover", borderRadius: 8 }} 
              />
            )}
          </Form.Item> */}

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