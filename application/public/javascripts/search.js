let search = (search, category) => {
    if(search == ""){
        search = "EMPTYSEARCHTEMP"
      }
      if(category == ""){
        category = "EMPTYCATEGORYTEMP"
      }
      fetch('/search', {method: "get", body:{search: search, category: category}})
                  .then(async (response) => {
                    return await response.json()
                  })
                  .then(async (result) => 
                  {
                    const searchResult = result.searchResult;
                    sessionStorage.searchResult = JSON.stringify(searchResult)
                    sessionStorage.searchTerm = search
                    sessionStorage.categoryTerm = category
  
                    document.location.href = '/VPResult.html'
                  })
}