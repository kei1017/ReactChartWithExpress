import 'twin.macro';

import { FC } from 'react';

const Layout: FC = ({ children }) => {
  return <div tw="relative">{children}</div>;
};

export default Layout;
