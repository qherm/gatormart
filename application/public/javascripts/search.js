let search = (search, category) => {
  console.log("\n\nI AM IN THE SEARUCJ FINCUTIN\n\n");
  fetch(`/searchResult?category=${category}?search=${search}`, {method: "get"})
    .then(async (response) => {
      return await response.json();
    })
    .then(async (result) => {
      
    })
}