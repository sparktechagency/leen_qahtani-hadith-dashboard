import { Button, Form, Modal } from "antd";
import { useState } from "react";
import { PiImageThin } from "react-icons/pi";

const AddCompaniesModal = ({ isOpen, setIsOpen }: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
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
 
    const OnFinish =()=>{
    console.log(imgFile); 
    } 

    return (
        <Modal
            title={<p className="text-xl text-primary font-semibold">Add Company Logo </p>}
            open={isOpen}
            onCancel={() => {
                setIsOpen(false);
                form.resetFields();
                setImgFile(null);
                setImageUrl(undefined);
            }}
            footer={null}
            width="500px" 
            centered
        >
            <Form form={form} onFinish={OnFinish}>
                <div className="py-[4px] w-full">
                    <p className="text-[14px] font-semibold py-1 mb-2">Company logo</p>
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

                <Form.Item>
                    <div className="flex justify-end w-full mt-5">
                        <Button type="primary" htmlType="submit" style={{ height: 40 , width:"200px" }}>
                            Save
                        </Button>
                    </div>
                </Form.Item>

            </Form>

        </Modal>
    );
};

export default AddCompaniesModal;