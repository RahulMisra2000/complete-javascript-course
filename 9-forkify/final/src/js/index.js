import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';



/** ********************************************* Global state of the app *******************************************************
 * - Search object                      // state.search
 * - Current recipe object              // state.recipe
 * - Shopping list object               // state.list
 * - Liked recipes                      // state.likes
 */
const state = {};



/** 
 *************************************************************************  SEARCH CONTROLLER *************************************
 */
/* ************************************* I keep saying TELL below... because this is the controller, it tells the VIEW and the ****
/* ************************************** MODEL to do tasks. These tasks are methods in the VIEW's class and MODEL's class ********
const controlSearch = async () => {
    
     const query = searchView.getInput();                   // 1) *** Tell the VIEW to give information about data on the screen

    if (query) {        
        state.search = new Search(query);                   // 2) *** Tell the MODEL to set itself up

        searchView.clearInput();                            // 3) *** Tell the VIEW to prepare itself for results
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {            
            await state.search.getResults();                // 4) *** Tell the MODEL to get data
               
            clearLoader();                          
            searchView.renderResults(state.search.result);  // 5) *** Tell the VIEW to render results
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
}

/* ************************************* EVENT LISTENERS for the SEARCH related portion  ******************************************
elements.searchForm.addEventListener('submit', e => {
    // ********************************* because the natural consequence of submitting a FORM is to refresh the page ********
    // ********************************* and we want to prevent that, because we are going to use AJAX *****************************
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});
/* ************************************* EVENT LISTENERS for the SEARCH related portion  ******************************************










/** 
 *************************************************************************  RECIPE CONTROLLER *************************************
 */
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );

        } catch (err) {
            console.log(err);
            alert('Error processing recipe!');
        }
    }
};
 
/* **************************************************** EVENT LISTENERS ******************************************************
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
/* **************************************************** EVENT LISTENERS ******************************************************










/** 
 * *********************************************************************  LIST CONTROLLER ***********************************
 */

const controlList = () => {
    // Create a new list IF there in none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}
/* **************************************************** EVENT LISTENERS ******************************************************
// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

   if (e.target.matches('.shopping__delete, .shopping__delete *')) {    // ************* User clicked the delete button **
            state.list.deleteItem(id);                                  // Telling the List Model to delete it an item from it
            
            listView.deleteItem(id);                                    // Telling the listView to delete an item from it
                                                                        // this basically removes the DOM node  (removeChild)
    
    } else if (e.target.matches('.shopping__count-value')) {            // ************ User clicked the step ************
        // ************ The user has clicked the step (up or down) so let's get the value from the screen (aka DOM)
        const val = parseFloat(e.target.value, 10);
        
        // ************ Let us take that value and update the javascript variable
        // Basically, here we are moving the bringing over the user entered data from the screen and into our javascript variable
        // VERY IMPORTANT to see the direction of movement of data here ...
        state.list.updateCount(id, val);
    }
});
/* **************************************************** EVENT LISTENERS ******************************************************












/** 
 * *********************************************************************  LIKE CONTROLLER ***********************************
 */
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);

    // User HAS liked current recipe
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};


/* **************************************************** EVENT LISTENERS ******************************************************
// Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();
    
    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});


// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } 
        // ************************ checks to see if the e.target element has any of these css selectors on it ***********************
        // will be true if the target element has a class called btn_increase attached to it or the target element is a child 
        // element of an element that has class btn-increase attached to it **********************************************************
        else if (e.target.matches('.btn-increase, .btn-increase *')) {    
        
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
});
/* **************************************************** EVENT LISTENERS ******************************************************
