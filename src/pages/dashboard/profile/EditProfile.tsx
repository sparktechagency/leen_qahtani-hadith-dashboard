import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { CiEdit } from 'react-icons/ci';

interface FormValues {
    name: string;
    email: string;
    image: File | null;
}

const EditProfile: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string>('/user.png');
    const [file, setFile] = useState<File | null>(null);

    const onFinish = (values: FormValues) => {
        console.log('Received values of form: ', values);
        values.image = file;
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
                setFile(selectedFile);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <Form name="update_profile" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
                {/* Banner Image */}
                <div className="flex justify-center">
                    <div className="w-[150px] h-[150px] relative">
                        <img
                            src={imagePreview}
                            alt="User Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <label
                            className="absolute bottom-[10%] cursor-pointer right-[5%] bg-primary rounded-full p-1 text-white"
                            htmlFor="imageUploadBanner"
                        >
                            <CiEdit size={25} />
                        </label>

                        <input
                            id="imageUploadBanner"
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>
                </div>

                <Form.Item
                    label={
                        <label htmlFor="name" className="block text-primaryText mb-1 text-lg">
                            Full Name
                        </label>
                    }
                    name="name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input className="h-12" placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label={
                        <label htmlFor="email" className="block text-primaryText mb-1 text-lg">
                            Email
                        </label>
                    }
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input className="h-12" placeholder="Enter your email" />
                </Form.Item>

                <Form.Item className="flex justify-center">
                    <Button
                        style={{
                            height: 42,
                        }}
                        type="primary"
                        htmlType="submit"
                    >
                        Update Profile
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditProfile;
