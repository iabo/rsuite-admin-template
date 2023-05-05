import React from 'react';
import { Table, Panel } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const data = [
  {
    id: 1,
    url: '1331',
    visits: '105,253',
    unique: '23,361',
    bounce: '11%'
  },
  {
    id: 2,
    url: '1324',
    visits: '103,643',
    unique: '23,385',
    bounce: '17%'
  },
  {
    id: 3,
    url: '1352',
    visits: '140,013',
    unique: '41,256',
    bounce: '13%'
  },
  {
    id: 4,
    url: '1365',
    visits: '194,532',
    unique: '19,038',
    bounce: '18%'
  },
  {
    id: 5,
    url: '1338',
    visits: '26,353',
    unique: '1,000',
    bounce: '20%'
  },
  {
    id: 6,
    url: '1339',
    visits: '11,973',
    unique: '4,786',
    bounce: '24%'
  }
];

const DataTable = () => {
  return (
    <Panel className="card" header="Demo Table">
      <Table height={300} data={data} rowKey="id">
        <Column flexGrow={1} minWidth={100}>
          <HeaderCell>Field1 </HeaderCell>
          <Cell>
            {rowData => {
              return (
                <a href={rowData.url} target="_blank" rel="noreferrer">
                  {rowData.url}
                </a>
              );
            }}
          </Cell>
        </Column>

        <Column width={130}>
          <HeaderCell>Field 2</HeaderCell>
          <Cell dataKey="visits" />
        </Column>

        <Column width={100}>
          <HeaderCell>Field 3</HeaderCell>
          <Cell dataKey="unique" />
        </Column>

        <Column width={130}>
          <HeaderCell>Field 4</HeaderCell>
          <Cell dataKey="bounce" />
        </Column>
      </Table>
    </Panel>
  );
};

export default DataTable;
