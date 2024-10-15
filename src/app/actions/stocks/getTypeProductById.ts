import axios from "axios";

export function getTypeProductById(id: number) {

    return axios.get(`http://localhost:8080/typeProduct/${id}`)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.error("Failed to get type product id:" + id + error);
            throw error;
        })

}