// get element
const searchInput = document.getElementById('search-input');
const foundResult = document.getElementById('found-result');
const bookContainer = document.getElementById('book-container');


// search loader
const loadingToggle = style => {
    document.getElementById('loader').style.display = style;
};
const mainContainerToggle = style => {
    document.getElementById('results-details').style.display = style;
};

// search value
const searchValue = () => {
    loadResuls(searchInput.value);
    searchInput.value = '';
    bookContainer.textContent = '';
    // toggle loading
    mainContainerToggle('none');
    loadingToggle('block');
};

// load API result 
const loadResuls = async input => {
    const res = await fetch(`http://openlibrary.org/search.json?q=${input}`);
    const data = await res.json();
    if (data.numFound === 0) {
        foundResult.innerText = "No result's found";
        loadingToggle('none');
        mainContainerToggle('block');
        return
    }
    displaData(data);
};

// show results to UI
const displaData = books => {
    foundResult.innerText = `Found result ${books.numFound}`;
    const showBooks = books.docs.slice(0, 35); // display only 35 data
    showBooks?.forEach(book => {
        // get book cover image
        let imgUrl = "img/book-cover-1.jpg";
        if (book.cover_i) {
            imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        };
          
        // create div
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 my-2">
            <img class="book-cover m-3 rounded" src="${imgUrl}" alt="">
            <div class="card-body">
                <h5 class="card-title fw-bold mb-4">${book.title}</h5>
                <h5 class="fs-5">Author: ${book.author_name ? book.author_name : 'Not available'}</h5>
                <h5 class="fs-5">publish year: ${book.first_publish_year ? book.first_publish_year : 'Not available'}</h5> 
                <h5 class="fs-5">publisher: ${book.publisher ? book.publisher[0] : 'Not available'}</h5>
            </div>
        </div>
    `;
        bookContainer.appendChild(div);
    })
    
    // toggle loading
    mainContainerToggle('block');
    loadingToggle('none');
};


// code end here