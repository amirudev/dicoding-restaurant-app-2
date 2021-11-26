import RestaurantApiSource from "../../data/restaurantsapi-source";
import UrlParser from "../../routes/url-parser";
import { createDetailRestaurantItem } from "../templates/template-creator";

const Detail = {
    async render(){
        return `
        <section class="detail-restaurant">
            <div id="restaurant" class="restaurant">
            </div>
            <div id="restaurant-recommendation" class="restaurant-recommendation-container"></div>
        </section>
        `;
    },

    async afterRender(){
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const restaurant = await RestaurantApiSource.detailRestaurant(url.id);
        if(restaurant.errors){
            alert('Terjadi kesalahan');
        }

        const restaurantContainer = document.querySelector("#restaurant");
        restaurantContainer.innerHTML = createDetailRestaurantItem(restaurant.restaurant);
    }
}

export default Detail;