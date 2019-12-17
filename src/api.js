const BASE_URL = 'https://thinkful-list-api.herokuapp.com/nghi/bookmarks';

function fetchTemplate(...args) {
  // Fetch template with built in error handling
  let error;
  return fetch(...args)
    .then(res => {
      // If responses are not OK, build error object
      if(!res.OK) {
        error = {code: res.status};
        // If responses is not JSON, add error properties and reject promise
        if(!res.headers.get('content-type').includes('json')) {
          return Promise.reject(error);
        }
      }
      // Convert JSON to JS object
      return res.json();
    });
}

function viewList() {
  // Return list of bookmarks via array
  return fetchTemplate(`${BASE_URL}`);
}

function addBookmark(data) {
  // Add bookmark
  const newBookmark = JSON.stringify(data);
  return fetchTemplate(`${BASE_URL}`,{ 
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: newBookmark
  });
}

function removeBookmark(id) {
  // Remove bookmark
  return fetchTemplate(`${BASE_URL}/${id}`, {method: 'DELETE'});
}

function editBookmark() {
}

export default {
  fetchTemplate,
  viewList,
  addBookmark,
  removeBookmark,
  editBookmark
};