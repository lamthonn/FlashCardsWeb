import { h } from "vue";
import { 
    UserOutlined,
    HomeOutlined,
    LogoutOutlined,
    ReadOutlined ,
    WechatOutlined,
    ContactsOutlined,
    SettingOutlined ,
    TeamOutlined 
   } from "@ant-design/icons-vue";
import axios from "axios";

const menuAdminDefaut = [
    
    //trang chủ
    {
        key: 'TrangChu',
        icon: () => h(HomeOutlined ),
        label: 'Trang chủ',
        title: 'Trang chủ',
    },
    //quản lý user
    {
        key: 'QuanLyUser',
        icon: () => h(TeamOutlined  ),
        label: 'Quản lý người dùng',
        title: 'Quản lý người dùng',
    },
    //cài đặt
    {
        key: 'CaiDat',
        icon: () => h(SettingOutlined ),
        label: 'Cài đặt',
        title: 'Cài đặt',
    },
    //đăng xuất
    {
        key: 'DangXuat',
        icon: () => h(LogoutOutlined ),
        label: 'Đăng xuất',
        title: 'Đăng xuất',
    },

]

export default menuAdminDefaut;