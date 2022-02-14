import 'twin.macro';

import { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <div tw="relative w-full min-h-[100vh] max-h-[100vh] flex">{children}</div>
  );
};

export default Layout;
