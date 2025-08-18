const myLibrary = [];

//            string string  int    boolean
function Book(title, author, pages, hasBeenRead) {
  if (!new.target) {
    throw Error("This function is supposed to solely be used with the new Keyword");
  }
  this.title = title;
  this.author = author;
  this.pages =  pages;
  this.hasBeenRead = hasBeenRead;
}

// Getters and Setters for the book
Book.prototype.getTitle = function() {
    return this.title;
}

Book.prototype.setTitle = function (title) {
    this.title = title;
}

Book.prototype.getAuthor = function() {
    return this.author;
}

Book.prototype.setAuthor = function (author) {
    this.author = author;
}

Book.prototype.getPages = function() {
    return this.pages;
}

Book.prototype.setPages = function (pages) {
    this.pages = pages;
}

Book.prototype.getHasBeenRead = function() {
    return this.hasBeenRead;
}

Book.prototype.setHasBeenRead = function (hasBeenRead) {
    this.hasBeenRead = hasBeenRead;
}

function addBookToLibrary(title, author, pages, hasBeenRead) {
    book = new Book(title, author, pages, hasBeenRead);
    myLibrary.push(book);
}

//Tests for getters
/* 
addBookToLibrary("The Way Of Kings", "Brandon Sanderson", 1271, true);
addBookToLibrary("The Wheel of Time", "Robert Jordan", 890, true);
addBookToLibrary("The Strength of The Few", "James Islington", 980, false);

myLibrary.forEach((book) => {
    console.log(book.getTitle());
    console.log(book.getAuthor());
    console.log(book.getPages());
    console.log(book.getHasBeenRead());
})
*/

// async function searchBook(book) {
//     const title = book.getTitle();
//     const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     // Check if any results
//     if (data.docs.length > 0) {
//     const firstResult = data.docs[0];

//     if (firstResult.cover_i) {
//         const coverId = firstResult.cover_i;
//         const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;

//         document.getElementById('coverResult').innerHTML = `
//         <p><strong>${firstResult.title}</strong> by ${firstResult.author_name?.[0] || 'Unknown Author'}</p>
//         <img src="${coverUrl}" alt="Book Cover">
//         `;
//     } else {
//         document.getElementById('coverResult').innerText = 'No cover image found.';
//     }
//     } else {
//         document.getElementById('coverResult').innerText = 'No results found.';
//     }
// }