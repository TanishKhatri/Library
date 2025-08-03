const myLibrary = [];

// Here, author, title = String, numberOfPages = int and hasBeenRead = boolean 
function Book(author, title, numberOfPages, hasBeenRead) {
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.hasBeenRead = hasBeenRead;
    this.id = crypto.randomUUID();
}

// Add the book to the library
function addBookToLibrary(author, title, numberOfPages, hasBeenRead) {
    newBook = new Book(author, title, numberOfPages, hasBeenRead);
    myLibrary.push(newBook);
}

