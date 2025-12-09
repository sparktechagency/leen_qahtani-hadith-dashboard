const BASE_URL = import.meta.env.VITE_API_URL_IMAGE;
export const getImageUrl = (path?: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;  
    return `${BASE_URL}${path}`;
};