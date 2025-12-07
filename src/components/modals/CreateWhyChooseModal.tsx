import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { PiImageThin } from "react-icons/pi";

type contentType = {
  id: string;
  contentTitle: string;
  contentImage: string;
  description: string;
}; 

const CreateWhyChooseModal = ({ isOpen, setIsOpen, editData, setEditData }: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    editData: contentType | null;
    setEditData: (data: contentType | null) => void;
}) => {

    const [form] = Form.useForm();
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | undefined>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImgFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (editData) {
            form.setFieldsValue(editData);
            setImageUrl(editData.contentImage);
        }
    }, [editData, form, setImageUrl]);

    const OnFinish = (values:{contentTitle:string , description:string}) => {
                console.log("Form Values:", {
            ...values,
            image: imgFile
        });
        setIsOpen(false);
        setEditData(null);
        form.resetFields();
        setImgFile(null);
        setImageUrl(undefined);
    }

    return (
        <Modal
            title={<p className="text-xl text-primary font-semibold">{editData?.id ? "Edit Content" : "Create Content"} </p>}
            open={isOpen}
            onCancel={() => {
                setIsOpen(false);
                form.resetFields();
                setImgFile(null);
                setImageUrl(undefined);
                setEditData(null);
            }}
            footer={null}
            width="590px"
            centered
        >
            <Form layout="vertical" form={form} onFinish={OnFinish}>
                <Form.Item label="Content Title" name="contentTitle" rules={[{ required: true }]}>
                    <Input placeholder="Enter content title" style={{ height: 42 }} />
                </Form.Item>


                {/* image */}
                <div className="py-[4px] w-full mb-5">
                    <p className="text-[14px] font-semibold py-1 mb-2">Content image</p>
                    <label htmlFor="image" className="p-3 border border-[#BABABA] rounded-lg bg-white cursor-pointer block">
                        <div className="flex justify-center items-center w-full h-[180px] ">
                            {imageUrl ? (
                                <img src={imageUrl} style={{ height: "170px", width: "240px", borderRadius: 10, objectFit: "contain" }} alt="class" />
                            ) : (
                                <PiImageThin className="text-8xl text-[#666666]" />
                            )}
                        </div>
                    </label>
                    <div className="hidden">
                        <input id="image" type="file" accept="image/*" onChange={handleChange} className=" hidden" />
                    </div>

                </div>

                <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                    <Input.TextArea rows={3} placeholder="Enter Content description" />
                </Form.Item>

                <Form.Item>
                    <div className="flex justify-end w-full mt-5">
                        <Button type="primary" htmlType="submit" style={{ height: 40, width: "200px" }}>
                            Save
                        </Button>
                    </div>
                </Form.Item>

            </Form>

        </Modal>
    );
};

export default CreateWhyChooseModal;