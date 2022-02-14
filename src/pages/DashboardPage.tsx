import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import tw from 'twin.macro';

import apiClient from '../api-connect/api-connect';

const StyledPage = tw.div`relative w-full min-h-[100vh] max-h-[100vh] flex`;
const StyleTableCell = tw.td`py-2 text-base text-center`;

export interface IFilteredData {
  id: number;
  name: string;
  amount: number;
  record_time: Date;
}

export interface IGraphData {
  [key: string]: number;
}

export interface IGraphRecord {
  color: string;
  title: string;
  value: number;
}

const COLORS = ['#E38627', '#C13C37', '#6A2135'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [filter1, setFilter1] = useState('');
  const [filter2, setFilter2] = useState('');
  const [filteredData, setFilteredData] = useState<IFilteredData[]>([]);
  const [graphData, setGraphData] = useState<IGraphRecord[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const username = localStorage.getItem('username');

  useEffect(() => {
    const graphDataTmp: IGraphData = {};
    const graphDataCopy: IGraphRecord[] = [];
    let total = 0;
    for (let i = 0; i < filteredData.length; i += 1) {
      total += filteredData[i].amount;
      if (graphDataTmp[filteredData[i].name]) {
        graphDataTmp[filteredData[i].name] += filteredData[i].amount;
      } else {
        graphDataTmp[filteredData[i].name] = filteredData[i].amount;
      }
    }

    for (let i = 0; i < Object.keys(graphDataTmp).length; i += 1) {
      const key = Object.keys(graphDataTmp)[i];
      graphDataCopy.push({
        color: COLORS[i],
        title: key,
        value: graphDataTmp[key],
      });
    }
    setGraphData(graphDataCopy);
    setTotalAmount(total);
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
          <div tw="p-4 w-full max-w-xs">
            <PieChart
              animate
              data={graphData}
              lineWidth={75}
              segmentsStyle={{ cursor: 'pointer', transition: 'stroke .3s' }}
              totalValue={totalAmount}
            />
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
