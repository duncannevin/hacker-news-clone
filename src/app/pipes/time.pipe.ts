import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(unix: number, ...args: any[]): any {
    return moment(unix, 'X').fromNow();
  }
}
