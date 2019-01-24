import { Field } from './Field.js';
import { randomValues } from './additional-functions.js';
import * as tableData from './table-values.js';

export class GameFiled {
    constructor(row, column, minesCount) {
        this.tableProperties = {
            ...tableData.INIT_TABLE_DATA,
            row: row,
            column: column,
            minesCount: minesCount
        }
    }

    createTable() {
        const CONTAINER_FOR_GAME = document.querySelector('.gameContainer');
        const TABLE_FOR_GAME = document.createElement('table');

        this.tableProperties.field = [];

        TABLE_FOR_GAME.id = 'table_id';
        TABLE_FOR_GAME.className = 'game_table';

        CONTAINER_FOR_GAME.appendChild(TABLE_FOR_GAME);

        for (let i = 0; i < this.tableProperties.column; i++) {
            const FIELD_OF_TABLE = document.createElement('tr');
            const TMP = [];

            TABLE_FOR_GAME.appendChild(FIELD_OF_TABLE);

            for (let j = 0; j < this.tableProperties.row; j++) {
                let localField = new Field();
                let localField_td = localField.createField();

                TMP.push(localField);

                FIELD_OF_TABLE.appendChild(localField_td);
            }

            this.tableProperties.field.push(TMP);
        }
    }

    putMines() {
        this.tableProperties.fieldHaveMines = [];

        for (let i = 0; i < this.tableProperties.minesCount;) {
            const X = randomValues(this.tableProperties.column);
            const Y = randomValues(this.tableProperties.row);

            if (!this.tableProperties.field[X][Y].filedProperties.hasBomb) {
                this.tableProperties.field[X][Y].filedProperties.hasBomb = true;
                this.tableProperties.fieldHaveMines.push([X, Y]);
                i++;
            }
        }
    }

    minesAround(x, y) {
        const xStart = (x > 0) ? x - 1 : x;
        const yStart = (y > 0) ? y - 1 : y;

        const xEnd = (x < this.tableProperties.column - 1) ? x + 1 : x;
        const yEnd = (y < this.tableProperties.row - 1) ? y + 1 : y;

        let count = 0;

        for (let i = xStart; i <= xEnd; i++) {
            for (let j = yStart; j <= yEnd; j++) {
                if (this.tableProperties.field[i][j].filedProperties.hasBomb && !(x === i && y === j)) {
                    count++;
                }
            }
        }

        this.tableProperties.field[x][y].filedProperties.bombAround = count;
    }

    updateCounter() {
        for (let i = 0; i < this.tableProperties.column; i++) {
            for (let j = 0; j < this.tableProperties.row; j++) {
                this.minesAround(i, j);
            }
        }
    }
}