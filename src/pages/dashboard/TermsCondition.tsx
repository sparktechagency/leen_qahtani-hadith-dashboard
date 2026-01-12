import { useState, useRef, useEffect, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { Button, message } from 'antd';
import axios from "../../utils/axiosInstance";

const TermsCondition = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    // FIX: Cast config to 'any' to avoid strict TypeScript errors with Jodit types
    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'ابدأ الكتابة هنا...',
        direction: "rtl",
        language: "ar",
        style: {
            height: 400,
            background: 'white',
            textAlign: 'right',
            direction: 'rtl',
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

    const fetchTermsData = async () => {
        try {
            const res = await axios.get("/rule/terms-and-conditions");
            if (res.data?.data?.content) {
                setContent(res.data.data.content);
            }
        } catch (error) {
            console.error(error);
            message.error("فشل تحميل الشروط والأحكام");
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
                message.success("تم تحديث الشروط والأحكام بنجاح");
            } else {
                message.error("فشل التحديث");
            }
        } catch (error) {
            console.error(error);
            message.error("حدث خطأ أثناء تحديث الشروط والأحكام");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white px-4 py-2 rounded-lg pb-10" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between my-4">
                <h3 className="text-3xl text-primary font-semibold">الشروط والأحكام</h3>
            </div>

            {/* Editor */}
            {/* Wrapper with ltr direction ensures the toolbar icons render correctly, 
                while the internal text area respects the config's RTL setting */}
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
                    onClick={saveTermsData}
                >
                    حفظ التغييرات
                </Button>
            </div>
        </div>
    );
};

export default TermsCondition;