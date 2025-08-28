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

Book.prototype.toggleRead = function() {
    this.hasBeenRead = !this.hasBeenRead;
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
    let loadingIcon = bookElement.querySelector(".loading-icon");
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;

    const response = await fetch(url);
    const data = await response.json();

    // Check if any results
    if (data.docs.length > 0) {
        const firstResult = data.docs[0];
        if (firstResult.cover_i) {
            const coverId = firstResult.cover_i;
            const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
            const img = new Image();
            img.src = coverUrl;
            img.onload = () => {
                bookElement.style.backgroundImage = "url(" + coverUrl + ")";
                loadingIcon.classList.add("content-loaded");
                loadingIcon.classList.remove("loading-icon");
            }

        } else {
            loadingIcon.classList.add("content-loaded");
            loadingIcon.classList.remove("loading-icon");
            document.createElement("div");
            bookElement.innerText = book.getTitle(); 
        }
    } else {
        loadingIcon.classList.add("content-loaded");
        loadingIcon.classList.remove("loading-icon");
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
        addBookToGrid(myLibrary[myLibrary.length -  1]);
        title.value = "";
        author.value = "";
        pages.value = "";
        hasBeenRead.checked = false;
        dialog.close();
    })

    closeButton.addEventListener("click", () => {
        dialog.close();
    })
}

function addBookToGrid(book) {
    let bookGrid = document.querySelector(".book-grid");
    let hasBeenRead = book.getHasBeenRead();
    let id = book.getId();

    let newBook = document.createElement("div");
    newBook.classList.add("book");
    let loadingIcon = document.createElement("div");
    loadingIcon.classList.add("loading-icon");
    loadingIcon.innerHTML = `<svg fill="#000000" height="40px" width="40px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 32 32" xml:space="preserve">
                    <g>
                        <path d="M16,1c-0.6,0-1,0.4-1,1v5c0,0.6,0.4,1,1,1s1-0.4,1-1V2C17,1.4,16.6,1,16,1z"/>
                        <path d="M11.6,2.7c-0.2-0.5-0.8-0.8-1.3-0.5C9.7,2.4,9.5,2.9,9.7,3.4l1.9,4.6c0.2,0.4,0.5,0.6,0.9,0.6c0.1,0,0.3,0,0.4-0.1
                            c0.5-0.2,0.8-0.8,0.5-1.3L11.6,2.7z"/>
                        <path d="M8.9,10.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L6.8,5.4C6.4,5,5.8,5,5.4,5.4s-0.4,1,0,1.4
                            L8.9,10.3z"/>
                        <path d="M2.7,11.6l4.6,1.9c0.1,0.1,0.3,0.1,0.4,0.1c0.4,0,0.8-0.2,0.9-0.6c0.2-0.5,0-1.1-0.5-1.3L3.4,9.7c-0.5-0.2-1.1,0-1.3,0.5
                            C1.9,10.8,2.2,11.4,2.7,11.6z"/>
                        <path d="M8,16c0-0.6-0.4-1-1-1H2c-0.6,0-1,0.4-1,1s0.4,1,1,1h5C7.6,17,8,16.6,8,16z"/>
                        <path d="M8.6,19.1c-0.2-0.5-0.8-0.8-1.3-0.5l-4.6,1.9c-0.5,0.2-0.8,0.8-0.5,1.3c0.2,0.4,0.5,0.6,0.9,0.6c0.1,0,0.3,0,0.4-0.1
                            l4.6-1.9C8.6,20.2,8.8,19.6,8.6,19.1z"/>
                        <path d="M10.3,21.7c-0.4-0.4-1-0.4-1.4,0l-3.5,3.5c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l3.5-3.5
                            C10.7,22.7,10.7,22,10.3,21.7z"/>
                        <path d="M12.9,23.4c-0.5-0.2-1.1,0-1.3,0.5l-1.9,4.6c-0.2,0.5,0,1.1,0.5,1.3c0.1,0.1,0.3,0.1,0.4,0.1c0.4,0,0.8-0.2,0.9-0.6
                            l1.9-4.6C13.7,24.2,13.4,23.6,12.9,23.4z"/>
                        <path d="M16,24c-0.6,0-1,0.4-1,1v5c0,0.6,0.4,1,1,1s1-0.4,1-1v-5C17,24.4,16.6,24,16,24z"/>
                        <path d="M20.4,23.9c-0.2-0.5-0.8-0.8-1.3-0.5c-0.5,0.2-0.8,0.8-0.5,1.3l1.9,4.6c0.2,0.4,0.5,0.6,0.9,0.6c0.1,0,0.3,0,0.4-0.1
                            c0.5-0.2,0.8-0.8,0.5-1.3L20.4,23.9z"/>
                        <path d="M23.1,21.7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l3.5,3.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4
                            L23.1,21.7z"/>
                        <path d="M29.3,20.4l-4.6-1.9c-0.5-0.2-1.1,0-1.3,0.5c-0.2,0.5,0,1.1,0.5,1.3l4.6,1.9c0.1,0.1,0.3,0.1,0.4,0.1
                            c0.4,0,0.8-0.2,0.9-0.6C30.1,21.2,29.8,20.6,29.3,20.4z"/>
                        <path d="M30,15h-5c-0.6,0-1,0.4-1,1s0.4,1,1,1h5c0.6,0,1-0.4,1-1S30.6,15,30,15z"/>
                        <path d="M23.4,12.9c0.2,0.4,0.5,0.6,0.9,0.6c0.1,0,0.3,0,0.4-0.1l4.6-1.9c0.5-0.2,0.8-0.8,0.5-1.3c-0.2-0.5-0.8-0.8-1.3-0.5
                            l-4.6,1.9C23.4,11.8,23.2,12.4,23.4,12.9z"/>
                        <path d="M21.7,10.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l3.5-3.5c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-3.5,3.5
                            C21.3,9.3,21.3,10,21.7,10.3z"/>
                        <path d="M19.1,8.6c0.1,0.1,0.3,0.1,0.4,0.1c0.4,0,0.8-0.2,0.9-0.6l1.9-4.6c0.2-0.5,0-1.1-0.5-1.3c-0.5-0.2-1.1,0-1.3,0.5l-1.9,4.6
                            C18.3,7.8,18.6,8.4,19.1,8.6z"/>
                    </g>
                </svg>`
    newBook.appendChild(loadingIcon);
    newBook.setAttribute("data-id", id);
    searchBook(book, newBook);
    let emptyBookAdder = document.querySelector(".add-new-book");
    bookGrid.insertBefore(newBook, emptyBookAdder);
}

activateDialogBox();
updateGrid();
