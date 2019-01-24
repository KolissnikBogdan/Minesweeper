import { GameFiled } from './GameFiled.js';
import { resetGameField } from './additional-functions.js';

export class Game {
    constructor() {
        this.gameTable;
    }

    startGame(newRowsCount, newColumnsCount, newBombsCount) {
        const NEW_GAME_TABLE = new GameFiled(newRowsCount, newColumnsCount, newBombsCount);

        this.gameTable = NEW_GAME_TABLE;
        NEW_GAME_TABLE.createTable();
        NEW_GAME_TABLE.putMines();
        NEW_GAME_TABLE.updateCounter();

        const NEW_GAME_CONTAINER = document.querySelector('.game_table');

        NEW_GAME_CONTAINER.addEventListener('click', ({ target }) => {
            if (target.matches('td') && !target.matches('.lock')) {
                this.openField(event);
            }
        });

        NEW_GAME_CONTAINER.addEventListener('contextmenu', ({ target }) => {
            const IF_VALUE = this.gameTable.tableProperties.flagCounter < this.gameTable.tableProperties.minesCount;
            
            if (target.matches('td')) {
                if (IF_VALUE){
                    this.setFlag(event, true, IF_VALUE);
                } else {
                    this.setFlag(event, false, IF_VALUE);
                }
            }

            //console.log(this.gameTable.tableProperties.flagCounter);
        });
    }

    openField({ target }) {
        const X = target.cellIndex;
        const Y = target.parentNode.rowIndex;

        this.recurseOpen(X, Y);
    }

    recurseOpen(x, y) {
        const SELECT_FIELD = this.gameTable.tableProperties.field[x][y].filedProperties;
        const TABLE_CONTAINER = document.querySelector('.game_table');
        const TOOLBAR_CONTAINER = document.getElementById('menu');
        const FIELD_CONTAINER = TABLE_CONTAINER.rows[y].children[x];
        const GAME_PROPERTIES = this.gameTable.tableProperties;

        if (SELECT_FIELD.isOpen) {
            return;
        }

        if (SELECT_FIELD.hasBomb) {
            for (let i = 0; i < GAME_PROPERTIES.minesCount; i++) {
                let fieldWithMine = GAME_PROPERTIES.fieldHaveMines[i];
                let [x, y] = fieldWithMine;

                TABLE_CONTAINER.rows[y].children[x].classList.add('bomb-blast');
            }

            TABLE_CONTAINER.classList.add('no-event');
            TOOLBAR_CONTAINER.classList.add('no-event');

            setTimeout(function () {
                resetGameField();
                TOOLBAR_CONTAINER.classList.remove('no-event');
            }, 2000);

            alert('Вы проиграли...');
        } else {
            if (FIELD_CONTAINER.classList.contains('lock')) {
                FIELD_CONTAINER.classList.remove('open-cell');
            } else {
                FIELD_CONTAINER.innerHTML = SELECT_FIELD.bombAround;

                if (FIELD_CONTAINER.innerHTML === '0') {
                    FIELD_CONTAINER.innerHTML = '';
                }

                FIELD_CONTAINER.classList.add('open-cell');

                SELECT_FIELD.isOpen = true;
                GAME_PROPERTIES.openedCount++;

                if (GAME_PROPERTIES.column * GAME_PROPERTIES.row - GAME_PROPERTIES.minesCount === GAME_PROPERTIES.openedCount) {
                    setTimeout(function () {
                        resetGameField();
                    }, 2000);
                    alert('Вы победили!!!');
                }

                if (SELECT_FIELD.bombAround === 0) {
                    const xStart = x > 0 ? x - 1 : x;
                    const yStart = y > 0 ? y - 1 : y;

                    const xEnd = x < GAME_PROPERTIES.column - 1 ? x + 1 : x;
                    const yEnd = y < GAME_PROPERTIES.row - 1 ? y + 1 : y;

                    for (let i = xStart; i <= xEnd; i++) {
                        for (let j = yStart; j <= yEnd; j++) {
                            this.recurseOpen(i, j);
                        }
                    }
                }
            }
        }
    }

    setFlag({ target }, flag, ifVal) {
        if (!target.classList.contains('lock')) {
            if (ifVal){
                this.gameTable.tableProperties.flagCounter++;
            }
        } else {
            if (this.gameTable.tableProperties.flagCounter > 0){
                this.gameTable.tableProperties.flagCounter--;
            }
        }

        event.preventDefault();

        const X = target.cellIndex;
        const Y = target.parentNode.rowIndex;

        if (!this.gameTable.tableProperties.field[X][Y].filedProperties.isOpen && flag) target.classList.toggle('lock');
    }
}