document.getElementById('myForm').addEventListener('submit', saveBookmark);
function clearText()
{
  var siteName = document.getElementById('siteName').value=""
  var siteUrl = document.getElementById('siteUrl').value=""

}

function saveBookmark(e) {
  var siteName = document.getElementById('siteName').value
  var siteUrl = document.getElementById('siteUrl').value
  if(!validateForm(siteName,siteUrl))
  {
    alert("Please enter the valid details")
    return false;
  }
  var books = {
    name: siteName,
    url: siteUrl

  }
  console.log(books);
  //test if bookmarks is null
  if (localStorage.getItem('bookmarks') == null) {
    //init array
    var bookmarks = [];
    bookmarks.push(books);
    //console.log(bookmarks)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(books);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  e.preventDefault()
  fatchBookmarks();
  var siteName = document.getElementById('siteName').value=""
  var siteUrl = document.getElementById('siteUrl').value=""

}
// to delete bookmarks
function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  // reset back to bookmarksResults
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

  // refaatch bookmarks
  fatchBookmarks();
}

//to fatch bookmarks
function fatchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  console.log(bookmarks);

  //to get output id

  var bookmarksResults = document.getElementById('bookmarksResults')
  bookmarksResults.innerHTML = ""
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class="well">' +
      '<h3>' + name +
      '<a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' +
      '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger"  href="#">Delete</a>' +
      '</h3>' +
      '</div>';
  }
}

function validateForm(siteName,siteUrl)
{
  var pat = /[https][http]/
  //check condition id data are empty
  if(!siteName || !siteUrl)
  {
    alert('Please enter the site name or url');
    clearText();
    return false;
  }
  if(!pat.test(siteUrl))
  {

    alert("please enter correct url");
    clearText();
    return false;
  }
  return true;
}
