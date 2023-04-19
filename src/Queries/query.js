import axios from "axios";

const BASE_API = "https://dog.ceo/api/breeds/image/random";

export async function getPerro(){
    const response = await axios.get(BASE_API);
    return response.data;
    
}
