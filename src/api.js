const BASE_URL = 'https://thinkful-list-api.herokuapp.com';

function fetchTemplate(...args) {
  // Fetch template with built in error handling
  let error;
  return fetch(...args)
    .then( res => {
      // If responses are not OK, build error object
      if(!res.OK) {
        error = {code: res.status};
        // If responses is not JSON, add error properties and reject promise
        if(!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      // Convert JSON to JS object
      return res.json();
    })
    .then(jsObject => {
      // If error exists, create objectreject the promise
      if(error) {
        error.message = jsObject.message;
        return Promise.reject(error);
      }
      // Return jsObject if no error
      return jsObject;
    });
}

function viewList() {
  // Return list of bookmarks via array
  return fetchTemplate(`${BASE_URL}/bookmarks`);
}

function removeList(id) {
  // Remove bookmark
  return fetchTemplate(`${BASE_URL}/bookmarks/${id}`, {method: 'DELETE'});
}

function editList() {
}

export default {
  fetchTemplate,
  viewList,
  removeList,
  editList
};