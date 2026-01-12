import MainLayout from './components/layout/MainLayout';
import { ConfigProvider } from 'antd';
import { Toaster } from "sonner";

function App() {
    return (
        <>
        <Toaster position="top-center" />
            <ConfigProvider
                direction="rtl" 
                theme={{
                    token: {
                        colorPrimary: '#286a25',
                        fontFamily: "'Cairo', 'Montserrat', sans-serif", 
                    },
                    components: {
                        Input: {
                            borderRadius: 5,
                        },
                        Layout: {
                            bodyBg: '#f5f5f5', 
                        }
                    },
                }}
            >
                <MainLayout />
            </ConfigProvider>
        </>
    );
}

export default App;