import axios from "axios"

export function getMovementById(id: number) {

    return axios.get(`http://localhost:8080/product/movements/${id}`)
        .then((response) => {
            const data = response.data;
            return data;
        })
        .catch((error) => {
            console.error("Failed to movement, id:" + id + error);
            throw error;
        })

}