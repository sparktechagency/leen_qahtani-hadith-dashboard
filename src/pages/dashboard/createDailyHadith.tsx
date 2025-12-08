import { Button, Table, Form, Input, Select, Modal, Upload } from "antd";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineEdit, AiOutlineEye, AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type HadithData = {
  id: string;
  title: string;
  referenced?: string;
  Category?: string;
  description: string;
  image?: string | null;
  isLoaded?: boolean;
  isLocked?: boolean;
};

const DailyAllHadith = () => {
  // VIEW MODAL STATES
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState<HadithData | null>(null);

  const [hadithList, setHadithList] = useState<HadithData[]>([
    {
      id: "01",
      title: "الجمال والموضة",
      referenced: "Omor ibn khattab",
      Category: "sleeping",
      description:
        "تعلم آخر صيحات الموضة والجمال من خبراء الصناعة.",
      image:
        "https://www.vecteezy.com/photo/6667489-image-of-quotes-surah-from-al-quran",
    },
    {
      id: "02",
      title: "الجمال والموضة",
      referenced: "Omor ibn khattab",
      Category: "adoption",
      description:
        "تعلم آخر صيحات الموضة والجمال من خبراء الصناعة.",
      image:
        "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  // Handle Image Upload
  const handleImageUpload = (info: any) => {
    const file = info.file.originFileObj;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  // Add / Update
  const handleAddHadith = (values: any) => {
    const newHadith: HadithData = {
      id: editId ? editId : (hadithList.length + 1).toString(),
      title: values.title,
      referenced: values.referenced,
      Category: values.Category,
      description,
      image: imageUrl || null,
    };

    if (editId) {
      setHadithList((prev) =>
        prev.map((h) => (h.id === editId ? newHadith : h))
      );
    } else {
      setHadithList([newHadith, ...hadithList]);
    }

    form.resetFields();
    setDescription("");
    setImageUrl(null);
    setEditId(null);
    setIsModalOpen(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", width: "80px" },

    {
      title: "Hadith",
      dataIndex: "title",
      render: (text: string) => (
        <span style={{ direction: "rtl", textAlign: "right", display: "block" }}>
          {text}
        </span>
      ),
    },

    {
      title: "Image",
      dataIndex: "image",
      render: (img: string | null) =>
        img ? (
          <img
            src={img}
            alt="hadith"
            style={{ width: 50, height: 45, objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },

    { title: "Category", dataIndex: "Category" },

{
  title: "Action",
  render: (_: any, record: HadithData) => (
    <div className="flex items-center gap-4">

      {/* View */}
      <button
        onClick={() => {
          setViewData(record);
          setViewModalOpen(true);
        }}
      >
        <AiOutlineEye className="text-xl text-blue-600" />
      </button>
    {/* isLocked */}
  
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

      {/* Edit */}
      <button
        disabled={record.isLocked}
        onClick={() => {
          form.setFieldsValue({
            title: record.title,
            referenced: record.referenced,
            Category: record.Category,
          });
          setDescription(record.description);
          setImageUrl(record.image || null);
          setEditId(record.id);
          setIsModalOpen(true);
        }}
      >
        <AiOutlineEdit className="text-xl text-primary" />
      </button>

      {/* Delete */}
      <button
        onClick={() =>
          setHadithList((prev) => prev.filter((h) => h.id !== record.id))
        }
      >
        <IoTrashOutline className="text-xl text-red-500" />
      </button>

    </div>
  ),
}

  ];

  return (
    <div style={{ padding: 20 }}>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Manage Hadith</h1>
        <Button
          type="primary"
          onClick={() => {
            form.resetFields();
            setEditId(null);
            setDescription("");
            setImageUrl(null);
            setIsModalOpen(true);
          }}
        >
          Add Daily Hadith
        </Button>
      </div>

      <Table dataSource={hadithList} columns={columns} rowKey="id" />

      {/* ========== VIEW MODAL ========== */}
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

            <strong>Image:</strong>
            <br />
            {viewData.image ? (
              <img
                src={viewData.image}
                alt="hadith"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  marginTop: 10,
                }}
              />
            ) : (
              <p>No Image</p>
            )}
          </div>
        )}
      </Modal>

      {/* ADD / EDIT MODAL (unchanged) */}
      <Modal
        title={editId ? "Edit Hadith" : "Add Hadith"}
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          setEditId(null);
          form.resetFields();
          setDescription("");
          setImageUrl(null);
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleAddHadith}>
          <Form.Item label="Hadith Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Referenced" name="referenced">
            <Input />
          </Form.Item>

          <Form.Item label="Category" name="Category">
            <Select>
              <Select.Option value="sleeping">Sleeping</Select.Option>
              <Select.Option value="friend">Friend</Select.Option>
              <Select.Option value="home">Home</Select.Option>
              <Select.Option value="school">School</Select.Option>
              <Select.Option value="aqidah">Aqidah</Select.Option>
              <Select.Option value="sunnah">Sunnah</Select.Option>
            </Select>
          </Form.Item>

          <label>Description</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            style={{ height: 200, marginBottom: 20 }}
          />

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

          <Button type="primary" htmlType="submit" block>
            {editId ? "Update Hadith" : "Add Hadith"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default DailyAllHadith;