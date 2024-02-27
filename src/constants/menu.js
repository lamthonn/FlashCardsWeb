import { h } from "vue";
import { 
    UserOutlined,
    HomeOutlined,
    LogoutOutlined 
   } from "@ant-design/icons-vue";

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
    {
        key: 'TrangChu',
        icon: () => h(HomeOutlined ),
        label: 'Trang chủ',
        title: 'Trang chủ',
    },
    {
        key: 'DangXuat',
        icon: () => h(LogoutOutlined ),
        label: 'Đăng xuất',
        title: 'Đăng xuất',
    },

]

export default menuDefaut;