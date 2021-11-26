import CONFIG from "./config";

const API_ENDPOINT = {
    RESTAURANTS: `${CONFIG.BASE_URL}list`,
    RESTAURANT_DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
}

export default API_ENDPOINT;