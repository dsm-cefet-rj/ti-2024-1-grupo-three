import axios from "axios";




const CreateAxiosInstance = () => {

  return axios.create({
    baseURL: "http://localhost:3004",
  });

  
};


export const getAuthConfig = (token) => ({
  headers: {
    Authorization:`${token}`,
  }
});
  export default CreateAxiosInstance;