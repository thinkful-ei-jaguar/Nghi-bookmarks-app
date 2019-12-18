//const STORE = {bookmarks: []};
const bookmarks = [];

function addBookmark(item) {
  // Add bookmark to STORE
  this.bookmarks.push(item);
  // Create expanded view property to false
  this.bookmarks[this.bookmarks.length-1].expanded = false;
}

function setStoreProperties() {
  // Set store default properties if haven't already
  let hasDefaultProperties = Object.prototype.hasOwnProperty.call(this, 'filter');
  if(!hasDefaultProperties) {
    this.adding = false;
    this.error = null;
    this.filter = 0;
  }
}

/**
 * 
 * @param {string} id 
 */
function removeBookmark(id) {
  // Remove bookmark from STORE
  this.bookmarks.splice(this.bookmarks.findIndex(element => element.id === id), 1);
}

/**
 * filtered parameter ranges from 0-5
 * @param {number} filter 
 */
function filterStore(filter) {
  // Set filter property
  this.filter = filter;
}

export default {
  bookmarks,
  addBookmark,
  setStoreProperties,
  removeBookmark,
  filterStore
};