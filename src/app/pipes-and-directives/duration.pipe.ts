import { Pipe, PipeTransform } from '@angular/core';

/*
Currently only transforms Seconds into Minutes
 */
@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number): number {
    return value / 60;
  }
}
