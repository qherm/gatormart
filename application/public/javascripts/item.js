// let post = (title, category, price, condition, picture, description) => {
//     fetch(`/post?title=${title}&category=${category}&price=${price}&condition=${condition}&picture=${picture}&description=${description}`, {method:'post'})
//         .then(async (response) => {
//             return response;
//         })
//         .then(console.log)
// }

let getItemInfo = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    fetch(`/item/json?id=${id}`, {method: "get"})
        .then(response => response.json())
        .then(results => {
            // console.log(result)
            //console.log(results)
            const [itemInfo] = results.itemInfo;
            //console.log(itemInfo)
            document.getElementById('item-info').innerHTML = `<!-- Left Column / Product Image -->
            <div id="left-column">
              <img src="${itemInfo.image_link}" id="product-img">
            </div>
    
    
            <!-- Right Column -->
            <div class="right-column">
    
              <!-- Product Description -->
              <div class="product-info">
                <span>${itemInfo.category}</span>
                <div class="product-title"> ${itemInfo.title}</div>
                <div class="posted-user"> Posted by: <a href="/user?id=${itemInfo.user_id}" id="user">${itemInfo.username}</a> on 1/1/2001</div>
                <div class="location"> Location: Cesar Chavez Center</div>
                <div class="product-description">${itemInfo.description}
                </div>
              </div>
    
    
              <!-- Product Pricing -->
              <div class="product-price">
                <span>$50</span>
                <a href="#" class="cart-btn">Message Seller</a>
              </div>
            </div>`
        })
}