import RestaurantApiSource from "../../data/restaurantsapi-source";
import UrlParser from "../../routes/url-parser";
import LikeButtonInitiator from "../../utils/like-button-initiator";
import { createDetailRestaurantItem, createLikeButtonTemplate } from "../templates/template-creator";

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
        let restaurant = await RestaurantApiSource.detailRestaurant(url.id);

        if(restaurant.errors){
            alert('Terjadi kesalahan');
        }

        restaurant = restaurant.restaurant;

        const restaurantContainer = document.querySelector("#restaurant");
        restaurantContainer.innerHTML = createDetailRestaurantItem(restaurant);

        const likeButtonContainer = document.querySelector("#restaurant-like-container");
        likeButtonContainer.innerHTML = createLikeButtonTemplate();

        console.log(restaurant);

        LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#restaurant-like-container'),
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                description: restaurant.description,
                city: restaurant.city,
                rating: restaurant.rating,
                pictureId: restaurant.pictureId,
            }
        });
    }
}

export default Detail;