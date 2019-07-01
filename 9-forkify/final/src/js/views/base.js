// ****************************** Getting a pointer to DOM nodes in one place --- expensive operation --- also easy maintenance ********
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

export const elementStrings = {
    loader: 'loader'
};


// ****** Think of this file as the BASE VIEW for all the other views. Meaning that this file will contain functions that 
//        other views need. For example rendering a spinner and removing it  (AJAX needs) is useful in many views and hence
//        it is coded here.
// ****************************************** Adding a spinner ************************************************************************
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

// ****************************************** Removing a spinner ************************************************************************
export const clearLoader = () => {
    
    // ************** the queryselector has to be done here and not at the top of this file where the other are because ********
    //                there this element does not exist... it is added to the DOM only when the above method is executed.
    //                That is why it needs to be done here. So elements that are created at run time (like the spinner), they 
    //                need to be document.querySelector at the time they are needed .....
    //                **********************************************************************************************************
    const loader = document.querySelector(`.${elementStrings.loader}`);
    
    // **** The only way to delete a node is by asking the parent to remove the child ******************************************
    if (loader) loader.parentElement.removeChild(loader);
};
