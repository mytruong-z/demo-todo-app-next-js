import React from 'react';
import Link from 'next/link';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="page">
      <Link href="/">
          <a className="logo">
              <span className="title text-center text-green-500 mt-20 mb-5 font-weigh-boil hidden md:block invisible md:visible">Mananger Todo List</span>
              <img className="logo-browser" src="/logo.png" alt="logo" />
              <img className="md:hidden md:invisible" src="/mobile-logo.jpeg" alt="logo" />

          </a>
      </Link>
      {children}
    </div>
  );
};

export default Layout;
