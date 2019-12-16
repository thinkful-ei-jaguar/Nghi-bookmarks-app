import $ from 'jquery';

import api from './api';
import store from './store';

//------------------------------------View
function bookmarkHTML(element) {
  // HTML template for each bookmark
  return `<li class="js-bookmark-item">
      <div class="js-close-view">
          <span class="js-title">${element.title}</span>
          <span class="js-rating">${element.rating}</span>
      </div>
      <div class="js-open-view">
          <section class="js-bookmark-header">
              <span class="js-title">${element.rating}</span>
              <button class="js-remove"></button>
          </section>
          </section class="js-bookmark-detail">
              <button class='js-visit-page'>Visit Page</button>
              <span class="js-rating">${element.rating}</span>
              <p class="js-description">${element.description}</p>
          </section>
      </div>
      </li>`;
}

function printList() {
  // Print bookmark list
  api.viewList()
    .then(
      data => {
        // Save to store and append  
        data.array.forEach(element => {
          store.STORE.bookmarks.push(element);
          $('.js-bookmark-list').append(bookmarkHTML(element));
        });
      }
    );
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
    event.defaultPrevented;
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
    event.defaultPrevented;
    cancelForm();
    render();
  });
}

function convertToJson(data) {
  // Convert JS object to JSON object
  console.log(data);
  const newBookmark = new FormData(data);
  
  console.log(newBookmark);
  
  const jsObject = {};
  newBookmark.forEach((val,name) => jsObject[name] = val);
  console.log(jsObject);
  return jsObject;
}

function addBookmark(form) {
  // Add bookmark to api and store
  const jsonObject = convertToJson(form);
  
  api.addBookmark(jsonObject)
    .then((res) => {
      store.addBookmark(res);
      render();
    })
    .catch((error) => {
      console.log(error);
      
    });
}

function addBookmarkEventHandler() {
  // Add bookmark to API and store
  $('form').submit(function(event) {
    event.defaultPrevented;
    // Pass form data by reference
    addBookmark(event.currentTarget);
    render();
  });
}


//------------------------------------Listening/Render Functions
function activeEventHandlers() {
  //filterEventHandler();
  showFormEventHandler();
  cancelFormEventHandler();
  addBookmarkEventHandler();
}

function render() {
  // Rerender to show filtered results if any
  if(store.STORE.filter !== 0) {
    showFilter();
  }
  printList();
}

export default {
  activeEventHandlers,
  printList
};