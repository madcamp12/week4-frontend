import React, { useEffect } from "react";
import { Loading } from "../components/Intro/Loading";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../actions/userAction";
import { Cookies } from "react-cookie";

function KakaoLogin(){
    const dispatch = useDispatch();
    const queryParameters = new URLSearchParams(window.location.search)
    const code = queryParameters.get("code")

    const loginRequest = async () => {
        if(code){
            const data = {
                redirect_uri: 'http://localhost:3000/login',
                code: code
            };

            axios.post('https://madcamp.dhki.kr/users/login/kakao', data) // login request
                .then(response => {
                    if(response.status == 200){
                        const {login, token, user_name, avatar_url} = response.data;

                        if(login != true){
                            alert('error');
                            window.location.href = '/intro';
                        }

                        const cookie = new Cookies();
                        cookie.set('token', token, { expires: new Date(Date.now() + 20 * 60 * 60 * 1000) });

                        // inform to redux : success login !!
                        dispatch(loginSuccess(user_name, avatar_url));
                    }
                })
                .catch(error => {
                    alert(error);
                    window.location.href = '/intro';
                })
        }else{ // there's no authentication code?
            window.location.href = '/intro';
        }
    }

    useEffect(() => {
        loginRequest();
    }, [])

    return(
        // 로그인이 되는 동안.. 대기 화면..
        <Loading/>
    )
}

export default KakaoLogin;