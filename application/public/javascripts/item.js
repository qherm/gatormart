let getItemInfo = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    fetch(`/item/json?id=${id}`, {method: "get"})
        .then(response => response.json())
        .then(results => {
            const [itemInfo] = results.itemInfo;
            let date = itemInfo.creation_time.split("T")[0];
            document.getElementById('item-info').innerHTML = `<!-- Left Column / Product Image -->
            <div class="left-column col-5 align-self-center">
              <img src="${itemInfo.image_link}" class="thumbnail-img" width=900 id="product-img">
            </div>
    
    
            <!-- Right Column -->
            <div class="right-column col-7">
              <!-- Product Description -->
              <div class="product-info align-self-center">
                <div class="product-title"> ${itemInfo.title}</div>
                <h5>${itemInfo.category}</h5>
                <div class="posted-user"> Posted by: <a href="/user?id=${itemInfo.user_id}" id="user">${itemInfo.username}</a> on ${date}</div>
                <div class="location"> Location: Cesar Chavez Center</div>
                <div class="product-description">${itemInfo.description}
                </div>
              </div>
    
              <!-- Product Pricing -->
              <div class="product-price">
                <span>$${itemInfo.price}</span>

                <!-- Button Trigger Modal -->
                <button type="button" class="cart-btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                  Message Seller
                </button>

                <!-- Modal -->
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <form class="modal-content" method="POST" action="/messages/send">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Message ${itemInfo.username}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="item">
                          <label for="instructions">Message Body<span>*</span></label>
                          <textarea id="instructions" name="body" rows="3" maxlength="10000" required></textarea>
                        </div>
                        <input type="hidden" name="post_id" value="${id}" id="send-message-user-id">
                        <input type="hidden" name="receiver_id" value="${itemInfo.user_id}" id="send-message-user-id">
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
            </div>`
        })
}