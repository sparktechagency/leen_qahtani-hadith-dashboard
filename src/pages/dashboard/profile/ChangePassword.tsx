import { Button, Form, Input } from 'antd';

const ChangePassword = () => {
    const onFinish = (values: any) => {
        console.log(values, 'from u');
    };
    return (
        <div className="max-w-lg mx-auto">
            <Form layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item
                    label={
                        <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                            Current Password
                        </label>
                    }
                    name="current_password"
                    rules={[{ required: true, message: 'Please input new password!' }]}
                >
                    <Input.Password placeholder="KK!@#$15856" className=" h-12 px-6" />
                </Form.Item>
                <Form.Item
                    label={
                        <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                            New Password
                        </label>
                    }
                    name="new_password"
                    rules={[{ required: true, message: 'Please input confirm password!' }]}
                >
                    <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                </Form.Item>
                <Form.Item
                    label={
                        <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                            Confirm Password
                        </label>
                    }
                    name="confirm_password"
                    rules={[{ required: true, message: 'Please input confirm password!' }]}
                >
                    <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                </Form.Item>

                <Form.Item className="flex justify-center">
                    <Button
                        shape="round"
                        type="primary"
                        htmlType="submit"
                        style={{
                            height: 45,
                            width: '100%',
                            fontWeight: 500,
                        }}
                    >
                        Change Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;
