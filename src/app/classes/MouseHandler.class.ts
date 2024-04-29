import { ElementRef } from '@angular/core';

export class MouseHandler {
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  x: number | null;
  y: number | null;
  cellX: number;
  cellY: number;
  left: boolean;
  right: boolean;

  constructor(config: any) {
    this.canvas = config.canvas;
    this.ctx = config.ctx;
    this.x = null;
    this.y = null;
    this.cellX = 0;
    this.cellY = 0;
    this.left = false;
    this.right = false;

    this.canvas.nativeElement.addEventListener(
      'mousemove',
      (event: MouseEvent) => {
        if (this.isHoveringCanvas) {
          this.x = event.offsetX;
          this.y = event.offsetY;

          this.cellX = Math.floor(this.x / 50);
          this.cellY = Math.floor(this.y / 50);
        } else {
          this.x = null;
          this.y = null;
        }
      }
    );

    this.canvas.nativeElement.addEventListener(
      'mousedown',
      (event: MouseEvent) => {
        if (event.button === 0 && !this.left) {
          this.left = true;
        } else if (event.button === 2) {
          event.preventDefault();
          this.right = true;
        }
      }
    );

    this.canvas.nativeElement.addEventListener(
      'contextmenu',
      (event: MouseEvent) => {
        event.preventDefault();
      }
    );

    this.canvas.nativeElement.addEventListener(
      'mouseup',
      (event: MouseEvent) => {
        if (event.button === 0) {
          this.left = false;
        } else if (event.button === 2) {
          this.right = false;
        }
      }
    );
  }

  get isLeftClick() {
    return this.left;
  }

  get isRightClick() {
    return this.right;
  }

  isHoveringCanvas() {
    return (
      this.x > 0 &&
      this.y > 0 &&
      this.x < this.canvas.nativeElement.width &&
      this.y < this.canvas.nativeElement.height
    );
  }

  getHoveredCell() {
    return {
      x: this.cellX,
      y: this.cellY,
    };
  }
}
