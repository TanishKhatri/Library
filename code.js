const myLibrary = [];

// Here, author, title = String, numberOfPages = int and hasBeenRead = boolean , 
// rating should be a number between 1 and 10
function Book(author, title, numberOfPages, hasBeenRead, rating) {
    if (!new.target) {
        throw Error("This function is intended to only be used with the new keyword");
    }
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.hasBeenRead = hasBeenRead;
    this.rating = rating;
    this.id = crypto.randomUUID();
}

// Add the book to the library
function addBookToLibrary(author, title, numberOfPages, hasBeenRead, rating) {
    newBook = new Book(author, title, numberOfPages, hasBeenRead, rating);
    myLibrary.push(newBook);
}

