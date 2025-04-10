import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcDate',
})
export class calcDatePipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return 'Нет данных о времени поста';

    const currentTime = new Date().getTime();
    const pastTime = new Date(value).getTime();
    const difference = currentTime - pastTime - 10800000;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `${seconds} секунд${seconds % 10 === 1 && seconds % 100 !== 11 ? 'у' : seconds % 10 >= 2 && seconds % 10 <= 4 && (seconds % 100 < 10 || seconds % 100 >= 20) ? 'ы' : ''} назад`;
    } else if (minutes < 60) {
      return `${minutes} минут${minutes % 10 === 1 && minutes % 100 !== 11 ? 'у' : minutes % 10 >= 2 && minutes % 10 <= 4 && (minutes % 100 < 10 || minutes % 100 >= 20) ? 'ы' : ''} назад`;
    } else if (hours < 24) {
      return `${hours} час${hours % 10 === 1 && hours % 100 !== 11 ? '' : hours % 10 >= 2 && hours % 10 <= 4 && (hours % 100 < 10 || hours % 100 >= 20) ? 'а' : 'ов'} назад`;
    } else if (days % 10 === 1) {
      return `${days} день назад`;
    } else {
      return `${days} д${days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20) ? 'ня' : 'ней'} назад`;
    }
  }
}
