
const searchInput = document.getElementById('search-input');
const foundResult = document.getElementById('found-result');
const bookContainer = document.getElementById('book-container');


// loader
const loaderStyle = style => {
    document.getElementById('loader').style.display = style;
}
const bookToggle = style => {
    document.getElementById('results-details').style.display = style;
}

// search value
const searchValue = () => {
    loadResuls(searchInput.value); // call loadResults function
    searchInput.value = '';
    // toggle loading
    bookToggle('none');
    loaderStyle('block');
};

// get API result 
const loadResuls = async input => {
    const res = await fetch(`http://openlibrary.org/search.json?q=${input}`);
    const data = await res.json();
    displaData(data);
};
// display data to UI
const displaData = books => {
    foundResult.innerText = `Found result ${books.numFound}`;
    books.docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title fw-bold">${book.title}</h5>
                <h5 class="fs-5">Author: ${book.author_name}</h5>
                <h5 class="fs-5">published: ${book.publish_date}</h5> 
                <h5 class="fs-5">publisher: ${book.publisher}</h5>
            </div>
        </div>
    `;
        bookContainer.appendChild(div);
    })
    
    // toggle loading
    bookToggle('block');
    loaderStyle('none');
}