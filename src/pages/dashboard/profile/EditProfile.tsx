import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { CiEdit } from 'react-icons/ci';
import axiosInstance from '../../../utils/axiosInstance';
const BASE_URL = import.meta.env.VITE_API_URL_IMAGE;

interface EditProfileProps {
    user: any;
    reload: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, reload }) => {
    const [imagePreview, setImagePreview] = useState('/user.png');
    const [file, setFile] = useState<File | null>(null);

    const [form] = Form.useForm();

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.name,
                email: user.email,
            });

            if (user.profile) {

                setImagePreview(BASE_URL + '/' + user.profile);
            } else {
                setImagePreview('/user.png');
            }
        }
    }, [user]);

    const onFinish = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            if (file) {
                formData.append('image', file);
            }

            await axiosInstance.put('/user/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            message.success('Profile updated successfully!');
            reload();
        } catch (err) {
            console.log(err);
            message.error('Failed to update profile');
        }
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
            <Form form={form} name="update_profile" layout="vertical" onFinish={onFinish}>
                
                <div className="flex justify-center mb-4">
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
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input className="h-12" placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input className="h-12" placeholder="Enter your email" />
                </Form.Item>

                <Form.Item className="flex justify-center">
                    <Button type="primary" htmlType="submit" style={{ height: 42 }}>
                        Update Profile
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditProfile;