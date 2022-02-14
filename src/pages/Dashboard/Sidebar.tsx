import tw from 'twin.macro';

import sidebarData from './Sidebar.json';

const StyledFilterPart = tw.div`p-4 flex flex-col gap-4`;

const Sidebar = ({
  getFilteredData,
  setFilter1,
  setFilter2,
}: {
  getFilteredData: () => void;
  setFilter1: (value: string) => void;
  setFilter2: (value: string) => void;
}) => {
  return (
    <div>
      <div tw="h-16"></div>
      <StyledFilterPart>
        <select
          defaultValue=""
          tw="px-4 py-2 border"
          onChange={(e) => setFilter1(e.target.value)}
        >
          <option disabled value="">
            Select user
          </option>
          <option value="">[All]</option>
          {sidebarData.users?.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
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
          {sidebarData.ranges?.map((r) => (
            <option key={r.value} value={r.value}>
              {r.title}
            </option>
          ))}
        </select>
        <button tw="px-4 py-2 border" onClick={getFilteredData}>
          Apply
        </button>
      </StyledFilterPart>
    </div>
  );
};

export default Sidebar;
