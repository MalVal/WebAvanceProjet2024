let GamesNames = ["BusterGhost", '2048', 'AimTrainer', 'IndiannaDungeon'];

let requests = GamesNames.map(name => {
    return fetch(`./src/PHP/highscore.php?game=${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network failed');
            }
            return response.json();
        })
        .catch(error => console.error('Error:', error));
});

Promise.all(requests)
    .then(dataArray => {
        dataArray.forEach((data, i) => {
            // Sélection de la table
            const table = document.getElementById(`${GamesNames[i]}-table`);
            if (table) {
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    row.querySelector('.pseudo').textContent = '';
                    row.querySelector('.score').textContent = '';
                });
            }
            if (data.length > 0) {
                data.forEach((item, index) => {
                    const row = table.querySelector(`tbody tr:nth-of-type(${index + 1})`);
                    if (row) {
                        row.querySelector('.pseudo').textContent = item.pseudo;
                        row.querySelector('.score').textContent = item.Points;
                    }
                });
            }
        });
    });
