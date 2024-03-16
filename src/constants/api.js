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

    //học phần
    THEM_HOC_PHAN:`${localPath}/api/HocPhan/ThemHocPhan`
}
export default apiUrl;