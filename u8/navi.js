fetch('http://localhost:63343/WebEngineering23/u8/data.json')
    .then(res =>res.json()) // Javascript normal Array
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });