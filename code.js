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

function addBookToLibrary(title, author, pages, hasBeenRead) {
    book = new Book(title, author, pages, hasBeenRead);
    myLibrary.push(book);
}