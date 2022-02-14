import 'react-splitter-layout/lib/index.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplitterLayout from 'react-splitter-layout';
import { toast, ToastContainer } from 'react-toastify';
import tw from 'twin.macro';

import apiClient from '../../api-connect/api-connect';
import {
  IColumnChartData,
  IColumnChartRecord,
  IFilteredData,
  IPieChartData,
  IPieChartRecord,
} from '../../common/type-defs';
import ColumnChart from '../../components/ColumnChart';
import PieChart from '../../components/PieChart';
import Sidebar from './Sidebar';
import TableSection from './TableSection';

const StyledHeader = tw.div`px-4 py-2 max-h-[65px] capitalize flex justify-end border-b`;

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
    <SplitterLayout
      percentage={false}
      primaryIndex={1}
      secondaryInitialSize={250}
      secondaryMinSize={250}
    >
      <Sidebar
        getFilteredData={getFilteredData}
        setFilter1={setFilter1}
        setFilter2={setFilter2}
      />
      <div>
        <StyledHeader>
          <div>
            Welcome, {username || 'unknown'}
            <br />
            <button tw="underline" onClick={logout}>
              Logout
            </button>
          </div>
        </StyledHeader>
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
          <TableSection
            data={filteredData}
            meta={{
              days: columnChartData.length,
              people: pieChartData.length,
              totalAmount,
            }}
          />
        </div>
      </div>
      <ToastContainer />
    </SplitterLayout>
  );
};

export default Dashboard;
