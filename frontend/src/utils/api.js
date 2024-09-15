import axios from "axios";




const CreateAxiosInstance = () => {

  return axios.create({
    baseURL: "http://localhost:3004",
  });

  
};
  
  export default CreateAxiosInstance;