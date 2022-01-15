import { eachDayOfInterval, format } from 'date-fns';

import { MarkedDateProps, DayProps } from '.';
import { getPlatformDate } from '../../utils/getPlatformDate'
import theme from '../../styles/theme';

export function generateInterval(start: DayProps, end: DayProps){
  let interval: MarkedDateProps = {};

  eachDayOfInterval({start: new Date(start.timestamp), end: new Date(end.timestamp)}).forEach((item) => {
    const date = format(getPlatformDate(item), 'yyyy-MM-dd');

    interval = {
      ...interval,
      [date]: {
        startingDay: start.dateString === date ? true : undefined,

        endingDay: end.dateString === date ? true : undefined,
        selected: end.dateString === date ? true : undefined,

        textColor: start.dateString === date || end.dateString === date
        ? theme.colors.main_light : theme.colors.main,

        color: start.dateString === date || end.dateString === date
        ? theme.colors.main : theme.colors.main_light,
      }
    }
  });

  return interval;
}