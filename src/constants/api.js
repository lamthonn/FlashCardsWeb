import app_config from "./config"; 

const localPath = app_config.LOCAL_PATH
const apiUrl = {
    //Authentication
    DANG_NHAP: `${localPath}/api/Auth/Login`,
    DANG_KY_FACEBOOK: `${localPath}/api/Auth/RegisterWithFacebook`,
    DANG_KY: `${localPath}/api/Auth/Register`,
    CHECK_TOKEN_FACEBOOK:`${localPath}/api/Auth/ValidateFacebookToken`,
    CHANGED_PASSWORD:`${localPath}/api/Auth/ChangePassword`,
    DELETE_ACCOUNT:`${localPath}/api/Auth/DeleteAccount`,

    //Role
    GET_ALL_ROLE:`${localPath}/api/User/GetAllRole`,

    //User
    GET_USER_BY_ID:`${localPath}/api/User/GetUserbyId`,
    EDIT_INFOR_USER:`${localPath}/api/User/EditInforUser`,
    UPLOAD_AVATAR:`${localPath}/api/User/UploadFile`,
    UPDATE_AVATAR:`${localPath}/api/User/UpdateAvatar`,
    GET_AVATAR:`${localPath}/api/User/GetFile`,
    GET_PAGIN_LIST_USER:`${localPath}/api/User/GetPaginUser`,
    ADD_USER:`${localPath}/api/User/AddUser`,
    EDIT_USER_ADMIN:`${localPath}/api/User/EditInforUser_Admin`,
    DELETE_USER:`${localPath}/api/User/DeleteUser`,
    RESET_PASSWORD:`${localPath}/api/User/ResetPassWord`,
    GET_ALL_USER:`${localPath}/api/User/GetAllUser`,

    //học phần, thẻ học
    THEM_HOC_PHAN:`${localPath}/api/HocPhan/ThemHocPhan`,
    GET_ALL_HOC_PHAN:`${localPath}/api/HocPhan/GetAllHocPhan`,
    GET_THE_HOC:`${localPath}/api/HocPhan/GetTheHocById`,
    GET_HOC_PHAN_BY_ID:`${localPath}/api/HocPhan/HocPhanName`,
    DELETE_HOC_PHAN:`${localPath}/api/HocPhan/DeleteHocPhan`,
    EDIT_HOC_PHAN:`${localPath}/api/HocPhan/EditHocPhan`,
    GET_RANDOM_THE_HOC:`${localPath}/api/HocPhan/GetRandom`,

    //Thư mục
    GET_ALL_THU_MUC:`${localPath}/api/ThuMuc/GetAllThuMuc`,
    THEM_THU_MUC:`${localPath}/api/ThuMuc/ThemThuMuc`,

    //ngon ngu
    GET_ALL_NGON_NGU:`${localPath}/api/Language/GetAllLanguages`,

    // ý kiến góp ý
    GET_ALL_Y_KIEN:`${localPath}/api/YKienGopY/GetAllYKien`,
    GET_Y_KIEN:`${localPath}/api/YKienGopY/GetYKienGopY`,
    THEM_Y_KIEN:`${localPath}/api/YKienGopY/ThemYKien`,
    GET_Y_KIEN_BY_ID:`${localPath}/api/YKienGopY/GetYKienById`,
    DELETE_Y_KIEN:`${localPath}/api/YKienGopY/DeleteYKienById`,
    PHAN_HOI:`${localPath}/api/YKienGopY/PhanHoi`,

    //nhật ký hoạt động
    NHAT_KY_HOAT_DONG:`${localPath}/api/NhatKyHoatDong/GetPaginLog`
}
export default apiUrl;