import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'plural' })
export class PluralPipe implements PipeTransform {
  transform(
    count: number,
    one: string,    // подписчик
    few: string,    // подписчика
    many: string    // подписчиков
  ): string {
    const lastTwo = count % 100;

    if (lastTwo >= 11 && lastTwo <= 19) {
      return `${count} ${many}`;
    }

    const lastDigit = count % 10;
    switch (lastDigit) {
      case 1:  return `${count} ${one}`;
      case 2:
      case 3:
      case 4:  return `${count} ${few}`;
      default: return `${count} ${many}`;
    }
  }
}
