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
            messageDiv.innerHTML += `<div class="card p-3 mt-5">
            <div class="card-header">
            <a href = "/user?id=${result[i].sender_ID}">${result[i].username}</a> responded to <a href="/item?id=${result[i].post_ID}">${result[i].title}</a>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-5 justify-content-md-center">
                        <a href="/item?id=${result[i].post_ID}"><img src="${result[i].image_link}"  class="thumbnail-img ml-1 rounded card-img-top" alt="..."/></a>
                    </div>
                    <div class="col-5">
                        <p class="card-text">${result[i].body}</p>
                    </div>
                    <div class="col-2">
                        <small>${date}</small>
                    </div>
                </div>
            </div>
          </div>`
          }
        });
}
