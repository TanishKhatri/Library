"use strict";

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
  this.id = crypto.randomUUID();
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

Book.prototype.getId = function() {
    return this.id;
}

Book.prototype.setHasBeenRead = function (hasBeenRead) {
    this.hasBeenRead = hasBeenRead;
}

function addBookToLibrary(title, author, pages, hasBeenRead) {
    let book = new Book(title, author, pages, hasBeenRead);
    myLibrary.push(book);
}

async function searchBook(book, bookElement) {
    const title = book.getTitle();
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;

    const response = await fetch(url);
    const data = await response.json();

    // Check if any results
    if (data.docs.length > 0) {
        const firstResult = data.docs[0];
        if (firstResult.cover_i) {
            const coverId = firstResult.cover_i;
            const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
            let loadingIcon = bookElement.querySelector(".initial-loading-icon");
            loadingIcon.classList.remove("initial-loading-icon");
            loadingIcon.classList.add("loading-icon");
            const img = new Image();
            img.src = coverUrl;
            img.onload = () => {
                bookElement.style.backgroundImage = "url(" + coverUrl + ")";
                loadingIcon.classList.add("content-loaded");
            }

        } else {
            document.createElement("div");
            bookElement.innerText = book.getTitle(); 
        }
    } else {
        document.createElement("div");
        bookElement.innerText = book.getTitle();
    }
}


function activateDialogBox() {
    let dialog = document.querySelector(".new-book-dialog");
    let newBookHeader = document.querySelector(".header .new-book");
    let newBookGridElement = document.querySelector(".book-grid .add-new-book");
    let submitButton = document.querySelector(".new-book-dialog .submit-button");
    let closeButton = document.querySelector(".new-book-dialog .close");
    
    newBookHeader.addEventListener("click", () => {
        dialog.showModal();
    });

    newBookGridElement.addEventListener("click", () => {
        dialog.showModal();
    });

    submitButton.addEventListener("click", (e) => {
        let title = document.querySelector(".new-book-dialog #title");
        let author = document.querySelector(".new-book-dialog #author");
        let pages = document.querySelector(".new-book-dialog #pages");
        let hasBeenRead = document.querySelector(".new-book-dialog #hasBeenRead");
        addBookToLibrary(title.value, author.value, pages.value, hasBeenRead.checked);
        console.log(myLibrary[0]);
        dialog.close();
    })

    closeButton.addEventListener("click", () => {
        dialog.close();
    })
}

// function updateGrid() {
//     myLibrary.forEach((book) => {
//         book
//     })
// }
addBookToLibrary("An Absolutely Remarkable Thing", "Hank Green", 734, true);
let protoBook = document.querySelector(".book-grid .book");
searchBook(myLibrary[0], protoBook);
activateDialogBox();