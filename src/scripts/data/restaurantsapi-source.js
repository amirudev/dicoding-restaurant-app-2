import API_ENDPOINT from "../global/api-endpoint";

class RestaurantApiSource {
    static async restaurantList(){
        const response = await fetch(API_ENDPOINT.RESTAURANTS);
        const responseJson = await response.json();
        return responseJson;
    }

    static async detailRestaurant(id){
        const response = await fetch(API_ENDPOINT.RESTAURANT_DETAIL(id));
        const responseJson = await response.json();
        return responseJson;
    }
}

export default RestaurantApiSource;