import { BiCategory } from 'react-icons/bi';
import { TSidebarItem } from './generateSidebarItems';
import {  AiOutlineDollarCircle, AiOutlineQuestionCircle, AiOutlineStar } from 'react-icons/ai';
import { IoBarChartOutline } from 'react-icons/io5';
import { TbLogout, TbMessage2Check } from 'react-icons/tb';
import { CiViewList } from 'react-icons/ci'; 
import { PiBuildingOffice } from 'react-icons/pi';
import { BsExclamationOctagon } from 'react-icons/bs';

const sidebarItems: TSidebarItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '',
        icon: <IoBarChartOutline size={24} />,
    },
    // {
    //     key: 'users',
    //     label: 'User Management',
    //     path: 'users',
    //     icon: <HiOutlineUserGroup size={24} />,
    // },
    {
        key: 'categories',
        label: 'Categories',
        path: 'categories',
        icon: <CiViewList size={24} />,
    },
    {
        key: 'hadith',
        label: 'Hadith',
        path: 'hadith',
        icon: <BiCategory size={24} />,
    },

    // {
    //     key: 'booking-history',
    //     label: 'Booking History',
    //     path: 'booking-history',
    //     icon: <TbMessage2Check size={24} />,
    // },
    // {
    //     key: 'reviews',
    //     label: 'Reviews',
    //     path: 'reviews',
    //     icon: <AiOutlineStar size={24} />,
    // },
    {
        key: 'companies',
        label: 'Daily Hadith',
        path: 'companies',
        icon: <PiBuildingOffice size={24} />,
    },
    // {
    //     key: 'why-choose',
    //     label: 'Why Choose',
    //     path: 'why-choose',
    //     icon: <BsExclamationOctagon size={24} />,
    // },
    // {
    //     key: 'transactions',
    //     label: 'Transactions',
    //     path: 'transactions',
    //     icon: <AiOutlineDollarCircle size={24} />,
    // },
    // {
    //     key: 'add-admin',
    //     label: 'Add Admin',
    //     path: 'make-admin',
    //     icon: <BsPersonGear size={24} />,
    // },
    // {
    //     key: 'terms',
    //     label: 'Terms & Conditions',
    //     path: 'terms',
    //     icon: <AiOutlineFileText size={24} />,
    // },
    // {
    //     key: 'privacy',
    //     label: 'privacy policy',
    //     path: 'privacy',
    //     icon: <AiOutlineFileText size={24} />,
    // },
    {
        key: 'faqs',
        label: 'Seetings',
        path: 'faqs',
        icon: <AiOutlineQuestionCircle size={24} />,
    },
    {
        key: 'logout',
        label: 'Log Out',
        path: 'login',
        icon: <TbLogout size={24} />,
    },
];

export default sidebarItems;
