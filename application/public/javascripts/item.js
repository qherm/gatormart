let post = (title, category, price, conditition, picture, description) => {
    fetch(`/post?title=${title}&category=${category}&price=${price}&condition=${condition}&picture=${picture}&description=${description}`, {method:'post'})
        .then(async (response) => {
            return response;
        })
        .then(console.log)
}