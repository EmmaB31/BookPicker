class Book {
    constructor(title, author, genre, length) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.length = length;
    }
}
document.querySelector("#book_form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const genre = document.querySelector("#genre").value;
    const length = document.querySelector("#length").value;
    const isSeries = document.querySelector("#series").checked;  // Changed "series" to "isSeries"
    
    const requestData = {  // Added an equal sign after "requestData"
        title: title,
        author: author,
        genre: genre,
        length: length,
        is_series: isSeries  // Changed "series" to "is_series"
    };
    const messageContainer = document.querySelector("#message-container");
    const sucessMessage = document.querySelector("#sucess-message");
    const errorMessage = document.querySelector("#error-message");
    const exitsingBookMessage = document.querySelector("#existing-book-message");

    try {
        const response = await fetch("https://bookpicker-backend.onrender.com/addbook", {  // Added "/addbook" to the URL
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            const responseData = await response.json();
            console.error(responseData);
            messageContainer.innerHTML = responseData.message || responseData.error + ' please check all fields and try again'
        } else {
            const responseData = await response.json();
            console.log('Book added successfully', responseData);

            document.querySelector("#title").value = "";
            document.querySelector("#author").value = "";
            document.querySelector("#genre").value = "";
            document.querySelector("#length").value = "";
            document.querySelector("#series").checked = false;


            sucessMessage.style.display = "block";   
        }
       
    } catch (error) {
        console.error('Error adding book', error);
        errorMessage.style.display = "block"
    } 
    
});


