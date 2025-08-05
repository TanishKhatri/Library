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

async function searchBook(title, imgBox) {

    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    // Check if any results
    if (data.docs.length > 0) {
        const firstResult = data.docs[0];

        if (firstResult.cover_i) {
            const coverId = firstResult.cover_i;
            const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
            const img = document.createElement("img");
            img.src = coverUrl;
            imgBox.appendChild(img);

        } else {
            console.log("coverid not found");
            const img = document.createElement("img");
            img.src = "images/image-not-found.png";
            imgBox.appendChild();
        }
    } else {
        console.log("Search returned empty handed");
        const img = document.createElement("img");
        img.src = "images/image-not-found.png";
        imgBox.appendChild();
    }
}
