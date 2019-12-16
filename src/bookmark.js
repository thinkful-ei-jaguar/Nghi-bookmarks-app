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
  debugger;
  $('.frontPage').addClass('hide');
  debugger;
  $('form').removeClass('hide');
  debugger;
}

function showFormEventHandler() {
  // Show form when user wants to add bookmark
  $('.js-add-button').submit(function() {
    //event.defaultPrevented();
    debugger;
    showForm();
  });
}

function addEventHandler() {
  // Show form when users click add bookmark
}

function convertToJson(data) {
  // Convert JS object to JSON object
  const newBookmark = new FormData(data);
  const obj = {};
}


//------------------------------------Listening/Render Functions
function activeEventHandlers() {
  //filterEventHandler();
  debugger;
  showFormEventHandler();
  //addEventHandler();
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