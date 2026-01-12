// import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
// import { FieldNamesType } from 'antd/es/cascader';
// import { useNavigate } from 'react-router-dom';

// const VerifyOtp = () => {
//     const navigate = useNavigate();
//     const onFinish: FormProps<FieldNamesType>['onFinish'] = (values) => {
//         console.log('Received values of form: ', values);
//         navigate('/new-password');
//     };

//     return (
//         <ConfigProvider
//             theme={{
//                 components: {
//                     Input: {
//                         // lineHeight: 3,
//                         controlHeight: 50,

//                         borderRadius: 10,
//                     },
//                 },
//                 token: {
//                     colorPrimary: '#286a25',
//                 },
//             }}
//         >
//             <div className="flex  items-center justify-center h-screen" style={{
//             backgroundImage: `url('/auth.png')`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'top',
//             backgroundRepeat: 'no-repeat',
//             objectFit: 'cover',
//         }}>
//                 <div className="bg-white w-[630px] rounded-lg shadow-lg p-10 ">
//                     <div className="text-primaryText space-y-3 text-center">
//                         <h1 className="text-3xl  font-medium text-center mt-2">Check your email</h1>
//                         <p>
//                             We sent a reset link to contact@dscode...com enter 5 digit code that mentioned in the email
//                         </p>
//                     </div>

                    // <Form
                    //     name="normal_VerifyOtp"
                    //     className="my-5"
                    //     layout="vertical"
                    //     initialValues={{ remember: true }}
                    //     onFinish={onFinish}
                    // >
                    //     <Form.Item
                    //         className="flex items-center justify-center mx-auto"
                    //         name="otp"
                    //         rules={[{ required: true, message: 'Please input otp code here!' }]}
                    //     >
                    //         <Input.OTP
                    //             style={{
                    //                 width: 300,
                    //             }}
                    //             className=""
                    //             variant="filled"
                    //             length={5}
                    //         />
                    //     </Form.Item>

                    //     <Form.Item>
                    //         <Button
                    //             shape="round"
                    //             type="primary"
                    //             htmlType="submit"
                    //             style={{
                    //                 height: 45,
                    //                 width: '100%',
                    //                 fontWeight: 500,
                    //             }}
                    //             // onClick={() => navigate('/')}
                    //         >
                    //             Verify OTP Code
                    //         </Button>
                    //     </Form.Item>
                    //     <div className="text-center text-lg flex items-center justify-center gap-2">
                    //         <p className="text-primaryText">Didn't receive the code?</p>
                    //         <p className="text-primary">Resend code</p>
                    //     </div>
                    // </Form>
//                 </div>
//             </div>
//         </ConfigProvider>
//     );
// };

// export default VerifyOtp;

import { Button, ConfigProvider, Form, FormProps, Input, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

interface VerifyOtpForm {
    otp: string;
}

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = (location.state as any)?.email;

    const onFinish: FormProps<VerifyOtpForm>['onFinish'] = async (values) => {
        try {
            const response = await axiosInstance.post('/auth/verify-email', {
                email,
                oneTimeCode: values.otp,
            });

            message.success(response.data.message || 'OTP verified successfully!');

            // Save reset token if returned
            const resetToken = response.data.data;
            navigate('/new-password', { state: { email, resetToken } });
        } catch (error: any) {
            message.error(error?.response?.data?.message || 'Invalid OTP!');
        }
    };

    const resendOtp = async () => {
        try {
            await axiosInstance.post('/auth/forgot-password', { email });
            message.success("OTP resent successfully!");
        } catch (error: any) {
            message.error(error?.response?.data?.message || "Failed to resend OTP");
        }
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#286a25' } }}>
            <div className="flex items-center justify-center h-screen" style={{ backgroundImage: `url('/auth.png')`, backgroundSize: 'cover' }}>
                <div className="bg-white w-[630px] rounded-lg shadow-lg p-10">
                    <h1 className="text-3xl font-medium text-center mt-2">Check your email</h1>
                    <p className="text-center mb-4">Enter the 5-digit code sent to your email.</p>

                    <Form name="verifyOtp" layout="vertical" 
                    onFinish={onFinish}>
                        <Form.Item
                            name="otp"
                            rules={[{ required: true, message: 'Please input OTP code!' }]}
                        >
                            <Input placeholder="Enter OTP" maxLength={6} className="h-12" />
                        </Form.Item>

                        <Form.Item>
                            <Button shape="round" type="primary" htmlType="submit" style={{ height: 45, width: '100%', fontWeight: 500 }}>
                                Verify OTP Code
                            </Button>
                        </Form.Item>

                        <div className="text-center text-lg flex items-center justify-center gap-2">
                            <p className="text-primaryText">Didn't receive the code?</p>
                            <p className="text-primary cursor-pointer" onClick={resendOtp}>Resend code</p>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;