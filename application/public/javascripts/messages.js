const getMessages = () => {
    fetch(`/messages/json`, {method: 'get'})
        .then(response=>response.json())
        .then(({result}) => {
          let uniqueMessages = [...new Set(result)];
          //console.log(uniqueMessages.length);
          let numMessages = document.getElementById('numMessages');
          let messageDiv = document.getElementById('inbox-append');
          // 3 messages received

          numMessages.innerHTML = `${result.length} messages recieved`
          // console.log(result);
          for(let i = 0; i < result.length; i++){
            date = result[i].creation_time.split("T")[0];
            console.log(date);
            messageDiv.innerHTML+= `<div class="card p-3 mt-5">
            <div class="d-flex justify-content-between align-items-center">
              <div class="user d-flex flex-row align-items-center">
                <div class="flex-row align-left">                  
                  <a href="/item?id=${result[i].post_ID}">
                  <img
                      src="${result[i].image_link}"
                      width="50"
                      class="thumbnail-img ml-1"
                      alt="..."
                    />
                  </a>
                </div>
                <!--   <img src="https://i.imgur.com/0LKZQYM.jpg" width="30" class="user-img rounded-circle mr-2 ml-3" />  -->
                <span><small class="font-weight-bold text-primary"><a href = "/user?id=${result[i].sender_ID}">${result[i].username}</a></small>
                  <small class="font-weight-bold"> - ${result[i].body}
                  </small></span>
              </div>
              <small>${date}</small>
            </div>
            <div class="action d-flex justify-content-between mt-3 align-items-center">

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