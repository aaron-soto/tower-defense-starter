import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (value >= 1e12) {
      return (value / 1e12).toFixed(1) + 'T';
    } else if (value >= 1e9) {
      return (value / 1e9).toFixed(1) + 'B';
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + 'M';
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(1) + 'k';
    } else {
      return value.toString();
    }
  }
}
