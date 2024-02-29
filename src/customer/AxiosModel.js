import axios from "axios";
const AxiosInstance = (jwt = null) => {
    return axios.create({
        baseURL: 'http://localhost:5050',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    })
}

export default AxiosInstance;