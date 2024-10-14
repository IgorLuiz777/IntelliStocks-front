import axios from "axios"

export function getProductById(id: number) {

    return axios.get(`http://localhost:8080/product/${id}`)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.error("Failed to get products" + error);
            throw error;
        })

}