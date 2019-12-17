import $ from 'jquery';

import api from './api';
import store from './store';

//------------------------------------View
function bookmarkHTML(element) {
  // Create HTML template for each bookmark
  let rate;
  let desc;
  // If bookmark has rating/description, create string
  element.rating !== null ? rate = `<span class="js-rating">${element.rating}</span>` : rate = '';
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
              <button type="click" class="js-remove">Remove</button>
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
      data.forEach((element) => {
        store.addBookmark(element);
      });
      // Set store default properties if haven't done so already
      store.setStoreProperties();
      render();
    });
}

function generateHTML(bookmarkList) {
  // Create bookmark view to show on page
  let htmlArray = bookmarkList.map((element) => 
    bookmarkHTML(element));
  const htmlString = htmlArray.join('');
  return htmlString;
}

function expandView(id) {
  // Change bookmark view
  store.STORE.bookmarks.map((element) =>{
    if(element.id === id){
      element.expanded = !element.expanded;
    }
  });
}

function findBookmark(item) {
  // Get bookmark ID
  return $(item).attr('id');
}

function expandViewEventHandler() {
  // Listen to when user clicks on bookmark for details
  $('.js-bookmark-list').on('click', '.js-bookmark-item', function(event) {
    event.stopPropagation();
    let id = findBookmark(event.currentTarget);
    expandView(id);
    render();
  });
}


//------------------------------------Filter

function filterEventHandler() {
  // Listen to when user selected a filter
  $('#filter').change( function() {
    let filter = $(this).val();
    store.filterStore(filter);
    render();
  });
}

//------------------------------------ADD
function toggleForm() {
  // Show/hide the add bookmark page
  $('.frontPage').toggleClass('hide');
  $('form').toggleClass('hide');
  // Reset form
  $('form').trigger('reset');
}

function showFormEventHandler() {
  // Listen to when user wants to add bookmark
  $('.js-add-button').on('click', function(event) {
    event.preventDefault();
    toggleForm();
  });
}

function cancelFormEventHandler() {
  // Listen to when user cancels form
  $('.js-cancel').on('click', function(event) {
    event.preventDefault();
    toggleForm();
    render();
  });
}

function convertToObject(data) {
  // Convert form data to JS object
  const newBookmark = new FormData(data);
  const jsObject = {};
  newBookmark.forEach((val,name) => jsObject[name] = val);
  return jsObject;
}

function addBookmark(form) {
  // Add bookmark to api and store
  const jsonObject = convertToObject(form);
  api.addBookmark(jsonObject)
    .then((res) => {
      store.addBookmark(res);
      render();
      toggleForm();
    })
    .catch((error) => {
      console.log(error);
    });
}

function addBookmarkEventHandler() {
  // Add bookmark to API and store
  $('form').submit(function(event) {
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
  // Listen to when use click remove bookmark
  $('.js-bookmark-list').on('click', '.js-remove', function(event) {
    event.preventDefault();
    removeBookmark(event.currentTarget);
    render();
  });
}

//------------------------------------Listening/Render Functions
function activeEventHandlers() {
  filterEventHandler();
  showFormEventHandler();
  expandViewEventHandler();
  cancelFormEventHandler();
  addBookmarkEventHandler();
  removeBookmarkEventHandler();
}

function render() {
  // Rerender bookmark list
  let database = store.STORE;
  // Show filtered item if filter is selected
  if(database.filter !== 0) {
    database.bookmarks = database.bookmarks.filter(element =>
      element.rating >= database.filter);
  }
  console.log(store.STORE);
  let bookmarkersHTML = generateHTML(database.bookmarks);
  $('.js-bookmark-list').html(bookmarkersHTML);
}

export default {
  activeEventHandlers,
  render,
  updateList
};