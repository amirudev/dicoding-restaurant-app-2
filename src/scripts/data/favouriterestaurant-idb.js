import { openDB } from "idb";
import CONFIG from "../global/config";

const dbPromise = openDB(CONFIG.DATABASE_NAME, CONFIG.DATABASE_VERSION, {
    upgrade(database){
        database.createObjectStore(CONFIG.OBJECT_STORE_NAME, {
            keyPath: 'id',
        });
    }
});

const FavouriteRestaurantDB = {
    async getRestaurant(id){
        if(!id){
            console.log('ID Not Exist')
            return;
        }
        return (await dbPromise).get(CONFIG.OBJECT_STORE_NAME, id);
    },

    async getAllRestaurants(){
        return (await dbPromise).getAll(CONFIG.OBJECT_STORE_NAME);
    },

    async putRestaurant(restaurant){
        console.log('storing database');
        console.log(restaurant);
        return (await dbPromise).add(CONFIG.OBJECT_STORE_NAME, restaurant);  
    },

    async updateRestaurant(restaurant){
        return (await dbPromise).put(CONFIG.OBJECT_STORE_NAME, restaurant);
    },

    async deleteRestaurant(id){
        console.log(`Delete: ${id}`);
        return (await dbPromise).delete(CONFIG.OBJECT_STORE_NAME, id);
    }
}

export default FavouriteRestaurantDB;