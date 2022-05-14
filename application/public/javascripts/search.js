let search = (search, category) => {
    fetch(`/search?category=${category}&search=${search}`, {method:'get'})
        .then(async (response) => {
            return response;
        })
        .then(console.log)
}

let getResults = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    fetch(`/searchResult?category=${category}&search=${search}`, {method:'post'})
        .then((response)=>response.json())
        .then((result) => {
            const newCards = result.result;
            const cardSection = document.getElementById('cards-section-append');
            for(let i=0;i<newCards.length;i++){
                cardSection.innerHTML+=`
                <div class="col-md-3 mb-2">
                <div class="card shadow" style="width: 18rem;">
                  <a href="/item?id=${newCards[i].id}">
                    <img
                      src="${newCards[i].image_link}"
                      class="card-img-top"
                      alt="..."
                    /></a>
                  <div class="card-body">
                    <h5 class="card-title font-poppins">${newCards[i].title}</h5>
                    <span>${newCards[i].category}</span>
                    <h6 class="mb-3">$${newCards[i].price}</h6>
                    <a href="/item?id=${newCards[i].id}" class="btn btn-primary font-size-09 text-light product-button">View Details</a>
                    <a href="message" class="btn btn-primary font-size-09 text-light product-button">Message Seller</a>
                  </div>
                </div>
              </div>
                `
            }
        });
}