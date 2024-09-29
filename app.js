const myLibrary = [
    new Book("Intermezzo", "Sally Rooney", 350),
    new Book("Mina's Matchbox", "Yoko Ogawa", 233),
    new Book("Health and Safety", "Emily Witt", 453),
];

const newBookDialog = document.querySelector(".add-book-dialog");
const bookForm = document.getElementById("book-form");

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read; // Correctly toggle the read status
};

function addBookToLibrary(title, author, pages) {
    const newBook = new Book(title, author, pages); // Create a new instance
    myLibrary.push(newBook); // Add it to the library
}

function removeBookFromLibrary(bookToRemove) {
    const index = myLibrary.findIndex(
        (book) =>
            book.title === bookToRemove.title &&
            book.author === bookToRemove.author &&
            book.pages === bookToRemove.pages
    );
    if (index > -1) {
        myLibrary.splice(index, 1);
    }
}

function showBookInCard(book) {
    const card = document.createElement("div");
    card.classList.add("book-card");

    const cardTitle = document.createElement("h3");
    cardTitle.textContent = book.title;

    const cardAuthor = document.createElement("p");
    cardAuthor.textContent = "by " + book.author;

    const cardPages = document.createElement("p");
    cardPages.textContent = book.pages + " pages";

    const deleteBook = document.createElement("img");
    deleteBook.src = "assets/cancel.png";
    deleteBook.alt = "Delete";
    deleteBook.classList.add("delete-icon");

    const cardReadStatus = document.createElement("p");
    cardReadStatus.textContent = book.read ? "Read" : "Not Read";
    cardReadStatus.classList.add("read-status");

    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardPages);
    card.appendChild(deleteBook);
    card.appendChild(cardReadStatus);

    deleteBook.addEventListener("click", function (event) {
        event.stopPropagation();
        card.remove();
        removeBookFromLibrary(book);
    });

    card.addEventListener("click", () => {
        book.toggleReadStatus();
        cardReadStatus.textContent = book.read ? "Read" : "Not Read";
    });

    card.addEventListener("mouseenter", () => {
        card.classList.add("card-hover");
    });

    card.addEventListener("mouseleave", () => {
        card.classList.remove("card-hover");
    });

    document.getElementById("card-container").appendChild(card);
}

function showAddNewBookDialog() {
    newBookDialog.showModal();
}

function closeAddNewBookDialog() {
    newBookDialog.close();
}

bookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;

    const newBook = new Book(title, author, pages, false);
    addBookToLibrary(title, author, pages);
    showBookInCard(newBook);
    newBookDialog.close();

    bookForm.reset();
});

myLibrary.forEach(showBookInCard);
