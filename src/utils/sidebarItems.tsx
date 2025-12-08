import { BiCategory } from 'react-icons/bi';
import { TSidebarItem } from './generateSidebarItems';
import {  AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoBarChartOutline } from 'react-icons/io5';
import { TbLogout } from 'react-icons/tb';
import { CiViewList } from 'react-icons/ci'; 
import { PiBuildingOffice } from 'react-icons/pi';

const sidebarItems: TSidebarItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '',
        icon: <IoBarChartOutline size={24} />,
    },

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

    {
        key: 'daily-hadith',
        label: 'Daily Hadith',
        path: 'daily-hadith',
        icon: <PiBuildingOffice size={24} />,
    },

{
  key: 'settings',
  label: <span className="settings-text">Settings</span>,
  icon: <AiOutlineQuestionCircle size={24} />,
  children: [
    { key: 'faqs', label: 'FAQ', path: 'faqs' },
    { key: 'privacy', label: 'privacy', path: 'privacy' },
    { key: 'terms', label: 'terms-conditions', path: 'terms' },
  ],
},
    {
        key: 'logout',
        label: 'Log Out',
        path: 'login',
        icon: <TbLogout size={24} />,
    },
];

export default sidebarItems;
