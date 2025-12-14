import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button, message } from "antd";
import axios from "../../utils/axiosInstance"; 

const About = () => {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const config = {
        readonly: false,
        placeholder: "Start typing...",
        style: {
            height: 400,
            background: "white",
        },
    };

    const fetchAboutData = async () => {
        try {
            const res = await axios.get("/rule/about");
            if (res.data?.data?.content) {
                setContent(res.data.data.content);
            }
        } catch (error) {
            console.error(error);
            message.error("Failed to load privacy policy");
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
                message.success("About updated successfully!");
            } else {
                message.error("Failed to update");
            }
        } catch (error) {
            console.error(error);
            message.error("Error updating about information");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white px-4 py-2 rounded-lg pb-10">
            <div className="flex items-center justify-between my-4">
                <h3 className="text-3xl text-primary font-semibold">About</h3>
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
                    onClick={saveAboutData}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default About;