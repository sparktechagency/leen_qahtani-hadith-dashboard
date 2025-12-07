import { Button, Form, Input, Select, Upload, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

type HadithData = {
    title: string;
    referencedCategory?: number;
    description: string;
    image?: string | null;
};

const CreateHadithPage = ({
    allCategories,
}: {
    allCategories: { id: number; name: string }[];
}) => {
    const [form] = Form.useForm();
    const [description, setDescription] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleImageUpload = (info: any) => {
        const file = info.file.originFileObj;
        const url = URL.createObjectURL(file);
        setImageUrl(url);
    };

    const handleSubmit = (values: HadithData) => {
        const payload: HadithData & { image?: string | null } = {
            ...values,
            description: description,
            image: imageUrl,
        };

        console.log("FINAL SUBMIT DATA:", payload);
    };

    return (
        <div className="p-5">
            <Card title="Add Hadith" className="shadow-md">

                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    
                    {/* Hadith Title */}
                    <Form.Item
                        label="Hadith Title"
                        name="title"
                        rules={[{ required: true, message: "Title is required" }]}
                    >
                        <Input placeholder="Enter hadith title" style={{ height: 45 }} />
                    </Form.Item>

                    {/* Category Dropdown */}
                    <Form.Item
                        label="Referenced"
                        name="referencedCategory"
                    >
                        <Select<number>
                            placeholder="Select category"
                            allowClear
                            showSearch
                            optionFilterProp="children"
                        >
                            {allCategories.map((cat) => (
                                <Select.Option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Rich Text Editor */}
                    <Form.Item label="Description">
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            style={{ height: 200, marginBottom: 50 }}
                        />
                    </Form.Item>

                    {/* Image Upload */}
                    <Form.Item label="Hadith Image (optional)">
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
                                    marginTop: 15,
                                    height: 160,
                                    borderRadius: 10,
                                    objectFit: "cover",
                                }}
                            />
                        )}
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ height: 45, width: "100%" }}>
                            Add Hadith
                        </Button>
                    </Form.Item>

                </Form>

            </Card>
        </div>
    );
};

export default CreateHadithPage;
