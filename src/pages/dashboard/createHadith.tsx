import { Button, Table, Form, Input, Select, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineEdit, AiOutlineEye, AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import ReactQuill from "react-quill";
type HadithData = {
  id: string;
  title: string;
  referenced?: string;
  Category?: string;
  description: string;
  isLoaded?: boolean;
  isLocked?: boolean;
  icon?: string | null;
};

const AllHadith = () => {
const [viewModalOpen, setViewModalOpen] = useState(false);
const [viewData, setViewData] = useState<HadithData | null>(null);
  const [hadithList, setHadithList] = useState<HadithData[]>([
    {
      id: "01",
      title: "الجمال والموضة",
      referenced: "Omor ibn khattab",
      Category: "sleeping",
      description: "تعلم آخر صيحات الموضة والجمال من خبراء الصناعة.",
    },
    {
      id: "02",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
      Category: "Category2",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "03",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
      Category: "friend",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "04",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
      Category: "home",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
   
    },
    {
      id: "05",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
      Category: "school",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
      icon:
        "https://www.flaticon.com/free-icon/school_8074798?term=school&page=1&position=7&origin=tag&related_id=8074798",
    },
    {
      id: "06",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
      Category: "aqidah",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
      icon:
        "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg"
    },
    {
      id: "07",
      title: "الصحة واللياقة البدنية",
        referenced: "abbas ibn masud",
        Category: "sunnah",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "08",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
        Category: "sunnah",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "09",
      title: "الصحة واللياقة البدنية",
        referenced: "abbas ibn masud",
        Category: "sunnah",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "10",
      title: "الصحة واللياقة البدنية",
        referenced: "abbas ibn masud",
        Category: "sunnah",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "11",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
      Category: "sunnah",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
const handleImageUpload = (info: any) => {
    const file = info.file.originFileObj;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };
  // Submit handler
  const handleAddHadith = (values: any) => {
    const newHadith: HadithData = {
      id: (hadithList.length + 1).toString(),
      title: values.title,
      referenced: values.referenced,
      Category: values.Category,
      description,
      icon: imageUrl || null,
    };
    setHadithList([newHadith, ...hadithList]);
    form.resetFields();
    setDescription("");
    setImageUrl(null);
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "80px",
    },
    {
      title: "Hadith Name",
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <span style={{ direction: "rtl", textAlign: "right", display: "block" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text: string) => (
        <span style={{ direction: "rtl", textAlign: "right", display: "block" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Icon",
      dataIndex: "icon",
      render: (img: string | null) =>
        img ? (
          <img
            src={img}
            alt="hadith"
            style={{ width: 30, height: 35, objectFit: "cover" }}
          />
        ) : (
          "No icon"
        ),
    },
    {
      title: "Category",
      dataIndex: "referencedCategory",
      key: "referencedCategory",
    },

{
  title: "Action",
  key: "action",
  width: "180px",
  render: (_: any, record: HadithData) => (
    <div className="flex items-center gap-3">

      {/* VIEW */}
      <button
        onClick={() => {
          setViewData(record);
          setViewModalOpen(true);
        }}
      >
        <AiOutlineEye className="text-xl text-blue-600" />
      </button>

      {/* EDIT - disabled when locked */}
      <button
        disabled={record.isLocked}
        onClick={() => {
          form.setFieldsValue({
            title: record.title,
            referenced: record.referenced,
            Category: record.Category,
          });
          setDescription(record.description);
          setIsModalOpen(true);
        }}
        style={{ opacity: record.isLocked ? 0.4 : 1 }}
      >
        <AiOutlineEdit className="text-xl text-primary" />
      </button>

      {/* LOCK / UNLOCK BUTTON */}
      {record.isLocked ? (
        <button
          onClick={() => {
            setHadithList(prev =>
              prev.map(h => h.id === record.id ? { ...h, isLocked: false } : h)
            );
          }}
        >
          <AiOutlineUnlock className="text-xl text-green-600" />
        </button>
      ) : (
        <button
          onClick={() => {
            setHadithList(prev =>
              prev.map(h => h.id === record.id ? { ...h, isLocked: true } : h)
            );
          }}
        >
          <AiOutlineLock className="text-xl text-yellow-600" />
        </button>
      )}

      {/* DELETE */}
      <button
        onClick={() => {
          setHadithList(prev => prev.filter(h => h.id !== record.id));
        }}
      >
        <IoTrashOutline className="text-xl text-red-500" />
      </button>

    </div>
  ),
}
  ];

  return (
    <div style={{ padding: 20 }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Manage Hadith</h1>
        <Button type="primary" 
        onClick={() => setIsModalOpen(true)}>
          Add Hadith
        </Button>
      </div>

      <Table dataSource={hadithList} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />

{/* view modal data */}
    <Modal
        open={viewModalOpen}
        footer={null}
        onCancel={() => setViewModalOpen(false)}
        title="Hadith Details"
      >
        {viewData && (
          <div style={{ lineHeight: "1.8" }}>
            <h2><strong>Title:</strong> {viewData.title}</h2>
            <p><strong>Referenced:</strong> {viewData.referenced}</p>
            <p><strong>Category:</strong> {viewData.Category}</p>

            <strong>Description:</strong>
            <div
              dangerouslySetInnerHTML={{ __html: viewData.description }}
              style={{
                padding: 10,
                background: "#f7f7f7",
                borderRadius: 6,
                marginBottom: 10,
              }}
            />
          </div>
        )}
      </Modal>

      {/* Modal for adding Hadith */}
      <Modal
        title="Add Hadith"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setDescription("");
          setImageUrl(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddHadith}>
          <Form.Item label="Hadith Title" name="title" rules={[{ required: true }]}>
            <Input placeholder="Enter hadith title" />
          </Form.Item>
          <Form.Item label="Referenced" name="referenced" rules={[{ required: true }]}>
            <Input placeholder="Enter referenced" />
          </Form.Item>
          <Form.Item label="Category" name="Category" rules={[{ required: true }]}>
            <Select placeholder="Select category" allowClear>
              <Select.Option value="Islamic Knowledge">صحيح البخاري</Select.Option>
              <Select.Option value="">سنن أبي داود</Select.Option>
              <Select.Option value="Fiqh">مسند أحمد</Select.Option>
              <Select.Option value="Fiqh">سنن النسائي</Select.Option>
              <Select.Option value="Fiqh">سنن ابن ماجه</Select.Option>
            </Select>
          </Form.Item>

          <label>Description</label>
          <ReactQuill value={description} onChange={setDescription} style={{ height: 400,width: "100%" ,marginBottom:15 }} />
          <Form.Item label="Hadith Image">
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
                style={{
                  marginTop: 10,
                  width: 120,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            )}
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AllHadith;
