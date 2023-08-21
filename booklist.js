document.addEventListener('DOMContentLoaded', async () => {
    const bookListContainer = document.querySelector("#to-read-list");
    console.log('test')
    try {
        const response = await fetch("http://localhost:8000");
        const books = await response.json();
        console.log(response, 'res')

        // Call a function to render the books on the page
        renderBooks(books, bookListContainer);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
});


function renderBooks(books, container) {
    const bookList = document.createElement('div');
    books.forEach(book => {
        const listItem = document.createElement('p');
        listItem.textContent = `${book.title} by ${book.author}`;
        bookList.appendChild(listItem);
    });
    container.appendChild(bookList);
}