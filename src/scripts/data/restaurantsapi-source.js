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

    static async addNewReview(review){
        if(!review.id || !review.review){
            throw console.error("Review wajib diisi");
        }

        if(!review.name){
            review.name = 'Anonymous';
        }

        const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });
        const responseJson = await response.json();
        return responseJson;
    }
}

export default RestaurantApiSource;