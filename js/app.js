
const searchInput = document.getElementById('search-input');
const foundResult = document.getElementById('found-result');
const bookContainer = document.getElementById('book-container');


// loader
const loadingToggle = style => {
    document.getElementById('loader').style.display = style;
}
const mainContainerToggle = style => {
    document.getElementById('results-details').style.display = style;
}

// search value
const searchValue = () => {
    loadResuls(searchInput.value); // call loadResults function
    searchInput.value = '';
    bookContainer.textContent = '';
    // toggle loading
    mainContainerToggle('none');
    loadingToggle('block');
};

// get API result 
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
// display data to UI
const displaData = books => {
    foundResult.innerText = `Found result ${books.numFound}`;
    const showBooks = books.docs.slice(0, 35);
    showBooks?.forEach(book => {
        // get image
        let imgUrl = "";
        if (book.cover_i === undefined) {
            imgUrl = "img/book-cover-1.jpg";
        } else {
            imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
        }
          
        // create div
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${imgUrl}" alt="">
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
    mainContainerToggle('block');
    loadingToggle('none');
}

// get image
const getImg = id => {
    if (id === undefined) {
        console.log('hwllo');
    } else {
        fetch()
            .then(res => res.json())
            .then(data => console.log(data));
    }
    
}