import { useState, useRef, useEffect, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Button, message } from "antd";
import axios from "../../utils/axiosInstance"; 

const About = () => {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const config = useMemo(() => ({
        readonly: false,
        placeholder: "ابدأ الكتابة هنا...",
        direction: "rtl" as const, 
        language: "ar",  
        style: {
            height: 400,
            background: "white",
            textAlign: "right", 
            direction: "rtl" as const,
            fontFamily: "'Traditional Arabic', 'Amiri', serif",
            fontSize: "18px"
        },
        toolbarButtonSize: "middle" as const,
        buttons: [
            'bold', 'italic', 'underline', '|', 
            'ul', 'ol', '|', 
            'font', 'fontsize', '|', 
            'align', 'undo', 'redo', '|',
            'hr', 'link'
        ]
    }), []);

    const fetchAboutData = async () => {
        try {
            const res = await axios.get("/rule/about");
            if (res.data?.data?.content) {
                setContent(res.data.data.content);
            }
        } catch (error) {
            console.error(error);
            message.error("فشل تحميل البيانات");
        }
    };

    useEffect(() => {
        fetchAboutData();
    }, []);

    const saveAboutData = async () => {
        try {
            setLoading(true);

            const payload = {
                type: "about",
                content: content,
            };

            const res = await axios.patch("/rule/about", payload);

            if (res.data.success) {
                message.success("تم تحديث البيانات بنجاح");
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
                <h3 className="text-3xl text-primary font-semibold">عن التطبيق</h3>
            </div>

            {/* Editor */}
            <div className="jodit-rtl-container">
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
                    onClick={saveAboutData}
                >
                    حفظ التغييرات
                </Button>
            </div>
        </div>
    );
};

export default About;