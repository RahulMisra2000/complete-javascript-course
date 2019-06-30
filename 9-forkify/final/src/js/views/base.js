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
    const loader = document.querySelector(`.${elementStrings.loader}`);
    // **** The only way to delete a node is by asking the parent to remove the child *********************************
    if (loader) loader.parentElement.removeChild(loader);
};
