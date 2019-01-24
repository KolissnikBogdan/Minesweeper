import { Game } from './Game.js';

export class ToolsBar {
    static createButtons() {
        const GAME_CONTAINER = document.querySelector('.gameContainer');
        const MENU_FOR_GAME = document.createElement('ul');

        MENU_FOR_GAME.id = 'menu';

        GAME_CONTAINER.appendChild(MENU_FOR_GAME);

        const DIFFICULTY = ['EASY', 'MEDIUM', 'HARD'];

        for (let i = 0; i < DIFFICULTY.length; i++) {
            let li = document.createElement('li');

            MENU_FOR_GAME.appendChild(li);
            li.innerText = DIFFICULTY[i];
        }
    }

    static createGame(rows, columns, bombs) {
        let newGame = new Game();

        newGame.startGame(rows, columns, bombs);
    }
}