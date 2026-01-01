import { Button, Form, Input, Select, Upload, Card, Switch, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import  { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../utils/axiosInstance";

type Category = { id: string; name: string };

type HadithFormValues = {
  title: string;
  category: string;
  refrence?: string;
  hadith: string;
  description: string;
  daily: boolean;
};

const CreateHadithPage = ({ allCategories }: { allCategories: Category[] }) => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState<string>("");
  const [, setHadith] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (info: any) => {
    const file = info.file.originFileObj;
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

const handleSubmit = async (values: HadithFormValues) => {
  try {
    const formData = new FormData();


    formData.append("title", values.title);
    formData.append("category", values.category); 
    formData.append("hadith", values.hadith);
    formData.append("description", description);

    if (values.refrence) formData.append("refrence", values.refrence);
    formData.append("daily", String(values.daily));
    if (imageFile) formData.append("icon", imageFile);

    const res = await axiosInstance.post("/hadith", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Hadith created:", res.data);
    message.success("Hadith created successfully");
    form.resetFields();
    setDescription("");
    setHadith("");
    setImageFile(null);
    setImageUrl(null);
  } catch (err: any) {
    console.error("CreateHadith error:", err.response?.data || err);
    message.error("Failed to create Hadith");
  }
};

  return (
    <div className="p-5">
      <Card title="Add Hadith" className="shadow-md">
<Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ daily: false }}>
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
    <Select<string> placeholder="Select category">
      {allCategories.map(cat => (
        <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
      ))}
    </Select>
  </Form.Item>

  <Form.Item label="Daily" name="daily" valuePropName="checked">
    <Switch />
  </Form.Item>

  <Form.Item
    label="hadith"
    name="hadith"
    rules={[{ required: true, message: "Hadith text is required" }]}
  >
    <Input.TextArea rows={4} placeholder="Enter the hadith text" />
  </Form.Item>

  <Form.Item label="Description">
    <ReactQuill value={description} onChange={setDescription} />
  </Form.Item>

  <Form.Item label="Hadith Image (optional)">
    <Upload
      accept="image/*"
      showUploadList={false}
      beforeUpload={() => false}
      onChange={handleImageUpload}
    >
      <Button icon={<UploadOutlined />}>Upload Image</Button>
    </Upload>
    {imageUrl && <img src={imageUrl} alt="Preview" style={{ height: 150 }} />}
  </Form.Item>

  <Form.Item>
    <Button type="primary" htmlType="submit">Add Hadith</Button>
  </Form.Item>
</Form>
      </Card>
    </div>
  );
};

export default CreateHadithPage;