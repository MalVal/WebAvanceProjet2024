fetch(`./src/PHP/highscore.php?game='BusterGhost'`)

    .then(response =>
    {
        if (!response.ok)
        {
            throw new Error('Network failed');
        }
        return response.json();
    })

    .then(data =>
    {
        let j = 1;
        for(let i in data)
        {
            tab = document.querySelector("#BusterGhost-table tr:nth-of-type(${j})");
            tab.querySelector('.pseudo').textContent = data[i].pseudo;
            tab.querySelector('.score').textContent = data[i].Points;
            j++;
        }
    })

    .catch(error => console.error('Error:', error))