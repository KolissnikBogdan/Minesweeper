export function resetGameField() {
    if (document.getElementById('table_id')) {
        document.getElementById('table_id').parentNode.removeChild(document.getElementById('table_id'));
    }
}

export function randomValues(value) {
    return parseInt(Math.random() * value - 1);
}