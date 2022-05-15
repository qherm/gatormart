const getMessages = () => {
    fetch(`/messages/json`, {method: 'get'})
        .then(response=>response.json())
        .then((result) => {
            let messageDiv = document.getElementById('inbox-append')
            for(let i = 0; i < result.length; i++){
              messageDiv.innerHTML+= `<div class="card p-3 mt-5">
              <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row align-items-center">
                  <div class="flex-row align-left"><img
                      src="https://i.imgur.com/lYc3nwQ.png"
                      width="50"
                      class="thumbnail-img ml-1"
                      href = "/item?id=${result[i].post_id}"
                    /></div>
                  <img src="https://i.imgur.com/0LKZQYM.jpg" width="30" class="user-img rounded-circle mr-2 ml-3" />
                  <span><small class="font-weight-bold text-primary">${result[i].sender_id}</small>
                    <small class="font-weight-bold">${result[i].body}
                    </small></span>
                </div>
                <small>02/05/2022</small>
              </div>
              <div class="action d-flex justify-content-between mt-3 align-items-center">
                <div class="reply px-4">
                  <small>Remove</small>
                  <span class="dots"></span>
                  <small>Reply</small>
                </div>
                <div class="icons align-items-center">
                  <!-- <i class="fa fa-check-circle-o check-icon text-primary"></i>  -->
                </div>
              </div>
            </div>`
            }
        });
}

/*
  body VARCHAR(255) NOT NULL,
  post_id INT NOT NULL,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  */