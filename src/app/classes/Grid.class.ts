import { BaseCamp, Cell, Tower } from '@app/classes/Cell.class';
import { Overworld } from '@app/classes/Overworld.class';
import { CellType, Level, LevelMaps, SelectedObject } from '@app/data/data';

export class Grid {
  ctx: CanvasRenderingContext2D;
  cellSize: number = 50;
  cells: CellType[][];
  overworld: Overworld;
  currentLevel: Level;
  selectedObject: SelectedObject | null = null;
  constructor(config: any) {
    this.ctx = config.ctx;
    this.cells = [];
    this.overworld = config.overworld;
    this.currentLevel = LevelMaps.get(this.overworld.currentLevel);
    this.selectedObject = null;

    this.createGrid();
  }

  createGrid() {
    let playerPos = this.currentLevel.playerPos;
    let enemyPos = this.currentLevel.enemyPos;

    for (let row = 0; row < 10; row += 1) {
      this.cells[row] = [];
      for (let col = 0; col < 15; col += 1) {
        if (this.isEnemyPosition(col, row) || this.isPlayerPosition(col, row)) {
          let campType = this.isPlayerPosition(col, row) ? 'player' : 'enemy';

          let newCamp = new BaseCamp({
            col,
            row,
            ctx: this.ctx,
            campType,
            grid: this,
          });

          this.cells[row][col] = newCamp;
        } else {
          this.cells[row][col] = null;
        }
      }
    }
  }

  isSelectedCell(col: number, row: number) {
    return (
      this.selectedObject !== null &&
      this.selectedObject.col === col &&
      this.selectedObject.row === row
    );
  }

  getCell(col: number, row: number): CellType {
    return this.cells[row][col];
  }

  setCell(col: number, row: number, cell: Cell) {
    this.cells[row][col] = cell;
  }

  isPlayerPosition(col: number, row: number) {
    return (
      col === this.currentLevel.playerPos.col &&
      row === this.currentLevel.playerPos.row
    );
  }

  isEnemyPosition(col: number, row: number) {
    return (
      col === this.currentLevel.enemyPos.col &&
      row === this.currentLevel.enemyPos.row
    );
  }
}
