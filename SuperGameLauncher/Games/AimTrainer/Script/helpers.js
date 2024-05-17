import { settings } from './settings.js';

//Return a ROUND Random Number if number = 2 {0, 1}
export function getRandomInt(number) {
    return Math.floor(Math.random() * number);
}

//Change the flipflopMonster every 1sec
export function fliplopMonster() {
    if (settings.flipflopMonster.value === true)
        settings.flipflopMonster.value = false;
    else
        settings.flipflopMonster.value = true;
}

setInterval(fliplopMonster, settings.flipflopMonster.time);



//Change the flipflopMonster every 0.1sec
export function fliplopShotGun() {
    if (settings.flipflopShotGun.value === true)
        settings.flipflopShotGun.value = false;
    else
        settings.flipflopShotGun.value = true;
}

setInterval(fliplopShotGun, settings.flipflopShotGun.time);