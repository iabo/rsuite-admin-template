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
import { useAtom } from 'jotai';
import { calendarAtom } from './atoms';
import { Modal,   Form , Button } from 'rsuite';
import { Input, Whisper, Tooltip } from 'rsuite';
import {  } from 'rsuite';


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

interface Range extends RangeType {
  appearance?: 'default' | 'primary' | 'link' | 'subtle' | 'ghost';
}

const predefinedRanges: Range[] = [
  {
    label: 'Last week',
    closeOverlay: false,
    value: value => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), -7)
      ];
    },
    appearance: 'default'
  },
  {
    label: 'This week',
    closeOverlay: false,
    value: value => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), 7)
      ];
    },
    appearance: 'default'
  },
    {
    label: 'Next week',
    closeOverlay: false,
    value: value => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), 7)
      ];
    },
    appearance: 'default'
  }

];

///////////////////!SECTION /////////!SECTION//////////// ////////////!SECTION//////////!SECTION////////  
const PageToolbar = () => {
  const [fixed, setFixed] = useState<boolean | undefined>(false);
  const [selectedValue, setSelectedValue] = useState('Manual');
  const [dateRangeValue, setDateRangeValue] = useState([new Date(), new Date()]);
  const [year, setYear] = useState(currentYear);
    const [calendar, setCalendar] = useAtom(calendarAtom);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleYearChange = (value) => {
    setCalendar(new RetailCalendarFactory({
      weekCalculation: WeekCalculation.LastDayNearestEOM,
      weekGrouping: WeekGrouping.Group445,
      lastDayOfWeek: LastDayOfWeek.Saturday,
      lastMonthOfYear: LastMonthOfYear.December
    }, value));
  console.log(calendar);
  };
  
  // const handleYearChange = (value) => {
  //   setYear(value);
  // };
  
  // const calendar = new RetailCalendarFactory(
    
  //   {
  //     weekCalculation: WeekCalculation.LastDayNearestEOM,
  //     weekGrouping: WeekGrouping.Group445,
  //     lastDayOfWeek: LastDayOfWeek.Saturday,
  //     lastMonthOfYear: LastMonthOfYear.December
  //     // leapYearStrategy: LeapYearStrategy.DropLastWeek // deprecated: restated: false
  //   },
  //   year
  //   );
    
 const handleSelectChange = value => {
    setSelectedValue(value);
  };
  const datos = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
  item => ({ label: item, value: item })
);

    const renderDateRangePicker = () => {
    switch (selectedValue) {
      case 'Manual':
        return (
          <Stack direction="row" spacing={10}>
      <InputNumber placeholder="Year" defaultValue={calendar.year} onChange={handleYearChange}/>
      <SelectPicker data={datos} style={{ width: 224 }} searchable={false} placeholder="Month"/>
      <InputNumber placeholder="Week" min={1} max={52}/>
          </Stack>
        );
      case 'All':
        return (
          <DateRangePicker
            appearance="subtle"
            // defaultValue={[moment('2020-01-01').toDate(), moment().toDate()]}
            oneTap
            showWeekNumbers
            hoverRange="week"
            ranges={predefinedRanges}
            container={() => containerRef.current as HTMLDivElement}
          />
        );
      case 'Yearly':
        return (
          <Stack direction="row" spacing={10}>
      <InputNumber placeholder="Year" defaultValue={calendar.year} onChange={handleYearChange} />
          </Stack>
        );
      case 'Monthly':
        return (
          <DatePicker
            placeholder="Select Month"
            format="MMMM, yyyy"
            // ranges={predefinedRanges}
            container={() => containerRef.current as HTMLDivElement}
            onChange={()=>{}}
          />
        );
      case 'Weekly':
        return (
          <DateRangePicker
            appearance="subtle"
            // defaultValue={dateRangeValue}
            oneTap
            hoverRange="week"
            ranges={predefinedRanges}
            container={() => containerRef.current as HTMLDivElement}
            // onChange={(value) => setDateRangeValue(value)}
          />
        );
      case 'Custom':
        return (
          <DateRangePicker
            appearance="subtle"
            // defaultValue={dateRangeValue}
            // ranges={predefinedRanges}
            container={() => containerRef.current as HTMLDivElement}
            // onChange={(value) => setDateRangeValue(value)}
          />
        );
      default:
        return null;
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Affix onChange={setFixed}>
      <Stack
        spacing={10}
        justifyContent="space-between"
        ref={containerRef}
        style={{
          position: 'relative',
          background: '#fff',
          marginBottom: 20,
          padding: 4,
          borderRadius: fixed ? 0 : 6,
          boxShadow: fixed ? '0 0 15px 0 rgb(0 0 0 / 10%)' : undefined
        }}
      >
        <Stack spacing={10}>
          <SelectPicker
            defaultValue='Manual'
            cleanable={false}
            searchable={false}
            appearance="subtle"
            onChange={handleSelectChange}
            container={() => containerRef.current as HTMLDivElement}
            data={[
              { label: 'Manual Entry', value: 'Manual' },
              { label: 'All time', value: 'All' },
              { label: 'Yearly', value: 'Yearly' },
              { label: 'Monthly', value: 'Monthly' },
              { label: 'Weekly', value: 'Weekly' },
              { label: 'Custom Range', value: 'Custom' },
            ]}
          />
          {renderDateRangePicker()}
          {/* <DateRangePicker
            appearance="subtle"
            defaultValue={[new Date(), new Date()]}
            oneTap
            showWeekNumbers
            hoverRange="week"
            ranges={predefinedRanges}
            container={() => containerRef.current as HTMLDivElement}
          /> */}
        </Stack>

      <Modal open={open} onClose={handleClose}>
                <Modal.Header>
          <Modal.Title>Retail Calendar Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form 
         disabled={true}
        readOnly={true}
        fluid >
            <Form.Group controlId="Week-Calculation">
              <Form.ControlLabel>Week Calculation</Form.ControlLabel>
              <Form.Control name="Week-Calculation" placeholder="Last Day Nearest EOM"/>
              <Form.HelpText>Last Day Before EOM, 
    Last Day Before EOM Except Leap Year, <br></br>
    Last Day Nearest EOM ,
    First BOW Of First Month</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="Week Grouping">
              <Form.ControlLabel>Week Grouping</Form.ControlLabel>
              <Form.Control name="Week Grouping" placeholder="4-4-5" />
                            <Form.HelpText>  4-4-5, 5-4-4, 4-5-4</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="lastDayOfWeek-9">
              <Form.ControlLabel>last Day Of Week</Form.ControlLabel>
              <Form.Control name="lastDayOfWeek" placeholder="Saturday" />
            </Form.Group>
            <Form.Group controlId="lastMonthOfYear-9">
              <Form.ControlLabel>last Month Of Year</Form.ControlLabel>
              <Form.Control  name="lastMonthOfYear"  placeholder="December"/>
            </Form.Group>
  </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
        <IconButton icon={<SettingIcon style={{ fontSize: 20 }} onClick={handleOpen} />} />
      </Stack>
    </Affix>
  );
};

export default PageToolbar;