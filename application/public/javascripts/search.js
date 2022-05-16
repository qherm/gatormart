const search = (search, category) => {
    fetch(`/search?category=${category}&search=${search}`, {method:'get'})
        .then(async (response) => {
            return response;
        })
        .then(console.log)
}

const getCategories = (div_title) => {
  fetch(`/result/categories`, {method:'get'})
    .then((response) => response.json())
    .then((result) => {
      const categoryDropdown = document.getElementById(div_title);
      const categories = result.result;
      for(const category in categories){
        categoryDropdown.innerHTML += "<option value=" + categories[category].category + ">" + categories[category].category + "</option>"
      }
    }
  )
}
 
const getResults = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');

    document.getElementById('searchbar').value = search;
    document.getElementById('category').value = category;
    fetch(`/result?category=${category}&search=${search}`, {method:'post'})
        .then((response)=>response.json())
        .then((result) => {
            const newCards = result.result;
            const cardSection = document.getElementById('cards-section-append');
            for(let i=0;i<newCards.length;i++){
                cardSection.innerHTML+=`
                <div class="col-md-3 mb-2">
                <div class="card shadow" style="width: 18rem;">
                  <a href="/item?id=${newCards[i].post_id}">
                    <img
                      src="${newCards[i].image_link}"
                      class="card-img-top"
                      alt="..."
                    /></a>
                  <div class="card-body">
                    <h5 class="card-title font-poppins">${newCards[i].title}</h5>
                    <span>${newCards[i].category}</span>
                    <h6 class="mb-3">$${newCards[i].price}</h6>
                    <a href="/item?id=${newCards[i].post_id}" class="btn btn-primary font-size-09 text-light product-button">View Details</a>
                    <!--   <a href="message" class="btn btn-primary font-size-09 text-light product-button">Message Seller</a> -->
                  </div>
                </div>
              </div>
                `
            }

            const numResultsSection = document.getElementById('num-results');
            if((!search) && (!category)){
              numResultsSection.innerText = `0-${newCards.length} results total`;
            }
            else if(!search){
              numResultsSection.innerText += `0-${newCards.length} results for ${category} `;
            }
            else{
              numResultsSection.innerText += `0-${newCards.length} results for ${search} `;
            }
        });
}