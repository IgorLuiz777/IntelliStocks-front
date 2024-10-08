import axios from "axios";

export function getAllTypeProducts() {

    return axios.get("http://localhost:8080/typeProduct")
        .then((response) => {
            const data = response.data;
            return data.content;
        })
        .catch((error) => {
            console.error("Failed to get type products" + error);
            throw error;
        })

}