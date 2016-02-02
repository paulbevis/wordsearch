export class Cell {
    constructor(value, rowPos, columnPos, selected, explode = false, partOfWordFound = false) {
        this.value = value;
        this.rowPos = rowPos;
        this.columnPos = columnPos;
        this.selected = selected;
        this.explode = explode;
        this.partOfWordFound = partOfWordFound;
    }
}
