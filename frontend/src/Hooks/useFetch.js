import { useNavigate } from "react-router-dom";
import { getToken } from "../Cookies/cookies";
import { useEffect, useState } from "react";

export default function useFetch(endpoint, method = "GET", body = undefined, headers = undefined) {
    const navigate = useNavigate();
    const token = getToken();
    const [data, setData] = useState(null);
    
    if (token == null){
        navigate("/login");
    }

    if (!endpoint.startsWith("/")){
        endpoint = "/" + endpoint;
    }

    useEffect(() => {
        if (data){
            return;
        }

        fetch(`${endpoint}`, {method: method, body: body, headers: {...headers, "Authorization": "Bearer " + token}})
        .then(response => {
            if (response.status === 401 || response.status === 403){
                navigate("/login");
            }

            if (response.status >= 200 && response.status <= 299){
                return response.json();
            }
        }) 
        .then(data => {
            setData(data);
        })
    }, [body, data, endpoint, headers, method, navigate, token]);
    
    return data;
}
