/* eslint-disable no-prototype-builtins */
const STORE = {bookmarks: []};

function addBookmark(item) {
  // Add bookmark to STORE
  STORE.bookmarks.push(item);
  // Create expanded view property to false
  STORE.bookmarks[STORE.bookmarks.length-1].expanded = false;
}

function setStoreProperties() {
  // Set store default properties if haven't already
  if(!STORE.hasOwnProperty('filter')) {
    STORE.adding = false;
    STORE.error = null;
    STORE.filter = 0;
  }
}

function findByID(id) {
  // Find id of bookmark
  return STORE.bookmarks.find(element => element.id === id);
}

function removeBookmark(id) {
  // Remove bookmark from STORE
  STORE.bookmarks.splice(STORE.bookmarks.findIndex(element => element.id === id), 1);
}

function filterStore(filter) {
  STORE.filter = filter;
}

export default {
  STORE,
  addBookmark,
  setStoreProperties,
  findByID,
  removeBookmark,
  filterStore
};