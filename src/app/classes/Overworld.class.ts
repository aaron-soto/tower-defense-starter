import { ElementRef } from '@angular/core';
import { MouseHandler } from './MouseHandler.class';
import {
  CellType,
  SelectedObject,
  TowerConfiguration,
  TowerConfigurations,
} from '@app/data/data';
import { Grid } from '@app/classes/Grid.class';
import { BaseCamp, Cell, Tower } from '@app/classes/Cell.class';

export class Overworld {
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;

  grid: Grid;
  mouse: MouseHandler;

  // GameStates
  isPlacingTower: boolean = false;
  towerToPlace: TowerConfiguration | null = null;

  currentLevel: string = 'level-1';
  currentWave: number = 1;
  player = {
    health: 100,
    money: 500,
  };

  constructor(config: any) {
    this.canvas = config.canvas;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    this.mouse = new MouseHandler({
      canvas: this.canvas,
    });

    this.grid = new Grid({
      ctx: this.ctx,
      overworld: this,
    });
  }

  init() {
    this.startGameLoop();
  }

  drawGrid() {
    const cellSize = 50;
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#e7ecef';

    for (let x = 0; x < this.canvas.nativeElement.width; x += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.nativeElement.height);
      this.ctx.stroke();
    }

    for (let y = 0; y < this.canvas.nativeElement.height; y += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.nativeElement.width, y);
      this.ctx.stroke();
    }
  }

  startGameLoop() {
    const step = () => {
      this.clearCanvas();

      this.update();
      this.render();

      requestAnimationFrame(() => {
        step();
      });
    };

    step();
  }

  placeTower() {
    const cell = this.mouse.getHoveredCell();

    if (this.towerToPlace?.purchaseCost > this.player.money) return;

    let tower = new Tower({
      col: cell.x,
      row: cell.y,
      ctx: this.ctx,
      towerType: this.towerToPlace?.key,
      grid: this.grid,
    });

    this.player.money -= this.towerToPlace.purchaseCost;

    this.isPlacingTower = false;
    this.grid.selectedObject = null;
    this.mouse.left = false;
  }

  update() {
    // Update game logic
    if (this.mouse.isLeftClick) {
      //  Left click
      if (this.isPlacingTower) {
        this.placeTower();
        return;
      }

      let clickedCell: CellType = this.grid.getCell(
        this.mouse.cellX,
        this.mouse.cellY
      );

      if (clickedCell instanceof Tower) {
        this.grid.selectedObject = clickedCell;
        // Check if player or enemy position is clicked
        if (this.grid.isPlayerPosition(this.mouse.cellX, this.mouse.cellY)) {
          this.mouse.left = false;
          return;
        } else if (
          this.grid.isEnemyPosition(this.mouse.cellX, this.mouse.cellY)
        ) {
          this.mouse.left = false;
          return;
        }
      } else {
        this.grid.selectedObject = null;
      }

      this.mouse.left = false;
    }

    if (this.mouse.isRightClick) {
      // Right click
      if (this.isPlacingTower) {
        this.isPlacingTower = false;
        this.towerToPlace = null;
      }
      this.grid.selectedObject = null;
      this.mouse.right = false;
    }
  }

  render() {
    // Render game to canvas
    this.drawGrid();

    this.grid.cells.flat().forEach((cell) => {
      if (cell) {
        this.ctx.fillStyle = cell.fillColor;
        this.ctx.fillRect(cell.col * 50, cell.row * 50, 50, 50);
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#000';
        this.ctx.strokeRect(cell.col * 50, cell.row * 50, 50, 50);

        if (this.grid.isSelectedCell(cell.col, cell.row)) {
          this.ctx.save();
          this.drawSelectionElements(cell);

          this.ctx.restore();
        }
      }
    });

    if (this.mouse.isHoveringCanvas()) {
      if (this.isPlacingTower) {
        const cell = this.mouse.getHoveredCell();
        this.ctx.save();
        this.colorInCell(cell.x, cell.y, this.towerToPlace?.displayColor);

        this.ctx.beginPath();
        this.ctx.strokeStyle = this.towerToPlace.displayColor;
        this.ctx.shadowColor = this.towerToPlace.displayColor;
        this.ctx.arc(
          cell.x * 50 + 25,
          cell.y * 50 + 25,
          this.towerToPlace['level_1'].attackRange * 50,
          0,
          2 * Math.PI
        );
        this.ctx.stroke();
        this.ctx.globalAlpha = 0.075;
        this.ctx.fill();
        this.ctx.restore();
      }

      const cell = this.mouse.getHoveredCell();
      this.colorInCell(cell.x, cell.y);
    }
  }

  drawSelectionElements(cell) {
    let padding = 6;

    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = 'rgba(0, 255, 0, 1)';
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = 'rgba(0, 255, 0)';

    this.ctx.strokeRect(
      cell.col * 50 - padding,
      cell.row * 50 - padding,
      50 + padding * 2,
      50 + padding * 2
    );

    // draw circle for attack range
    if (cell instanceof Tower) {
      this.ctx.beginPath();
      this.ctx.arc(
        cell.col * 50 + 25,
        cell.row * 50 + 25,
        cell.attackRange * 50,
        0,
        2 * Math.PI
      );
      this.ctx.stroke();
      this.ctx.globalAlpha = 0.075;
      this.ctx.fill();
    }
  }

  drawHoveredCell() {}

  upgradeTower() {
    if (this.grid.selectedObject instanceof Tower) {
      let tower = this.grid.selectedObject;
      let data = TowerConfigurations.get(tower.towerType);

      if (tower.currentLevel === 3) return;

      if (tower.currentLevel === 1) {
        if (this.player.money >= data.level_2.upgradeCost) {
          this.player.money -= data.level_2.upgradeCost;
          tower.currentLevel = 2;
          tower.attackDamage = data.level_2.attackDamage;
          tower.attackRange = data.level_2.attackRange;
          tower.fireRate = data.level_2.fireRate;
          tower.sellCost = data.level_2.sellCost;
        }
      } else if (tower.currentLevel === 2) {
        if (this.player.money >= data.level_3.upgradeCost) {
          this.player.money -= data.level_3.upgradeCost;
          tower.currentLevel = 3;
          tower.attackDamage = data.level_3.attackDamage;
          tower.attackRange = data.level_3.attackRange;
          tower.fireRate = data.level_3.fireRate;
          tower.sellCost = data.level_3.sellCost;
        }
      }
    }
  }

  isSelectedTowerMaxLevel() {
    if (this.grid.selectedObject instanceof Tower) {
      return this.grid.selectedObject.currentLevel === 3;
    }
    return false;
  }

  sellTower() {
    if (this.grid.selectedObject instanceof Tower) {
      let tower = this.grid.selectedObject;
      this.player.money += tower.sellCost;
      this.grid.setCell(tower.col, tower.row, null);
      this.grid.selectedObject = null;
    }
  }

  colorInCell(x: number, y: number, color: string = 'rgba(0, 0, 0, 0.04)') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * 50, y * 50, 50, 50);

    // Only draw border and range if placing tower
    if (this.isPlacingTower) {
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = '#000';
      this.ctx.strokeRect(x * 50, y * 50, 50, 50);
    }
  }

  clearCanvas() {
    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
  }
}
