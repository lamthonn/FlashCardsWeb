import app_config from "./config"; 

const localPath = app_config.LOCAL_PATH
const apiUrl = {
    //Authentication
    DANG_NHAP: `${localPath}/api/Auth/Login`,
    DANG_KY_FACEBOOK: `${localPath}/api/Auth/RegisterWithFacebook`,
    DANG_KY: `${localPath}/api/Auth/Register`,
    CHECK_TOKEN_FACEBOOK:`${localPath}/api/Auth/ValidateFacebookToken`,

    //User
    GET_USER_BY_ID:`${localPath}/api/User/GetUserbyId`,
    EDIT_INFOR_USER:`${localPath}/api/User/EditInforUser`,
<<<<<<< HEAD
=======

    //học phần, thẻ học
    THEM_HOC_PHAN:`${localPath}/api/HocPhan/ThemHocPhan`,
    GET_ALL_HOC_PHAN:`${localPath}/api/HocPhan/GetAllHocPhan`,
    GET_THE_HOC:`${localPath}/api/HocPhan/GetTheHocById`,

    //Thư mục
    GET_ALL_THU_MUC:`${localPath}/api/ThuMuc/GetAllThuMuc`,
    THEM_THU_MUC:`${localPath}/api/ThuMuc/ThemThuMuc`,
>>>>>>> 9258527a1a277af29cf9f6a78cb2df5cb1d62c16
}
export default apiUrl;