import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'dayDifference'
  })

  export class DayDifferencePipe implements PipeTransform {
    transform(value: Date): number {
      const currentDate = new Date();
      const deadlineDate = new Date(value);
      const differenceInMilliseconds = deadlineDate.getTime() - currentDate.getTime();
      return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    }
  }