let grabUser = (id) => {
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get('id');
    fetch(`/user?id=${userID}`, { method: 'get' })
        .then(async (response) => {
            return response;
        })
        .then(console.log)
}

let getUser = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get('id');
    fetch(`/userPage?id=${userID}`, { method: 'post' })
        .then((response) => response.json())
        .then((result) => {
            //console.log(result)
            const [userInfo] = result.userInfo;
            console.log(userInfo);
            const userSection = document.getElementById('userDetails');
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
        })
}

