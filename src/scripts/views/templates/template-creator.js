import CONFIG from "../../global/config";

const createRestaurantItemTemplate = restaurant => {
    return `<div class="restaurant-item">
    <img src="${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}" alt="Gambar restoran ${restaurant.name}">
    <div class="restaurant-item-city">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <p>${restaurant.rating}</p>
    </div>
    <div class="restaurant-item-detail">
        <h5>${restaurant.name}</h5>
        <p>${restaurant.description.substring(0, 150)}...</p>
        <div class="restaurant-item-detail-info">
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                ${restaurant.city}</p>
        </div>
        <div class="restaurant-item-button-container">
            <a href="./#/detail/${restaurant.id}">Kunjungi Restoran</a>
        </div>
    </div>
</div>`;
}

const createDetailRestaurantItem = restaurant => {
    return `
    <section class="restaurant-detail">
        <div class="detail-main">
            <div class="detail-main__block">
                <img src="${CONFIG.BASE_IMAGE_URL_LARGE + restaurant.pictureId}"></img>
                <div class="main-title">
                    <div>
                        <h2 class="main-title__title">${restaurant.name}</h2>
                        <p class="main-title__location">${restaurant.address}, ${restaurant.city}</p>
                        <div class="main-title__category">
                            <div class="main-title__category-item"></div>
                        </div>
                    </div>
                    <p class="restaurant-rating">Rating: ${restaurant.rating}</p>
                </div>
            </div>
            <div class="main-navigation">
                <ul>
                    <li>
                        <a href="#">About</a>
                        <a href="#">Menu</a>
                        <a href="#">Review</a>
                    </li>
                </ul>
                <div class="main-navigation__love">
                    <ul>
                        <li>
                            <button class="favorite-button active">
                                Favoritkan
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main-content description-container">
                <div class="main-content__block">
                    <h3 class="main-content__title">Deskripsi</h3>
                    <hr>
                    <p>${restaurant.description}</p>
                </div>
                <div class="main-content__block">
                    <h3 class="main-content__title">Menu</h3>
                    <hr>
                    <div class="main-content__menu-container">
                        <div>
                            <p>Foods</p>
                            <ul class="food-list-container">
                                ${createListByArrayForMenu(restaurant.menus.foods)}
                            </ul>
                        </div>
                        <div>
                            <p>Drinks</p>
                            <ul class="drink-list-container">
                                ${createListByArrayForMenu(restaurant.menus.drinks)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-sidebar">
            <div class="main-content__block review">
                <div class="review__review-title">
                    <h3 class="main-content__title">Review</h3>
                </div>
                <hr>
                <div class="review__review-container">
                    ${createReviewItemList(restaurant.customerReviews)}
                </div>
            </div>
        </div>
    </section>`;
}

const createListByArrayForMenu = items => {
    let lists = '';
    items.forEach(item => {
        lists += `<li>${item.name}</li>`;
    });
    return lists;
}

const createReviewItemList = reviews => {
    let reviewList = '';
    reviews.forEach(review => {
        reviewList += `
        <div class="review__review-item">
            <p class="review__review-item-name">${review.name}</p>
            <p class="review__review-item-review">${review.review} - <span class="review__review-item-review-date">${review.date}</span></p>
        </div>`;
    });

    return reviewList;
}

export { createRestaurantItemTemplate, createDetailRestaurantItem };