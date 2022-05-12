let search = (search, category) => {
    fetch(`/search?category=${category}&search=${search}`, {method: "get"})
        .then((response) => {
            console.log("above");
            console.log("below")
            console.log(response);
            return response.json();
        })
        .then((result) => {
            console.log(result.category);
            document.location.href = '/searchResult';
            let cardsSection = document.getElementById('cards-section-append');
            console.log(cardsSection);
            cardsSection.innerHTML+="<h1>HELLO</h1>";
            // for(let i=0;i<result.result.length;i++){
            //     cardsSection.innerHTML+="<h1>HELLO</h1>";
            // }
        })
}