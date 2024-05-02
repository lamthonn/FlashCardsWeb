import { h } from "vue";
import { 
    UserOutlined,
    HomeOutlined,
    LogoutOutlined,
    ReadOutlined ,
    WechatOutlined,
    ContactsOutlined,
    SettingOutlined 
   } from "@ant-design/icons-vue";
import axios from "axios";

const username = sessionStorage.getItem("Username")
const menuDefaut = [
    {
        key: 'user',
        icon: () => h(UserOutlined ),
        label: `${username}` || "undefined",
        title: `${username}` || "undefined",
        children:[
            {
                key: 'HoSo',
                label: "Hồ sơ",
                title: "Hồ sơ",
            },
        ]
    },
    //trang chủ
    {
        key: 'TrangChu',
        icon: () => h(HomeOutlined ),
        label: 'Trang chủ',
        title: 'Trang chủ',
    },
    //thư viện
    {
        key: 'ThuVien',
        icon: () => h(ReadOutlined  ),
        label: 'Thư viện',
        title: 'Thư viện',
        children:[
            {
                key: 'HocPhan',
                label: "Học phần",
                title: "Học phần"
            },
            {
                key: 'ThuMuc',
                label: "Thư mục",
                title: "Thư mục",
            },
        ]
    },
    //đóng góp
    {
        key: 'DongGop',
        icon: () => h(WechatOutlined ),
        label: 'Đặt câu hỏi',
        title: 'Đặt câu hỏi',
    },
    //liên hệ
    {
        key: 'LienHe',
        icon: () => h(ContactsOutlined),
        label: 'Liên hệ',
        title: 'Liên hệ',
    },
    //liên hệ
    {
        key: 'Blog',
        icon: () => h(ContactsOutlined),
        label: 'Blog',
        title: 'Blog',
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

export default menuDefaut;