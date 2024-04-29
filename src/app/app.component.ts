import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Tower } from '@app/classes/Cell.class';
import { Overworld } from '@app/classes/Overworld.class';
import { TowerConfigurations, TowerConfiguration } from '@app/data/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('gameCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  public ctx!: CanvasRenderingContext2D;
  public overworld!: Overworld;
  towerConfigurations: Map<string, TowerConfiguration> = TowerConfigurations;

  constructor(public cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    this.overworld = new Overworld({
      canvas: this.canvas,
    });

    this.overworld.init();

    this.towerConfigurations = TowerConfigurations;
    this.cdr.detectChanges();
  }

  get selectedObject() {
    return this.overworld?.grid?.selectedObject as any;
  }

  isSelectedTypeOfTower() {
    return;
  }

  get sortedTowers() {
    return Array.from(this.towerConfigurations.entries()).sort(
      ([, b], [, a]) => b.purchaseCost - a.purchaseCost
    );
  }

  getTowerConfig(name: string): TowerConfiguration {
    return this.towerConfigurations.get(name) as TowerConfiguration;
  }

  startPlacingTower(towerName: string) {
    if (this.overworld.isPlacingTower) {
      if (this.overworld.towerToPlace?.key === towerName) {
        this.overworld.isPlacingTower = false;
        this.overworld.towerToPlace = null;
        this.cdr.detectChanges();
        return;
      }
      this.overworld.towerToPlace = this.getTowerConfig(towerName);
      this.cdr.detectChanges();
      return;
    }
    this.overworld.isPlacingTower = true;
    this.overworld.towerToPlace = this.getTowerConfig(towerName);
    this.cdr.detectChanges();
  }
}
