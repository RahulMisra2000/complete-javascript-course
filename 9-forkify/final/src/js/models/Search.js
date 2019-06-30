import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;   // ***  When an object of this class is created, it will start out with just one property, this.query ***
    }

    async getResults() {
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            
            // **************** Stores the result in the Search object **************************************************************
            //                  so the Search object will have a new property called this.result after this method has been called
            // **********************************************************************************************************************
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}
