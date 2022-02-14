import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import tw from 'twin.macro';

import apiClient from '../api-connect/api-connect';
import PieChart from '../components/PieChart';
import ColumnChart from './../components/ColumnChart';

const StyledPage = tw.div`relative w-full min-h-[100vh] max-h-[100vh] flex`;
const StyleTableCell = tw.td`py-2 text-base text-center`;

export interface IFilteredData {
  id: number;
  name: string;
  amount: number;
  record_time: Date;
}

export interface IPieChartData {
  [key: string]: number;
}

export interface IPieChartRecord {
  category: string;
  value: number;
}

export interface IColumnChartData {
  [key: number]: number;
}

export interface IColumnChartRecord {
  date: number;
  value: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [filter1, setFilter1] = useState('');
  const [filter2, setFilter2] = useState('');
  const [filteredData, setFilteredData] = useState<IFilteredData[]>([]);
  const [pieChartData, setChartData] = useState<IPieChartRecord[]>([]);
  const [columnChartData, setColumnChartData] = useState<IColumnChartRecord[]>(
    []
  );
  const [totalAmount, setTotalAmount] = useState(0);

  const username = localStorage.getItem('username');

  useEffect(() => {
    const pieChartDataTmp: IPieChartData = {};
    const pieChartDataCopy: IPieChartRecord[] = [];
    const columnChartDataTmp: IColumnChartData = {};
    const columnChartDataCopy: IColumnChartRecord[] = [];
    let total = 0;

    for (const item of filteredData) {
      total += item.amount;

      if (pieChartDataTmp[item.name]) {
        pieChartDataTmp[item.name] += item.amount;
      } else {
        pieChartDataTmp[item.name] = item.amount;
      }

      const _date = new Date(item.record_time);
      _date.setHours(0, 0, 0, 0);
      const columnChartDataKey = _date.getTime();
      if (columnChartDataTmp[columnChartDataKey]) {
        columnChartDataTmp[columnChartDataKey] += item.amount;
      } else {
        columnChartDataTmp[columnChartDataKey] = item.amount;
      }
    }

    for (const key of Object.keys(pieChartDataTmp)) {
      pieChartDataCopy.push({
        category: key,
        value: pieChartDataTmp[key],
      });
    }

    for (const strKey of Object.keys(columnChartDataTmp)) {
      const numKey = parseInt(strKey);
      columnChartDataCopy.push({
        date: numKey,
        value: columnChartDataTmp[numKey],
      });
    }

    setTotalAmount(total);
    setChartData(pieChartDataCopy);
    setColumnChartData(columnChartDataCopy);
  }, [filteredData]);

  function logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    navigate('/');
  }

  async function getFilteredData() {
    try {
      const res = await apiClient.post(
        '/filtered-data',
        { filter1, filter2 },
        {
          headers: {
            'x-access-token': 'token-value',
          },
        }
      );
      if (res.data) {
        setFilteredData(res.data);
      }
    } catch (err: any) {
      toast.error(err.toString());
      console.error(err);
    }
  }

  return (
    <StyledPage>
      <div tw="w-1/4 overflow-auto">
        <div tw="h-24"></div>
        <div tw="p-4 flex flex-col gap-4">
          <select
            defaultValue=""
            tw="px-4 py-2 border"
            onChange={(e) => setFilter1(e.target.value)}
          >
            <option disabled value="">
              Select user
            </option>
            <option value="">[All]</option>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Charlie">Charlie</option>
          </select>
          <select
            defaultValue=""
            tw="px-4 py-2 border"
            onChange={(e) => setFilter2(e.target.value)}
          >
            <option disabled value="">
              Select range
            </option>
            <option value="">[All]</option>
            <option value="gte-10000">&gt;= 10,000</option>
            <option value="gte-1000">&gt;= 1,000</option>
            <option value="lt-1000">&lt; 1,000</option>
          </select>
          <button tw="px-4 py-2 border" onClick={getFilteredData}>
            Apply
          </button>
        </div>
      </div>
      <div tw="w-3/4 border-l">
        <div tw="px-4 py-2 max-h-[65px] capitalize flex justify-end border-b">
          <div>
            Welcome, {username || 'unknown'}
            <br />
            <button tw="underline" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        <div tw="max-h-[calc(100vh - 65px)] overflow-auto">
          <div tw="flex">
            <div tw="p-4 w-6/12">
              {pieChartData?.length > 0 ? (
                <PieChart chartID="pie-chart" data={pieChartData} />
              ) : null}
            </div>
            <div tw="p-4 w-6/12">
              {columnChartData?.length > 0 ? (
                <ColumnChart chartID="column-chart" data={columnChartData} />
              ) : null}
            </div>
          </div>
          <p tw="px-4 py-2">Tabular data:</p>
          {filteredData.length > 0 ? (
            <table tw="w-full border-t border-dotted">
              <thead tw="border-b border-dotted">
                <tr>
                  <th tw="w-2/12 py-2 text-base">ID</th>
                  <th tw="w-3/12 py-2 text-base">Name</th>
                  <th tw="w-3/12 py-2 text-base">Amount</th>
                  <th tw="w-4/12 py-2 text-base">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: IFilteredData) => (
                  <tr key={item.id} tw="border-b border-dotted">
                    <StyleTableCell>{item.id}</StyleTableCell>
                    <StyleTableCell>{item.name}</StyleTableCell>
                    <StyleTableCell>{item.amount}</StyleTableCell>
                    <StyleTableCell>
                      {new Date(item.record_time).toLocaleDateString()}
                      &nbsp;
                      {new Date(item.record_time).toLocaleTimeString()}
                    </StyleTableCell>
                  </tr>
                ))}
              </tbody>
              <thead tw="border-b border-dotted">
                <tr>
                  <th tw="py-2 text-base"></th>
                  <th tw="py-2 text-base"></th>
                  <th tw="py-2 text-base">{totalAmount}</th>
                  <th tw="py-2 text-base"></th>
                </tr>
              </thead>
            </table>
          ) : (
            <p tw="py-2 text-center">No data</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </StyledPage>
  );
};

export default Dashboard;
