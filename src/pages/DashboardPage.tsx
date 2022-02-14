import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import apiClient from '../api-connect/api-connect';

const StyledPage = tw.div`relative w-full min-h-[100vh] max-h-[100vh] flex`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [filter1, setFilter1] = useState('');
  const [filter2, setFilter2] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const username = localStorage.getItem('username');

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
    } catch (err) {
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
        <div tw="px-4 py-2 capitalize flex justify-end border-b">
          <div>
            Welcome, {username || 'unknown'}
            <br />
            <button tw="underline" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        <div tw="overflow-auto">
          <p>Tabular data:</p>
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
                {filteredData.map(
                  (item: {
                    id: number;
                    name: string;
                    amount: number;
                    record_time: Date;
                  }) => (
                    <tr key={item.id} tw="border-b border-dotted">
                      <td tw="py-2 text-base text-center">{item.id}</td>
                      <td tw="py-2 text-base text-center">{item.name}</td>
                      <td tw="py-2 text-base text-center">{item.amount}</td>
                      <td tw="py-2 text-base text-center">
                        {item.record_time}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <p tw="py-2 text-center">No data</p>
          )}
        </div>
      </div>
    </StyledPage>
  );
};

export default Dashboard;
