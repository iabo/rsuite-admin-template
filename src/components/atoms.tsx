
import { atom } from 'jotai';
import React, { useState, useRef } from 'react';
import { Affix, Stack, DatePicker, DateRangePicker, IconButton, SelectPicker, InputNumber } from 'rsuite';
import SettingIcon from '@rsuite/icons/Setting';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import { format, getDay, getMonth, getYear } from 'date-fns';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import type { RangeType } from 'rsuite/DateRangePicker';
import ReactJson from 'react-json-view';
import {
  WeekCalculation,
  WeekGrouping,
  LastDayOfWeek,
  LastMonthOfYear,
  RetailCalendarFactory
} from 'retail-calendar';


const currentYear = getYear(new Date());
const currentMonth = getMonth(new Date());
const currentDay = getDay(new Date());

export const calendarAtom = atom(new RetailCalendarFactory({
  weekCalculation: WeekCalculation.LastDayNearestEOM,
  weekGrouping: WeekGrouping.Group445,
  lastDayOfWeek: LastDayOfWeek.Saturday,
  lastMonthOfYear: LastMonthOfYear.December
}, currentYear));