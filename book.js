let storedBooks = [];
const genre= document.querySelector("#genre-category").value;
const length = document.querySelector("#length-category").value;
const isSeries = document.querySelector("#series-category").value;

async function getBooks() {
    try {
        const response = await fetch("https://bookpicker-backend.onrender.com");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const books = await response.json();
        storedBooks = books;

        const randomBook = getRandomBook(storedBooks);
        console.log(randomBook);

        document.querySelector("#selected-book").innerHTML = 
            randomBook.title + ' By ' + randomBook.author;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
async function getFilteredBooks() {
    const genre= document.querySelector("#genre-category").value;
    const length = document.querySelector("#length-category").value;
    const isSeries = document.querySelector("#series-category").value;

    let minLength, maxLength;
    if (length === 'short') {
        minLength = 0;
        maxLength = 200;
    } else if (length === 'medium') {
        minLength = 201;
        maxLength = 500;
    } else if (length === 'long') {
        minLength = 501;
        maxLength = 2000; 
    } 

    try {
        const response = await fetch(`https://bookpicker-backend.onrender.com/books?genre=${genre}&minLength=${minLength}&maxLength=${maxLength}&isSeries=${isSeries}`)
        const books = await response.json();
        console.log(books)
        console.log(minLength, maxLength, 'book length')
        storedBooks = books;

        const randomBook = getRandomBook(storedBooks);
        console.log(randomBook, 'random book');

        if (storedBooks.length > 0) {
          document.querySelector("#selected-book").innerHTML = 
            randomBook.title + ' By ' + randomBook.author;  
        } else {
            document.querySelector("#selected-book").innerHTML = 'No books found. Try again'
        }
        
    } catch (error) {
        console.error('Error fetching filtered book', error)
    }


}
document.querySelector("#button").addEventListener("click", (e) => {
    e.preventDefault();
        getFilteredBooks();

});

document.querySelector("#lucky").addEventListener("click", (e) => {
    e.preventDefault(); 
    getBooks();
});


function getRandomBook(books) {
    const randomIndex = Math.floor(Math.random() * books.length);
    const selectedBook = books[randomIndex];
    return selectedBook;
}

