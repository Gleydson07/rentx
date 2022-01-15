import React from 'react';
import {
  Calendar as CustomCalendar,
  LocaleConfig
} from 'react-native-calendars';
import {Feather} from '@expo/vector-icons';
import {useTheme} from 'styled-components';
import {generateInterval} from './generateInterval'
import {ptBR} from './localeConfig';

import { DateData } from 'react-native-calendars/src/types';

interface MarkedDateProps {
  [date: string]: {
    textColor?: string;
    color?: string;
    startingDay?: boolean,
    endingDay?: boolean,
    selected?: boolean
    selectedColor?: string;
    selectedTextColor?: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  }
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (date: DateData) => void;
}
LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

function Calendar({markedDates, onDayPress}: CalendarProps){
  const theme = useTheme();

  return (
      <CustomCalendar
        renderArrow={(direction) => 
          <Feather
            name={direction === "left" ? "chevron-left" : "chevron-right"}
            color={theme.colors.text}
            size={24}
          />
        }

        headerStyle={{
          backgroundColor: theme.colors.background_secondary,
          borderBottomWidth: 0.5,
          borderBottomColor: theme.colors.text_detail,
          paddingBottom: 10,
          marginBottom: 10,
        }}

        theme={{
          textDayFontFamily: theme.fonts.primary_400,
          textDayHeaderFontFamily: theme.fonts.primary_500,
          textDayHeaderFontSize: 10,
          textMonthFontSize: 20,
          textMonthFontFamily: theme.fonts.secondary_600,
          monthTextColor: theme.colors.title,
          arrowStyle: {
            marginHorizontal: -15
          }
        }}

        firstDay={1}
        minDate={String(new Date())}
        markingType='period'
        markedDates={markedDates}
        onDayPress={onDayPress}
      />
  );
} 

export {
  Calendar,
  MarkedDateProps,
  DayProps,
  generateInterval
}