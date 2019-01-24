import { ToolsBar } from './ToolsBar.js';
import { resetGameField } from './additional-functions.js';

ToolsBar.createButtons();

let MENU_FOR_GAME = document.getElementById('menu');

MENU_FOR_GAME.addEventListener('click', function (e) {
    let target = e.target;

    while (target && target.parentNode !== MENU_FOR_GAME) {
        target = target.parentNode;
        if (!target) {
            return;
        }
    }

    resetGameField();

    if (target.tagName.toLowerCase() === 'li') {
        switch (target.innerText) {
            case 'EASY':
                ToolsBar.createGame(9, 9, 10);
                break;

            case 'MEDIUM':
                ToolsBar.createGame(16, 16, 10);
                break;

            case 'HARD':
                ToolsBar.createGame(30, 30, 99);
                break;
        }
    }
});