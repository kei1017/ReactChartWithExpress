import tw from 'twin.macro';

import { IFilteredData, ITableMeta } from '../../common/type-defs';

const StyleTableCell = tw.td`py-2 text-base text-center`;
const StyledFooterCell = tw.th`py-2 text-base`;

const TableSection = ({
  data,
  meta,
}: {
  data: IFilteredData[];
  meta: ITableMeta;
}) => {
  return (
    <>
      {' '}
      <p tw="px-4 py-2">Tabular data:</p>
      {data.length > 0 ? (
        <table tw="w-full border-t border-dotted">
          <thead tw="border-b border-dotted">
            <tr>
              <th tw="w-1/12 py-2 text-base">ID</th>
              <th tw="w-3/12 py-2 text-base">Name</th>
              <th tw="w-3/12 py-2 text-base">Amount</th>
              <th tw="w-5/12 py-2 text-base">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: IFilteredData) => (
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
              <StyledFooterCell>{data.length} records</StyledFooterCell>
              <StyledFooterCell>{meta.people} people</StyledFooterCell>
              <StyledFooterCell>{meta.totalAmount}</StyledFooterCell>
              <StyledFooterCell>{meta.days} days</StyledFooterCell>
            </tr>
          </thead>
        </table>
      ) : (
        <p tw="py-2 text-center">No data</p>
      )}
    </>
  );
};

export default TableSection;
