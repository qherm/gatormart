function search(search, category){
    if(search == ""){
        search = "EMPTYSEARCHTEMP"
      }
      if(category == ""){
        category = "EMPTYCATEGORYTEMP"
      }
      console.log("HERE");
      fetch(`/search/${search}/${category}`, {method: "get"})
                  .then(async (response) => {
                    return await response.json();
                  })
                  .then(async (result) => 
                  {
                    const searchResult = result.searchResult;
                    sessionStorage.searchResult = JSON.stringify(searchResult)
                    sessionStorage.searchTerm = search
                    sessionStorage.categoryTerm = category
  
                    // document.location.href = '/VPResult.html'
                  })
}