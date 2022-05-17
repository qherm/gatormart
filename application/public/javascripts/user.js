let getUser = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get('id');
    fetch(`/user/json?id=${userID}`, { method: 'get' })
        .then((response) => response.json())
        .then((result) => {
            allResults = result.userInfo;
            const [userInfo] = result.userInfo;
            const userSection = document.getElementById('userDetails');
            const userPosts = document.getElementById('userPosts');
            let allPosts = ``;
            userSection.innerHTML =
                `            
                <!-- Profile widget -->
                <div class="row" id="cards-section-append">
                </div>
                    <div class="bg-white shadow rounded overflow-hidden">
                        <div class="px-4 pt-0 pb-4 cover">
                            <div class="media align-items-end profile-head">
                                <div class="profile mr-3"><img
                                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                                alt="..." width="130" class="rounded mb-2 img-thumbnail" />
                            </div>
                            <div class="media-body mb-5 text-white">
                                <h4 class="mt-0 mb-0">${userInfo.username}</h4>
                                <p class="small mb-4"></p>
                            </div>
                        </div>
                    </div>
                    <br>
                    <br>
                    <div class="px-4 py-3">
                        <h5 class="mb-0">About</h5>
                        <div class="p-4 rounded shadow-sm bg-light">
                            <p class="font-italic mb-0">Full Name: ${userInfo.full_name}</p>
                            <p class="font-italic mb-0">SFSU Email: ${userInfo.email}</p>
                            <p class="font-italic mb-0">Username: ${userInfo.username}</p>
                        </div>
                    </div>

                    <div class="px-4 py-3">
                        <h5 class="mb-0">Description</h5>
                        <div class="p-4 rounded shadow-sm bg-light">
                            <p class="font-italic mb-0">${userInfo.bio}</p>
                        </div>
                    </div>
                `
            for(let i=0;i<allResults.length;i++){
                allPosts +=
                `
                <div class="col-md-3 mb-2">
                <div class="card shadow" style="width: 18rem;">
                  <a href="/item?id=${allResults[i].id}">
                    <img
                      src="${allResults[i].image_link}"
                      class="card-img-top"
                      alt="..."
                    /></a>
                  <div class="card-body">
                    <h5 class="card-title font-poppins">${allResults[i].title}</h5>
                    <span>${allResults[i].category}</span>
                    <h6 class="mb-3">$${allResults[i].price}</h6>
                    <a href="/item?id=${allResults[i].id}" class="btn btn-primary font-size-09 text-light product-button">View Details</a>
                    <a href="message" class="btn btn-primary font-size-09 text-light product-button">Message Seller</a>
                  </div>
                </div>
              </div>
                `
            }
            userPosts.innerHTML = allPosts;
        })
}

