const getMessages = () => {
    fetch(`/messages`, {method: 'get'})
        .then(result=>result)
        .then(console.log)
}