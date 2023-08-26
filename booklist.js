
let books = [];
document.addEventListener('DOMContentLoaded', async () => {
    const bookListContainer = document.querySelector("#to-read-list");
    console.log('test')
    try {
        const response = await fetch("https://bookpicker-backend.onrender.com");
        books = await response.json();
        console.log(response, 'res')
        console.log(books, 'books')

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

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteBook(book.id));
        listItem.appendChild(deleteButton)
        bookList.appendChild(listItem);
    });
    container.appendChild(bookList);

}
async function deleteBook(bookId) {
    try {
        const userConfirmed = window.confirm("Are you sure you want to delete this book?");

        if (!userConfirmed) {
            return;
        }

        const response = await fetch(`https://bookpicker-backend.onrender.com/delete-book/${bookId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const deletedItem = document.querySelector(`#book-${bookId}`);
            
            if (deletedItem) {
                deletedItem.remove();
                books = books.filter(book => book.id !== bookId); // Update the books array
                renderBooks(books, document.querySelector("#book-list-container"));
            } else {
                console.error(`Book entry with ID ${bookId} not found.`);
            }
            location.reload();
        } else {
            const responseData = await response.json();
            console.error(responseData);
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}




