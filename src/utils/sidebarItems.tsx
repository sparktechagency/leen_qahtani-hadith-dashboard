// import { BiCategory } from 'react-icons/bi';
// import { TSidebarItem } from './generateSidebarItems';
// import {  AiOutlineQuestionCircle } from 'react-icons/ai';
// import { IoBarChartOutline } from 'react-icons/io5';
// import { TbLogout } from 'react-icons/tb';
// import { CiViewList } from 'react-icons/ci'; 
// import { PiBuildingOffice } from 'react-icons/pi';

// const sidebarItems: TSidebarItem[] = [
//     {
//         key: 'dashboard',
//         label: 'Dashboard',
//         path: '',
//         icon: <IoBarChartOutline size={24} />,
//     },

//     {
//         key: 'categories',
//         label: 'Categories',
//         path: 'categories',
//         icon: <CiViewList size={24} />,
//     },
//     {
//         key: 'hadith',
//         label: 'Hadith',
//         path: 'hadith',
//         icon: <BiCategory size={24} />,
//     },

//     {
//         key: 'daily-hadith',
//         label: 'Daily Hadith',
//         path: 'daily-hadith',
//         icon: <PiBuildingOffice size={24} />,
//     },


// {
//   key: 'settings',
//   label: <span className="settings-text text-gray-700">Settings</span>, 
//   icon: <AiOutlineQuestionCircle size={24} />,
//   children: [
//     { key: 'about', label: <span className="menu-text">About</span>, path: 'about' },
//     { key: 'privacy', label: <span className="menu-text">Privacy</span>, path: 'privacy' },
//     { key: 'terms', label: <span className="menu-text">Terms</span>, path: 'terms' },
//   ],
// },

//     {
//         key: 'logout',
//         label: 'Log Out',
//         path: 'login',
//         icon: <TbLogout size={24} />,
//     },
// ];

// export default sidebarItems;


import { BiCategory } from 'react-icons/bi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoBarChartOutline } from 'react-icons/io5';
import { TbLogout } from 'react-icons/tb';
import { CiViewList } from 'react-icons/ci'; 
import { PiBuildingOffice } from 'react-icons/pi';
import { TSidebarItem } from './generateSidebarItems'; // Ensure this type exists or remove import if not strict

const sidebarItems: TSidebarItem[] = [
    {
        key: 'dashboard',
        label: 'لوحة التحكم', // Dashboard
        path: '',
        icon: <IoBarChartOutline size={24} />,
    },

    {
        key: 'categories',
        label: 'الفئات', // Categories
        path: 'categories',
        icon: <CiViewList size={24} />,
    },
    {
        key: 'hadith',
        label: 'الحديث', // Hadith
        path: 'hadith',
        icon: <BiCategory size={24} />,
    },

    {
        key: 'daily-hadith',
        label: 'حديث اليوم', // Daily Hadith
        path: 'daily-hadith',
        icon: <PiBuildingOffice size={24} />,
    },

    {
        key: 'settings',
        // Removed explicit span styling to let AntD handle colors
        label: 'الإعدادات', // Settings
        icon: <AiOutlineQuestionCircle size={24} />,
        children: [
            { key: 'about', label: 'عن التطبيق', path: 'about' }, // About
            { key: 'privacy', label: 'سياسة الخصوصية', path: 'privacy' }, // Privacy
            { key: 'terms', label: 'الشروط والأحكام', path: 'terms' }, // Terms
        ],
    },

    {
        key: 'logout',
        label: 'تسجيل الخروج', // Log Out
        path: 'login',
        icon: <TbLogout size={24} style={{ transform: 'scaleX(-1)' }} />, // Flips the icon to point left (exit)
    },
];

export default sidebarItems;