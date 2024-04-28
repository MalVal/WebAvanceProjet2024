let GamesNames = ["BusterGhost", '2048', 'AimTrainer', 'IndiannaDungeon'];

GamesNames.forEach((name) => {

    fetch(`./src/PHP/highscore.php?game='${name}'`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network failed');
            }
            return response.json();
        })
        .then(data => {
            data.forEach((item, index) => {
                const row = document.querySelector(`#${name}-table tbody tr:nth-of-type(${index + 1})`);
                row.querySelector('.pseudo').textContent = item.pseudo;
                row.querySelector('.score').textContent = item.Points;
            });
        })
        .catch(error => console.error('Error:', error));

})