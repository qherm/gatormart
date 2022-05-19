/**
 * Short Description of file:
 * Used in fetching the messages for a logged in User, this function uses a get method
 * to get the results of the messages for a user and then renders it onto a page.
 * 
 * Created by the backend team and the team-lead for CSC648 Software Engineering.
 * Shane Waxler - Team Lead - Email: SWaxler@mail.sfsu.edu
 * Robert Garcia - Backend Lead - Email: RGarcia35@mail.sfsu.edu
 * Minggu Ma - Backend Member - Email: 	MMa4@mail.sfsu.edu
 * Joe Guan - Backend Member - Email: JGuan8@mail.sfsu.edu
*/
const getMessages = () => {
    fetch(`/messages/json`, {method: 'get'})
        .then(response=>response.json())
        .then(({result}) => {
          let uniqueMessages = [...new Set(result)];
          let numMessages = document.getElementById('numMessages');
          let messageDiv = document.getElementById('inbox-append');

          numMessages.innerHTML = `${result.length} messages recieved`;
          for(let i = 0; i < result.length; i++){
            let date = result[i].creation_time.split("T")[0];
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
