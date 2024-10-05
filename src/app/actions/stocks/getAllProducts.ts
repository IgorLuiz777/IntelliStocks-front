import axios from "axios"

export function getAllProducts() {

    return axios.get("http://localhost:8080/product")
        .then((response) => {
            const data = response.data;
            return data._embedded.productListResponseList;
        })
        .catch((error) => {
            console.error("Failed to get products" + error);
            throw error;
        })

}