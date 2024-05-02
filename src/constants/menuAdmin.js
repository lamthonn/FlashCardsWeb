import { h } from "vue";
import { 
    UserOutlined,
    HomeOutlined,
    LogoutOutlined,
    ReadOutlined ,
    WechatOutlined,
    ContactsOutlined,
    SettingOutlined ,
    TeamOutlined,
    CommentOutlined
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
    //quản lý ý kiến đóng góp
    {
        key: 'QuanLyYKienDongGop',
        icon: () => h(CommentOutlined),
        label: 'Quản lý ý kiến đóng góp',
        title: 'Quản lý ý kiến đóng góp',
    },
    //quản lý ý kiến đóng góp
    {
        key: 'QuanLyBlog',
        icon: () => h(CommentOutlined),
        label: 'Quản lý Blog',
        title: 'Quản lý Blog',
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