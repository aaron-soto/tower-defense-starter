import { Tower, BaseCamp, Cell } from '@app/classes/Cell.class';

export enum COLORS {
  DEEP_PURPLE = '#5e315b',
  SOFT_CRIMSON = '#8c3f5d',
  WARM_ROSE = '#ba6156',
  SUNNY_ORANGE = '#f2a65e',
  LIGHT_SUNSHINE = '#ffe478',
  FRESH_LIME = '#cfff70',
  LIGHT_GREEN = '#8fde5d',
  FOREST_GREEN = '#3ca370',
  OCEAN_BLUE = '#3d6e70',
  MIDNIGHT_BLUE = '#323e4f',
  VIOLET_DARK = '#322947',
  INDIGO_DUSK = '#473b78',
  AZURE_SKY = '#4b5bab',
  BRIGHT_BLUE = '#4da6ff',
  AQUA_LIGHT = '#66ffe3',
  PALE_IVORY = '#ffffeb',
  CLOUDY_GREY = '#c2c2d1',
  STORMY_GREY = '#7e7e8f',
  TWILIGHT_GREY = '#606070',
  SHADOW_GREY = '#43434f',
  NIGHT_BLACK = '#272736',
  DARK_MAGENTA = '#3e2347',
  RICH_MAROON = '#57294b',
  REDDISH_BROWN = '#964253',
  CORAL_RED = '#e36956',
  GOLDEN_SUNSET = '#ffb570',
  PEACHY_ORANGE = '#ff9166',
  TOMATO_RED = '#eb564b',
  BERRY_RED = '#b0305c',
  PLUM_PURPLE = '#73275c',
  DARK_ORCHID = '#422445',
  MAJESTIC_PURPLE = '#5a265e',
  ROYAL_MAGENTA = '#80366b',
  VIBRANT_PINK = '#bd4882',
  SOFT_PINK = '#ff6b97',
  BLUSHING_ROSE = '#ffb5b5',
  PURE_BLACK = '#000000',
  MAIN_BG = '#2F2F2F',
}
export type TowerConfiguration = {
  displayName: string;
  key: string;
  purchaseCost: number;
  displayColor: string;
  level_1: {
    sellCost: number;
    attackDamage: number;
    attackRange: number;
    fireRate: number;
  };
  level_2: {
    upgradeCost: number;
    sellCost: number;
    attackDamage: number;
    attackRange: number;
    fireRate: number;
  };
  level_3: {
    upgradeCost: number;
    sellCost: number;
    attackDamage: number;
    attackRange: number;
    fireRate: number;
  };
};

export const TowerConfigurations = new Map<string, TowerConfiguration>([
  [
    'laser',
    {
      displayName: 'Laser Tower',
      key: 'laser',
      purchaseCost: 100,
      displayColor: COLORS.SOFT_CRIMSON,
      level_1: {
        sellCost: 75,
        attackDamage: 15,
        attackRange: 3,
        fireRate: 0.25,
      },
      level_2: {
        sellCost: 150,
        attackDamage: 25,
        attackRange: 4,
        fireRate: 0.25,
        upgradeCost: 50, // Added upgrade cost
      },
      level_3: {
        sellCost: 225,
        attackDamage: 40,
        attackRange: 5,
        fireRate: 0.25,
        upgradeCost: 75, // Added upgrade cost
      },
    },
  ],
  [
    'missile',
    {
      displayName: 'Missile Tower',
      key: 'missile',
      purchaseCost: 150,
      displayColor: COLORS.AZURE_SKY,
      level_1: {
        sellCost: 112,
        attackDamage: 25,
        attackRange: 4,
        fireRate: 0.2,
      },
      level_2: {
        sellCost: 225,
        attackDamage: 35,
        attackRange: 5,
        fireRate: 0.2,
        upgradeCost: 75, // Added upgrade cost
      },
      level_3: {
        sellCost: 337,
        attackDamage: 50,
        attackRange: 6,
        fireRate: 0.2,
        upgradeCost: 112, // Added upgrade cost
      },
    },
  ],
  [
    'cannon',
    {
      displayName: 'Cannon Tower',
      key: 'cannon',
      purchaseCost: 200,
      displayColor: COLORS.TOMATO_RED,
      level_1: {
        sellCost: 150,
        attackDamage: 35,
        attackRange: 5,
        fireRate: 0.15,
      },
      level_2: {
        sellCost: 300,
        attackDamage: 50,
        attackRange: 6,
        fireRate: 0.15,
        upgradeCost: 100, // Added upgrade cost
      },
      level_3: {
        sellCost: 450,
        attackDamage: 70,
        attackRange: 7,
        fireRate: 0.15,
        upgradeCost: 150, // Added upgrade cost
      },
    },
  ],
  [
    'sniper',
    {
      displayName: 'Sniper Tower',
      key: 'sniper',
      purchaseCost: 250,
      displayColor: COLORS.OCEAN_BLUE,
      level_1: {
        sellCost: 187,
        attackDamage: 60,
        attackRange: 7,
        fireRate: 0.1,
      },
      level_2: {
        sellCost: 375,
        attackDamage: 90,
        attackRange: 8,
        fireRate: 0.1,
        upgradeCost: 125, // Added upgrade cost
      },
      level_3: {
        sellCost: 562,
        attackDamage: 120,
        attackRange: 9,
        fireRate: 0.1,
        upgradeCost: 187, // Added upgrade cost
      },
    },
  ],
  [
    'machine-gun',
    {
      displayName: 'Machine Gun Tower',
      key: 'machine-gun',
      purchaseCost: 300,
      displayColor: COLORS.INDIGO_DUSK,
      level_1: {
        sellCost: 225,
        attackDamage: 30,
        attackRange: 6,
        fireRate: 0.08,
      },
      level_2: {
        sellCost: 450,
        attackDamage: 45,
        attackRange: 7,
        fireRate: 0.08,
        upgradeCost: 150, // Added upgrade cost
      },
      level_3: {
        sellCost: 675,
        attackDamage: 60,
        attackRange: 8,
        fireRate: 0.08,
        upgradeCost: 225, // Added upgrade cost
      },
    },
  ],
  [
    'flame-thrower',
    {
      displayName: 'Flame Thrower Tower',
      key: 'flame-thrower',
      purchaseCost: 350,
      displayColor: COLORS.CORAL_RED,
      level_1: {
        sellCost: 262,
        attackDamage: 35,
        attackRange: 8,
        fireRate: 0.05,
      },
      level_2: {
        sellCost: 525,
        attackDamage: 50,
        attackRange: 9,
        fireRate: 0.05,
        upgradeCost: 175, // Added upgrade cost
      },
      level_3: {
        sellCost: 787,
        attackDamage: 70,
        attackRange: 10,
        fireRate: 0.05,
        upgradeCost: 262, // Added upgrade cost
      },
    },
  ],
]);

export type SelectedObject = Tower | BaseCamp;

export type CellType = Tower | BaseCamp | Cell | null;

export type Level = {
  enemyPos: { col: number; row: number };
  playerPos: { col: number; row: number };
};

export const LevelMaps = new Map<string, Level>([
  [
    'level-1',
    {
      enemyPos: { col: 1, row: 1 },
      playerPos: { col: 13, row: 8 },
    },
  ],
]);
