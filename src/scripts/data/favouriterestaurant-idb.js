import { openDB } from 'idb';
import CONFIG from '../global/config';

const dbPromise = openDB(CONFIG.DATABASE_NAME, CONFIG.DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(CONFIG.OBJECT_STORE_NAME, {
      keyPath: 'id',
    });
  },
});

const FavouriteRestaurantDB = {
  async getRestaurant(id) {
    const restaurant = (await dbPromise).get(CONFIG.OBJECT_STORE_NAME, id);
    return restaurant;
  },

  async getAllRestaurants() {
    return (await dbPromise).getAll(CONFIG.OBJECT_STORE_NAME);
  },

  async putRestaurant(restaurant) {
    return (await dbPromise).add(CONFIG.OBJECT_STORE_NAME, restaurant);
  },

  async updateRestaurant(restaurant) {
    return (await dbPromise).put(CONFIG.OBJECT_STORE_NAME, restaurant);
  },

  async deleteRestaurant(id) {
    return (await dbPromise).delete(CONFIG.OBJECT_STORE_NAME, id);
  },
};

export default FavouriteRestaurantDB;
