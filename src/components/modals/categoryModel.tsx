import { toast } from "sonner";
import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { PiImageThin } from "react-icons/pi";
import axiosInstance from "../../utils/axiosInstance";
import { getImageUrl } from "../../utils/imageUrl";

const AddcategorysModal = ({
    isOpen,
    setIsOpen,
    editData,
    onSuccess
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    editData: any;
    onSuccess: () => void;
}) => {

    const [form] = Form.useForm();
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | undefined>();

    useEffect(() => {
        if (editData) {
            form.setFieldsValue(editData);
            setImageUrl(getImageUrl(editData.image));
        }
    }, [editData]);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImgFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };


    const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (imgFile) formData.append("image", imgFile);

    try {
        if (editData) {
            await axiosInstance.put(`/category/${editData.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } else {
            await axiosInstance.post(`/category`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        }

        toast.success(
    editData
        ? "Category updated successfully!"
        : "Category created successfully!",
    {
        position: "top-center",
        duration: 2000,
        style: {
            borderRadius: "10px",
            padding: "14px 18px",
            background: "#f6ffed",
            border: "1px solid #b7eb8f",
        },
    }
);

        onSuccess();
        setIsOpen(false);
        form.resetFields();
        setImgFile(null);
        setImageUrl(undefined);
    } catch (error) {
        console.log("Upload error:", error);
    }
};
    return (
        <Modal
            title={
                <p className="text-xl text-black font-semibold">
                    {editData ? "Edit Category" : "Add New Categories"}
                </p>
            }
            open={isOpen}
            onCancel={() => {
                setIsOpen(false);
                form.resetFields();
                setImgFile(null);
                setImageUrl(undefined);
            }}
            footer={null}
            width={600}
            centered
        >
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
                
                {/* Name */}
                <Form.Item
                    label={<span className="text-[15px] font-medium">Name</span>}
                    name="name"
                    rules={[{ required: true, message: "Enter category name" }]}
                >
                    <Input
                        placeholder="enter categories name"
                        className="h-11 rounded-lg border-gray-300"
                    />
                </Form.Item>

                {/* Icon */}
                <p className="text-[15px] font-medium mb-1">Icon</p>

                <label
                    htmlFor="image"
                    className="w-full border border-dashed border-gray-400 rounded-lg cursor-pointer flex flex-col items-center justify-center py-8"
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="h-32 object-contain"
                        />
                    ) : (
                        <>
                            <PiImageThin className="text-4xl text-gray-500 mb-2" />
                            <p className="text-gray-600 font-medium">Upload License Photo</p>
                            <p className="text-xs text-gray-500">PDF, PNG, JPG or DOC</p>
                        </>
                    )}
                </label>

                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                />

                {/* Submit */}
                <Button
                    htmlType="submit"
                    className="w-full h-11 mt-5 rounded-lg bg-[#748d84] text-white text-[16px] font-medium"
                >
                    {editData ? "Update Category" : "Confirm"}
                </Button>

            </Form>
        </Modal>
    );
};

export default AddcategorysModal;

