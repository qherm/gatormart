let redirect_search = (search, category) => {
  fetch(``)
}

let search = (search, category) => {
    if(search == ""){
        search = "EMPTYSEARCHTEMP"
      }
      if(category == ""){
        category = "EMPTYCATEGORYTEMP"
      }
      fetch(`/search/${category}/${search}`, {method: "get"})
                  .then(async (response) => {
                    return await response.json();
                  })
                  .then(async (result) => 
                  {
                    // document.location.href = ""

  
                    // document.location.href = '/VPResult.html'
                  })
}