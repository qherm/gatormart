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
                  <a href="/productDetail?postid=${newCards[i].id}">
                    <img
                      src="https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzNDcxNjEyNQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                      class="card-img-top"
                      alt="..."
                    /></a>
                  <div class="card-body">
                    <h5 class="card-title font-poppins">${newCards[i].title}</h5>
                    <span>textbooks </span>
                    <h6 class="mb-3">$${newCards[i].price}</h6>
                    <a href="productDetail" class="btn btn-primary font-size-09 text-light product-button">View Details</a>
                    <a href="message" class="btn btn-primary font-size-09 text-light product-button">Message Seller</a>
                  </div>
                </div>
              </div>
                `
            }
        });
}