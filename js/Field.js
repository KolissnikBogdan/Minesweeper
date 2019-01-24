import * as fieldsData from './filed-values.js';

export class Field {
    constructor() {
        this.filedProperties = fieldsData.INIT_FIELD_DATA;
    }

    createField() {
        const TABLE_CELL = document.createElement('td');

        this.filedProperties = {
            ...this.filedProperties
        };

        return TABLE_CELL;
    }
}