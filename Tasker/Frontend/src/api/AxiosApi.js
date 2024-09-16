import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, 
    withCredentials: true, 
});

api.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        //return error.response
    }
)

api.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>
    {
        const originalRequest = error?.config;
        if (error?.response?.status === 401 && !originalRequest._retry) 
        {
            try{
                api.post('/user/refreshToken',{}, {withCredentials:true})
                .then(res =>{
                    const newAccessToken = res.data.accessToken;
                    localStorage.setItem('accessToken', newAccessToken);
                    originalRequest.headers.Authorization=`Bearer ${newAccessToken}`;
                    originalRequest._retry=true

                    return api(originalRequest)
                })
                .catch(err=>{
                    console.log(err)
                })

            }
            catch(err){
                console.log('Refresh token failed', err);
                window.location.href = '/login';
                return err
            }
        }
        else
            return error
    }
);

export default api