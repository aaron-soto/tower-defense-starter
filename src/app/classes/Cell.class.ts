import { Grid } from '@app/classes/Grid.class';
import { TowerConfigurations } from '@app/data/data';

export class Cell {
  col: number;
  row: number;
  size: 50;
  ctx: CanvasRenderingContext2D;
  fillColor: string;
  displayName: string;
  grid: Grid;

  constructor(config: any) {
    this.col = config.col;
    this.row = config.row;
    this.ctx = config.ctx;
    this.fillColor = config.fillColor || 'red';
    this.displayName = config.displayName || '';
    this.grid = config.grid;
  }
}

export type NewTower = {
  col: number;
  row: number;
  ctx: CanvasRenderingContext2D;
  towerType: string;
  grid: Grid;
};

export class Tower extends Cell {
  sellCost: number;
  purchaseCost: number;
  attackDamage: number;
  attackRange: number;
  fireRate: number;
  shootingCooldown: number;
  lastShotTime: number;
  towerType: string;
  currentLevel: number = 1;

  constructor(config: NewTower) {
    const data = TowerConfigurations.get(config.towerType);
    super({
      col: config.col,
      row: config.row,
      ctx: config.ctx,
      fillColor: data.displayColor,
      displayName: data.displayName,
      grid: config.grid,
    });
    this.sellCost = data[`level_${this.currentLevel}`].sellCost;
    this.purchaseCost = data.purchaseCost;
    this.attackDamage = data[`level_${this.currentLevel}`].attackDamage;
    this.attackRange = data[`level_${this.currentLevel}`].attackRange;
    this.fireRate = data[`level_${this.currentLevel}`].fireRate;
    this.shootingCooldown = 0;
    this.lastShotTime = 0;
    this.towerType = config.towerType;

    this.grid.setCell(this.col, this.row, this);
  }

  getNextLevelValue() {
    if (this.currentLevel === 3) {
      return null;
    }

    const data = TowerConfigurations.get(this.towerType);
    return data[`level_${this.currentLevel + 1}`];
  }
}

export class BaseCamp extends Cell {
  campType: 'player' | 'enemy';

  constructor(config: any) {
    super({
      col: config.col,
      row: config.row,
      ctx: config.ctx,
      fillColor: config.campType === 'player' ? 'green' : 'red',
      displayName: config.campType === 'player' ? 'Player Base' : 'Enemy Base',
      grid: config.grid,
    });
    this.campType = config.campType;
  }
}
