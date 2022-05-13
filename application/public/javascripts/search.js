let search = (search, category) => {

  fetch(`/search?category=${category}&search=${search}`, { method: "get" })
    .then(async (response) => {
      return await response.json();
    })
    .then(async (result) => {

      document.location.href = `/searchResult?result=${encodeURIComponent(JSON.stringify(result))}`;
    }
  )
}

//Need to change later - overreliant on data passed through the URL which leaves it somewhat vulnerable to being affected.
function displayResults() {
  var url = window.location.href;
  var getVariables = url.split("=");
  results = JSON.parse(decodeURIComponent(getVariables[1]));

  searchTerm = results.searchTerm
  category = results.category;
  searchResults = results.result;
  console.log(searchResults);

  for (let i = 0; i < searchResults.length; i++) {
    document.getElementById("searchResults").innerHTML +=
      `
        <div class="col-md-3 mb-2">
            <div class="card shadow" style="width: 18rem;">
                <a href="#">
                    <img
                        src=""
                        class="card-img-top"
                        alt="..."
                    />
                </a>
                <div class="card-body">
                    <h5 class="card-title font-poppins">${searchResults[i].title}</h5>
                        <span>textbooks </span>
                    <h6 class="mb-3">$${searchResults[i].price}</h6>
                    <a href="productDetail" class="btn btn-primary font-size-09 text-light product-button">View Details</a>
                    <a href="message" class="btn btn-primary font-size-09 text-light product-button">Message Seller</a>
                </div>
            </div>
        </div>
    `
  }


}