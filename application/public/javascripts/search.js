const search = (search, category) => {
    fetch(`/search?category=${category}&search=${search}`, {method:'get'})
        .then(async (response) => {
            return response;
        })
}

const getCategories = (div_title) => {
  fetch(`/result/categories`, {method:'get'})
    .then((response) => response.json())
    .then((result) => {
      const categoryDropdown = document.getElementById(div_title);
      const categories = result.result;
      for(const category in categories){
        categoryDropdown.innerHTML += "<option value='" + categories[category].category + "'>" + categories[category].category + "</option>"
      }
    }
  )
}
 
const getResults = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    sortby = document.getElementById('sortby').value;

    document.getElementById('searchbar').value = search;
    document.getElementById('category').value = category;
    
    if(sortby=="Price ASC"){
      document.getElementById('sortby').value = "Price: Low to High";
    } else if(sortby=="Price DESC"){
      document.getElementById('sortby').value = "Price: High to Low";
    } else if(sortby=="Creation_time DESC"){
      document.getElementById('sortby').value = "Date: Newest First";
    } else if(sortby=="Creation_time ASC"){
      document.getElementById('sortby').value = "Date: Oldest First";
    } 
    fetch(`/result?category=${category}&search=${search}&sortby=${sortby}`, {method:'post'})        
        .then((response)=>response.json())
        .then((result) => {
            const newCards = result.result;
            
            const cardSection = document.getElementById('cards-section-append');
            cardSection.innerHTML="";
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
                    <!-- Button Trigger Modal -->
                <button type="button" class="cart-btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter${newCards[i].id}">
                  Message Seller
                </button>

                <!-- Modal -->
                <div class="modal fade" id="exampleModalCenter${newCards[i].id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <form class="modal-content" method="POST" action="/messages/send">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Message ${newCards[i].username}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="item">
                          <label for="instructions">Message Body<span>*</span></label>
                          <textarea id="instructions" name="body" rows="3" maxlength="10000" required></textarea>
                        </div>
                        <input type="hidden" name="post_id" value="${newCards[i].id}" id="send-message-user-id">
                        <input type="hidden" name="receiver_id" value="${newCards[i].user_id}" id="send-message-user-id">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" name="phoneNumber" style="display: inline-block;" id="flexCheckDefault">
                          <label class="form-check-label" for="flexCheckDefault">
                            Send Phone Number?
                          </label>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="cart-btn btn-primary">Send Message</button>
                      </div>
                    </form>
                  </div>
                </div>
                  </div>
                </div>
              </div>
                `
            }

            const numResultsSection = document.getElementById('num-results');
            numResultsSection.innerText = "";
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
