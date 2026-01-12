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
  fontSize: "16px",
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
      message.success("تم تحديث الحالة");
    } catch (err) {
      message.error("فشل تحديث الحالة");
    }
  };

  const deleteHadith = async (id: string) => {
    try {
      await axiosInstance.delete(`/hadith/${id}`);
      setHadithList(prev => prev.filter(h => h._id !== id));
      message.success("تم حذف الحديث");
    } catch (err) {
      message.error("فشل الحذف");
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
        message.success("تم التحديث بنجاح");
        setHadithList(prev =>
          prev.map(h => (h._id === editData._id ? res.data.data : h))
        );
      } else {
        res = await axiosInstance.post("/hadith", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("تم الحفظ بنجاح");
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
      message.error(err.response?.data?.message || "فشل حفظ الحديث");
    }
  };

  const columns = [
    {
      title: "ر.ت.",
      key: "index",
      width: 80,
      render: (_: any, __: any, index: number) => {
        const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
        return (index + 1)
          .toString()
          .replace(/\d/g, (d) => arabicNumbers[parseInt(d)]);
      },
    },

    { title: "العنوان", dataIndex: "title", key: "title", align: "right" as const },
    {
      title: "الفئات",
      key: "category",
      align: "right" as const,
      render: (record: HadithData) =>
        typeof record.category === "object" ? record.category?.name : record.category || "-",
    },
    { title: "المرجع", dataIndex: "refrence", key: "refrence", align: "right" as const },

    {
      title: "الحديث",
      key: "hadith",
      align: "right" as const,
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
      align: "right" as const,
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
      align: "center" as const,
      render: (_: any, record: any) => (
        <button className="flex items-center justify-center gap-2 hover:opacity-80 transition w-full">
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
      align: "center" as const,
      render: (_: any, record: any) => (
        <div className="flex items-center justify-center gap-3">
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
            title="هل أنت متأكد من حذف هذا الحديث؟"
            onConfirm={() => deleteHadith(record._id)}
            okText="نعم"
            cancelText="لا"
          >
            <IoTrashOutline className="text-xl text-red-500 cursor-pointer hover:text-red-700" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px 40px", background: "#fff", minHeight: "100vh" }}>
      {/* --- CSS for RTL Support & Modal Fixes --- */}
      <style>{`
        .arabic-quill .ql-editor {
          direction: rtl;
          text-align: right;
          font-family: 'Traditional Arabic', 'Amiri', serif;
          font-size: 18px;
        }
        .arabic-quill .ql-editor.ql-blank::before {
          right: 15px;
          left: auto;
          text-align: right;
        }
        .ant-modal-title {
          text-align: right;
        }
        .ant-modal-close {
           right: auto;
           left: 0;
        }
      `}</style>

      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, direction: 'rtl' }}>
        <h1 style={{ fontSize: 24, fontWeight: "bold", margin: 0 }}>الحديث</h1>
      </div>

      {/* Filters + Add Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 16 }}>
        <Space>
          <Search
            placeholder="بحث"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250, direction: "rtl" }}
          />
        </Space>
        <Select
          placeholder="فئات"
          allowClear
          style={{ width: 180, direction: "rtl" }}
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
          style={{ width: 200, direction: "rtl" }}
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
        // Force text alignment for rows
        rowClassName={() => "text-right"}
      />

      {/* View Modal */}
      <Modal
        title={<div style={{ textAlign: "right" }}>عرض الحديث</div>}
        open={isViewModalOpen}
        footer={null}
        onCancel={() => setIsViewModalOpen(false)}
        width={700}
        style={{ direction: 'rtl' }}
      >
        {viewData && (
          <div className="space-y-4" style={{ textAlign: "right", direction: "rtl" }}>
            <h3 className="text-xl font-bold">{viewData.title}</h3>
            <p><strong>المرجع:</strong> {viewData.refrence}</p>
            <p><strong>الفئة:</strong> {typeof viewData.category === "object" ? viewData.category?.name : viewData.category}</p>
            
            {viewData.icon && (
              <img src={getImageUrl(viewData.icon)} alt="icon" className="w-32 h-32 object-cover rounded" />
            )}
            
            <p className="font-bold mt-4">نص الحديث:</p>
            <div style={{
              background: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #e9ecef",
              ...arabicTextStyle 
            }}>
              {viewData.hadith}
            </div>

            <p className="font-bold mt-4">الوصف:</p>
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
          // setImageFile(null);
          // setImageUrl(null);
        }}
        width={800}
      >
        <div dir="rtl">
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
              <Select placeholder="اختر الفئة" style={{ direction: 'rtl' }}>
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
                className="arabic-quill"
                value={description} 
                onChange={setDescription} 
                style={{ height: 200, marginBottom: 50, direction: "rtl" }}
              />
            </Form.Item>

             {/* <Form.Item label="صورة الحديث (اختياري)">
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleImageUpload}
              >
                <Button icon={<UploadOutlined />}>رفع صورة</Button>
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
                {editData ? "تحديث" : "حفظ"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default HadithManagement;