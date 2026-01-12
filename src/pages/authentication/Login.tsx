import { Button, Checkbox, ConfigProvider, Form, FormProps, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    interface LoginFormValues {
        email: string;
        password: string;
        remember?: boolean;
    }

    const onFinish: FormProps<LoginFormValues>['onFinish'] = async (values) => {
        try {
            setLoading(true);

            const response = await axiosInstance.post('/auth/email-login', {
                email: values.email,
                password: values.password,
            });

            message.success("تم تسجيل الدخول بنجاح!");

            if (response.data?.data?.accessToken) {
                localStorage.setItem("authToken", response.data.data.accessToken);
            }

            navigate('/');

        } catch (error: any) {
            message.error(error?.response?.data?.message || "فشل تسجيل الدخول!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ConfigProvider
            direction="rtl"
            theme={{
                token: {
                    colorPrimary: '#286a25',
                    colorBgContainer: '#F1F4F9',
                    fontFamily: "'Cairo', 'Montserrat', sans-serif", // Ensure Arabic font
                },
                components: {
                    Input: {
                        borderRadius: 10,
                        colorBorder: 'transparent',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: 'transparent',
                    },
                },
            }}
        >
            <div
                dir="rtl"
                className="flex items-center justify-center h-screen"
                style={{
                    backgroundImage: `url('/auth.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    objectFit: 'cover',
                }}
            >
                <div className="bg-white w-[630px] rounded-lg shadow-lg p-10">
                    <div className="text-primaryText space-y-3 text-center mb-6">
                        <h1 className="text-3xl font-bold text-center mt-2 text-[#286a25]">تسجيل الدخول</h1>
                        <p className="text-lg text-gray-500">يرجى إدخال البريد الإلكتروني وكلمة المرور للمتابعة</p>
                    </div>

                    <Form
                        name="normal_login"
                        className="login-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={<label className="text-primaryText mb-1 text-lg font-medium">البريد الإلكتروني</label>}
                            name="email"
                            rules={[{ required: true, message: 'يرجى إدخال البريد الإلكتروني!' }]}
                        >
                            <Input 
                                placeholder="أدخل البريد الإلكتروني" 
                                type="email" 
                                className="h-12 px-4 bg-[#F1F4F9]" 
                            />
                        </Form.Item>

                        <Form.Item
                            label={<label className="text-primaryText mb-1 text-lg font-medium">كلمة المرور</label>}
                            name="password"
                            rules={[{ required: true, message: 'يرجى إدخال كلمة المرور!' }]}
                        >
                            <Input.Password 
                                placeholder="أدخل كلمة المرور" 
                                className="h-12 px-4 bg-[#F1F4F9]" 
                            />
                        </Form.Item>

                        <div className="flex items-center justify-between mb-6 mt-2">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className="text-primaryText text-base">تذكرني</Checkbox>
                            </Form.Item>
                            
                            <Link to="/forget-password" className="text-[#286a25] text-base hover:text-[#1e501c] font-medium">
                                نسيت كلمة المرور؟
                            </Link>
                        </div>

                        <Form.Item>
                            <Button
                                shape="round"
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{
                                    height: 50,
                                    width: '100%',
                                    fontWeight: 600,
                                    fontSize: '18px',
                                    backgroundColor: '#286a25',
                                    border: 'none'
                                }}
                            >
                                دخول
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Login;