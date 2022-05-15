const getMessages = () => {
    fetch(`/messages/json`, {method: 'get'})
        .then(response=>response.json())
        .then((result) => {
            
        });
}