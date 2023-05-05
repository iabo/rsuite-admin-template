import React from 'react';
import { Row, Col, Panel, ButtonGroup, Button } from 'rsuite';
import * as images from '../../images/charts';
import BarChart from './BarChart';
import PieChart from './PieChart';
import DataTable from './DataTable';
import ReactJson from 'react-json-view';
// import useOrySession from './hooks/useOrySession';
import {
  WeekCalculation,
  WeekGrouping,
  LastDayOfWeek,
  LastMonthOfYear,
  RetailCalendarFactory
} from 'retail-calendar';

import { useAtom } from 'jotai';
import { calendarAtom } from '@/components/atoms';

const barChartData = [
  {
    name: 'Web',
    data: [
      11, 8, 9, 10, 3, 11, 11, 11, 12, 13, 2, 12, 5, 8, 22, 6, 8, 6, 4, 1, 8, 24, 29, 51, 40, 47,
      23, 26, 50, 26, 22, 27, 46, 47, 81, 46, 40
    ]
  },
  {
    name: 'Social',
    data: [
      7, 5, 4, 3, 3, 11, 4, 7, 5, 12, 12, 15, 13, 12, 6, 7, 7, 1, 5, 5, 2, 12, 4, 6, 18, 3, 5, 2,
      13, 15, 20, 47, 18, 15, 11, 10, 9
    ]
  },
  {
    name: 'Other',
    data: [
      4, 9, 11, 7, 8, 3, 6, 5, 5, 4, 6, 4, 11, 10, 3, 6, 7, 5, 2, 8, 4, 9, 9, 2, 6, 7, 5, 1, 8, 3,
      12, 3, 4, 9, 7, 11, 10
    ]
  }
];

  const calendar = new RetailCalendarFactory(
    {
      weekCalculation: WeekCalculation.LastDayNearestEOM,
      weekGrouping: WeekGrouping.Group445,
      lastDayOfWeek: LastDayOfWeek.Saturday,
      lastMonthOfYear: LastMonthOfYear.December
      // leapYearStrategy: LeapYearStrategy.DropLastWeek // deprecated: restated: false
    },
    2021
  );

const Dashboard = () => {
    const [calendar, setCalendar] = useAtom(calendarAtom);
  return (
    <>


      <Row gutter={30}>
        <Col xs={16}>
                  <ReactJson
        src={calendar}
        theme="harmonic"
        iconStyle="square"
        indentWidth="2"
        collapsed="1"
        name="Retail Calendar"
      />
        </Col>
        <Col xs={8}>
          <PieChart
            title="Demo Doughnut"
            data={[112332, 123221, 432334, 342334, 133432]}
            type="donut"
            labels={['Label1', 'Label2', 'Label3', 'Label4', 'Label5']}
          />
        </Col>
      </Row>
      <Row gutter={30}>
        <Col xs={16}>
                    <DataTable />
        </Col>
        <Col xs={8}>
          <PieChart
            title="Demo Pie Chart"
            data={[10000, 3000, 2000, 1000, 900]}
            type="pie"
            labels={['Label1', 'Label2', 'Label3', 'Label4', 'Label5']}
          />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
