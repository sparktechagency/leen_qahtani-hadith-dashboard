import { Button, ConfigProvider, Form, FormProps, Input, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

interface ResetPasswordForm {
    newPassword: string;
    confirmPassword: string;
}

const NewPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = (location.state as any)?.email;
    const resetToken = (location.state as any)?.resetToken;

const onFinish: FormProps<ResetPasswordForm>['onFinish'] = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
        message.error("Passwords do not match!");
        return;
    }
    
    // DEBUG: Log the values being sent
    console.log('Email:', email);
    console.log('Reset Token:', resetToken);
    console.log('Payload:', {
        email,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
        token: resetToken,
    });
    
    try {
        await axiosInstance.post('/auth/reset-password', {
            email,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
            token: resetToken, 
        });
        message.success("Password reset successfully!");
        navigate('/login');
    } catch (error: any) {
        console.error('Full error:', error.response); 
        message.error(error?.response?.data?.message || 'Failed to reset password!');
    }
};

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#286a25' } }}>
            <div className="flex items-center justify-center h-screen" style={{ backgroundImage: `url('/auth.png')`, backgroundSize: 'cover' }}>
                <div className="bg-white w-[630px] rounded-lg shadow-lg p-10">
                    <h1 className="text-3xl font-medium text-center mt-2">Set New Password</h1>

                    <Form name="newPassword" layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="New Password"
                            name="newPassword"
                            rules={[{ required: true, message: 'Please enter new password!' }]}
                        >
                            <Input.Password placeholder="Enter new password" className="h-12" />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please confirm password!' }]}
                        >
                            <Input.Password placeholder="Confirm new password" className="h-12" />
                        </Form.Item>

                        <Form.Item>
                            <Button shape="round" type="primary" htmlType="submit" style={{ height: 45, width: '100%', fontWeight: 500 }}>
                                Reset Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default NewPassword;