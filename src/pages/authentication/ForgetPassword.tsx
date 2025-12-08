import { Button, ConfigProvider, Form, FormProps, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

interface ForgotPasswordForm {
    email: string;
}

const ForgetPassword = () => {
    const navigate = useNavigate();

    const onFinish: FormProps<ForgotPasswordForm>['onFinish'] = async (values) => {
        try {
            await axiosInstance.post('/auth/forgot-password', {
                email: values.email,
            });

            message.success("OTP sent successfully!");
            navigate('/verify-otp', { state: { email: values.email } });
        } catch (error: any) {
            message.error(error?.response?.data?.message || 'Failed to send OTP!');
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: { colorPrimary: '#286a25', colorBgContainer: '#F1F4F9' },
                components: {
                    Input: { borderRadius: 10, colorBorder: 'transparent' },
                },
            }}
        >
            <div className="flex items-center justify-center h-screen" style={{
                backgroundImage: `url('/auth.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className="bg-white w-[630px] rounded-lg shadow-lg p-10">
                    <h1 className="text-3xl font-medium text-center mt-2">Forget Password</h1>
                    <Form
                        name="forgetPassword"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input placeholder="Enter your email address" type="email" className="h-12" />
                        </Form.Item>

                        <Form.Item>
                            <Button shape="round" type="primary" htmlType="submit" style={{ height: 45, width: '100%', fontWeight: 500 }}>
                                Send OTP
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ForgetPassword;