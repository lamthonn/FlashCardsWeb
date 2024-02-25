import { jwtDecode } from "jwt-decode";

const checkTokenExpiration = () => {
    const token = sessionStorage.getItem("Token");
    if(token){
        const data = jwtDecode(token);
        const tokenExpirationTime = data.exp * 1000;
        const currentTime = new Date().getTime();
        console.log(tokenExpirationTime);
        console.log(currentTime);
        if(currentTime >= tokenExpirationTime){
            sessionStorage.removeItem("Token");
            sessionStorage.removeItem("Role");
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("Username");

            return false;
        }
        else{
            return true;
        }
    }
    else{
        return false;
    }
}

export { checkTokenExpiration };