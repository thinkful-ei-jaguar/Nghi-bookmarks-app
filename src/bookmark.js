import $ from 'jquery';

import api from './api';
import store from './store';

//------------------------------------View
function bookmarkHTML(element) {
  // Create HTML template for each bookmark
  // Create condense view if expanded property is false
  if(element.expanded === false){
    return `<li class="js-bookmark-item">
          <span class="js-title">${element.title}</span>
          <span class="js-rating">${element.rating}</span>
      </li>`;
  }
  // Create expanded view if expanded property is true
  return `<li class="js-bookmark-item">
          <section class="js-bookmark-header">
              <span class="js-title">${element.rating}</span>
              <button class="js-remove"></button>
          </section>
          </section class="js-bookmark-detail">
              <button class='js-visit-page'>Visit Page</button>
              <span class="js-rating">${element.rating}</span>
              <p class="js-description">${element.desc}</p>
          </section>
      </li>`;
}

function updateList() {
  // Get bookmark list from API
  api.viewList()
    .then(
      data => {
        // Push bookmarks to store
        data.forEach((element) => {
          store.STORE.bookmarks.push(element);
          // Create html string for all bookmarks
          // bookmarkHTMLString(bookmarkHTML(element));
        });
        // Set expand property for each bookmark to false if hasn't already set yet
        store.setExpandProperty();
      }
    );
}

function generateHTML(bookmarkList) {
  // Print bookmarks to the page
  let htmlArray = bookmarkList.map((element) => 
    bookmarkHTML(element));
  const htmlString = htmlArray.join('');
  console.log(htmlString);
  debugger;
  return htmlString;
}

function expandView(e) {
  // Show bookmark details
  $('e > .js-close-view').toggleClass('hide');
  $('e > .js-bookmark-detail').toggleClass('hide');
}

function expandViewEventHandler() {
  // Listen to when user clicks on bookmark for details
  $('.js-bookmark-list').on('click', '.js-bookmark-item', function(event) {
    event.stopPropagation();
    expandView(event.currentTarget);
    render();
  });
}

//------------------------------------Filter
function showFilter() {
  // Filters out results
}

function filterEventHandler() {
  // 
}




//------------------------------------ADD
function showForm() {
  // Show the form to add bookmark
  $('.frontPage').addClass('hide');
  $('form').removeClass('hide');
}

function showFormEventHandler() {
  // Listen to when user wants to add bookmark
  $('.js-add-button').on('click', function(event) {
    event.preventDefault();
    showForm();
  });
}

function cancelForm() {
  // Reset and hide form
  $('.frontPage').removeClass('hide');
  $('form').addClass('hide');
}

function cancelFormEventHandler() {
  // Listen to when user cancels form
  $('.js-cancel').on('click', function(event) {
    event.preventDefault();
    cancelForm();
    render();
  });
}

function convertToJson(data) {
  // Convert JS object to JSON object
  const newBookmark = new FormData(data);
  console.log(newBookmark);
  const jsObject = {};
  newBookmark.forEach((val,name) => jsObject[name] = val);
  return jsObject;
}

function addBookmark(form) {
  // Add bookmark to api and store
  const jsonObject = convertToJson(form);
  api.addBookmark(jsonObject)
    .then((res) => {
      store.addBookmark(res);
      //render();
      console.log(res);
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
    render();
  });
}


//------------------------------------Listening/Render Functions
function activeEventHandlers() {
  //filterEventHandler();
  showFormEventHandler();
  expandViewEventHandler();
  cancelFormEventHandler();
  addBookmarkEventHandler();
}

function render() {
  // Rerender to show filtered results if any
  //if(store.STORE.filter !== 0) {
  //  showFilter();
  //}
  updateList();
  let bookmarks = store.STORE.bookmarks;
  let bookmarkHTML = generateHTML(bookmarks);
  $('.js-bookmark-list').html(bookmarkHTML);
}

export default {
  activeEventHandlers,
  render
};