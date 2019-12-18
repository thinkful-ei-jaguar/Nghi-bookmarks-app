import $ from 'jquery';

import api from './api';
import store from './store';

//------------------------------------View
function frontPageHTML(list) {
  // Generate html for front page view
  return `<h1>My Bookmarks</h1>
          <div class="center frontPage">
            <button class="js-add-button" type="submit">+ New</button>
            <select aria-label="filter by rating" name="filter" id="filter">
                <option value="0">Filter By Rating</option>
                <option value="1">1+ Star</option>
                <option value="2">2+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="5">5 Stars</option>
            </select>
          </div>
          <div class="js-list-container">
              <p class="js-total-bookmark"></p>
              <ul class="js-bookmark-list">
              ${list}
              </ul>
          </div>`;
}

function bookmarkHTML(element) {
  // Generate HTML for each bookmark
  let rate;
  let desc;
  // If bookmark has rating/description, create string
  element.rating !== null ? rate = `<span class="js-rating">${element.rating}<img class="starImage" src="https://i7.pngguru.com/preview/792/713/153/star-computer-icons-desktop-wallpaper-clip-art-star.jpg" alt="star rating"/></span>` : rate = '';
  element.desc !== null ? desc = `<p class="js-description">${element.desc}</p>` : desc = '';
  // Create condense view if expanded property is false
  if(element.expanded === false){
    return `<li class="js-bookmark-item" id="${element.id}">
               <span class="js-title">${element.title}</span>
               ${rate}
            </li>`;
  }
  // Create expanded view if expanded property is true
  return `<li>
          <section class="js-bookmark-header">
              <span class="js-title js-bookmark-item" id="${element.id}">${element.title}</span>
              <button type="click" class="js-remove"><img class="js-remove-icon" src="https://icon-library.net/images/trashcan-icon/trashcan-icon-12.jpg" alt="trash can"/></button>
          </section>
          </section class="js-bookmark-detail">
              <button onClick="window.open('${element.url}')" class="js-visit-page">Visit Page</button>
              ${rate}
              ${desc}
          </section>
         </li>`;
}

function updateList() {
  // Get bookmark list from API
  api.viewList()
    .then(data => {
      // Push bookmarks to store
      data.forEach((element) => store.addBookmark(element));
      // Set store default properties if haven't done so already
      store.setStoreProperties();
      render();
    });
}

function generateHTML(bookmarkList) {
  // Generate html string for all bookmarks
  const htmlArray = bookmarkList.map((element) => 
    bookmarkHTML(element));
  // Aggregate the array of strings
  const htmlString = htmlArray.join('');
  return htmlString;
}

function expandView(id) {
  // Change bookmark view
  store.bookmarks.map((element) =>{
    if(element.id === id) element.expanded = !element.expanded;
  });
}

function findBookmark(item) {
  // Get bookmark ID
  return $(item).attr('id');
}

function expandViewEventHandler() {
  // Listen to when user click on bookmark
  $('main').on('click', '.js-bookmark-item', function(event) {
    event.stopPropagation();
    let id = findBookmark(event.currentTarget);
    expandView(id);
    render();
  });
}

//------------------------------------Filter

function filterEventHandler() {
  // Listen to when user select a filter
  $('main').on('change', '#filter', function() {
    // Store filter value
    let filter = $(this).val();
    store.filterStore(filter);
    render();
  });
}

//------------------------------------ADD
function showForm() {
  // Show form to add bookmark
  $('main').html(`<h1>My Bookmarks</h1>
            <form class ="js-add">
              <label for="title">Title</label>
              <input name="title" id="title" placeholder="My Favorite Website" type="text" required>
              <label for="url">URL</label>
              <input name="url" id="url" placeholder="https://www.NghiTranWasHere.com" type="url" pattern="https?://.+" required>
              <label for="desc">Description</label>
              <input name="desc" id="desc" placeholder="Nghi's online journal..." type="text">
              <div class="rate">
                  <label aria-label="rating" for="star5">Rating</label>
                  </br>
                  <input aria-label="1 star" type="radio" id="star1" name="rating" value="1" type="number" required/>
                  <input aria-label="2 star" type="radio" id="star2" name="rating" value="2" type="number" required/>
                  <input aria-label="3 star" type="radio" id="star3" name="rating" value="3" type="number" required/>
                  <input aria-label="4 star" type="radio" id="star4" name="rating" value="4" type="number" required/>
                  <input aria-label="5 star" type="radio" id="star5" name="rating" value="5" type="number" required/>
              </div>
              <div class="js-create-button">
                  <button class="js-cancel" type="reset">Cancel</button>
                  <button class="js-create" type="submit">Create</button>
              </div>
          </form>`);
}

function showFormEventHandler() {
  // Listen to when user want to add bookmark
  $('main').on('click', '.js-add-button', function(event) {
    event.preventDefault();
    showForm();
  });
}

function cancelFormEventHandler() {
  // Listen to when user cancel form
  $('main').on('click', '.js-cancel', function(event) {
    event.preventDefault();
    // Reset form
    $('form').trigger('reset');
    render();
  });
}

function convertToObject(data) {
  // Convert form data to JS object
  const newBookmark = new FormData(data);
  const jsObject = {};
  // Create key/value pair for each for element
  newBookmark.forEach((val,name) => jsObject[name] = val);
  return jsObject;
}

function addBookmark(form) {
  // Add bookmark to api and store
  const jsonObject = convertToObject(form);
  // Generate GET request
  api.addBookmark(jsonObject)
    .then((res) => {
      // Push new bookmark to store
      store.addBookmark(res);
      render();
    })
    .catch((error) => {
      console.log(error);
    });
}

function addBookmarkEventHandler() {
  // Listen to when user submit form
  $('main').on('submit', 'form', function(event) {
    event.preventDefault();
    // Pass form data by reference
    addBookmark(event.currentTarget);
  });
}

//------------------------------------REMOVE
function removeBookmark(item) {
  // Find and delete bookmark from api and store
  const id = $(item).siblings('.js-bookmark-item').attr('id');
  api.removeBookmark(id);
  store.removeBookmark(id);
}

function removeBookmarkEventHandler() {
  // Listen to when user remove bookmark
  $('main').on('click', '.js-remove', function(event) {
    event.preventDefault();
    removeBookmark(event.currentTarget);
    render();
  });
}

//------------------------------------Listening/Render Functions
function activeEventHandlers() {
  // Listening to events
  filterEventHandler();
  showFormEventHandler();
  expandViewEventHandler();
  cancelFormEventHandler();
  addBookmarkEventHandler();
  removeBookmarkEventHandler();
}

function render() {
  // Render bookmark list
  let database = store.bookmarks;
  let filteredItems = [];
  let bookmarkersHTML = '';
  // Show filtered item if filter is selected
  if(store.filter !== 0) {
    filteredItems = database.filter(element =>
      element.rating >= store.filter);
    bookmarkersHTML = generateHTML(filteredItems);
  }
  else{
    bookmarkersHTML = generateHTML(database);
  }
  // Generate page
  $('main').html(frontPageHTML(bookmarkersHTML));
}

export default {
  activeEventHandlers,
  render,
  updateList
};