import { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button, message } from 'antd';
import axios from "../../utils/axiosInstance";

const TermsCondition = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const config = {
        readonly: false,
        placeholder: 'Start typings...',
        style: {
            height: 400,
            background: 'white',
        },
    };
    const fetchTermsData = async () => {
        try {
            const res = await axios.get("/rule/terms-and-conditions");
            if (res.data?.data?.content) {
                setContent(res.data.data.content);
            }
        } catch (error) {
            console.error(error);
            message.error("Failed to load terms and conditions");
        }
    };

    useEffect(() => {
        fetchTermsData();
    }, []);
const saveTermsData = async () => {
        try {
            setLoading(true);

            const payload = {
                type: "terms",
                content: content,
            };

            const res = await axios.patch("/rule/terms-and-conditions", payload);
            if (res.data.success) {
                message.success("Terms and Conditions updated successfully!");
            } else {
                message.error("Failed to update");
            }
        } catch (error) {
            console.error(error);
            message.error("Error updating terms and conditions");
        } finally {
            setLoading(false);
        }
    };

    // return (
    //     <div className=" bg-white px-4 py-2 rounded-lg pb-10 ">
    //         <div
    //             style={{
    //                 display: 'flex',
    //                 alignItems: 'center',
    //                 justifyContent: 'space-between',
    //                 margin: '16px 0',
    //             }}
    //         >
    //             <div>
    //                 <h3 className="text-2xl text-primary font-semibold">Terms and Conditions</h3>
    //             </div>
    //         </div>
    //         <div>
    //             <JoditEditor
    //                 ref={editor}
    //                 value={content}
    //                 config={config}
    //                 onBlur={(newContent) => setContent(newContent)}
    //             />
    //         </div>
    //         <div
    //             style={{
    //                 marginTop: 24,
    //                 display: 'flex',
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //             }}
    //         >
    //             <Button
    //                 style={{
    //                     height: 40,
    //                     width: '150px',
    //                 }}
    //                 onClick={saveTermsData}
    //                 type="primary"
    //             >
    //                 Save Changes
    //             </Button>
    //         </div>
    //     </div>
    // );

    return (
        <div className="bg-white px-4 py-2 rounded-lg pb-10">
            <div className="flex items-center justify-between my-4">
                <h3 className="text-3xl text-primary font-semibold">Terms and Conditions</h3>
            </div>

            {/* Editor */}
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onBlur={(newContent) => setContent(newContent)}
            />

            {/* Save Button */}
            <div className="mt-6 flex justify-center">
                <Button
                    type="primary"
                    loading={loading}
                    style={{ height: 40, width: "150px" }}
                    onClick={saveTermsData}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );

};

export default TermsCondition;
