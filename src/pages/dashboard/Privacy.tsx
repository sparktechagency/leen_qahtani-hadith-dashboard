import { useState, useRef, useEffect, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Button, message } from "antd";
import axios from "../../utils/axiosInstance"; 

const Privacy = () => {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const config = useMemo(() => ({
        readonly: false,
        placeholder: "ابدأ الكتابة هنا...",
        direction: "rtl",
        language: "ar",
        style: {
            height: 400,
            background: "white",
            textAlign: "right",
            direction: "rtl",
            fontFamily: "'Traditional Arabic', 'Amiri', serif",
            fontSize: "18px"
        },
        toolbarButtonSize: "middle", 
        buttons: [
            'bold', 'italic', 'underline', '|', 
            'ul', 'ol', '|', 
            'font', 'fontsize', '|', 
            'align', 'undo', 'redo', '|',
            'hr', 'link'
        ]
    }), []) as any; 

    const fetchPrivacyData = async () => {
        try {
            const res = await axios.get("/rule/privacy-policy");
            if (res.data?.data?.content) {
                setContent(res.data.data.content);
            }
        } catch (error) {
            console.error(error);
            message.error("فشل تحميل سياسة الخصوصية");
        }
    };

    useEffect(() => {
        fetchPrivacyData();
    }, []);

    const savePrivacyData = async () => {
        try {
            setLoading(true);

            const payload = {
                type: "privacy",
                content: content,
            };

            const res = await axios.patch("/rule/privacy-policy", payload);

            if (res.data.success) {
                message.success("تم تحديث سياسة الخصوصية بنجاح");
            } else {
                message.error("فشل التحديث");
            }
        } catch (error) {
            console.error(error);
            message.error("حدث خطأ أثناء التحديث");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white px-4 py-2 rounded-lg pb-10" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between my-4">
                <h3 className="text-3xl text-primary font-semibold">سياسة الخصوصية</h3>
            </div>

            <div className="jodit-container" style={{ direction: "ltr" }}>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onBlur={(newContent) => setContent(newContent)}
                />
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-center">
                <Button
                    type="primary"
                    loading={loading}
                    style={{ height: 40, width: "150px", background: "#2e7d32", border: "none" }}
                    onClick={savePrivacyData}
                >
                    حفظ التغييرات
                </Button>
            </div>
        </div>
    );
};

export default Privacy;