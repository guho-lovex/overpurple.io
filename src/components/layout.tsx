import React, { useCallback, useState } from 'react';
import { Link } from 'gatsby';
import menuIcon from '../assets/menu-icon.png';
import packUp from '../assets/pack-up.png';
import { ToggleBtn } from './Toggle/Toggle';
import { ThemeProvider } from './theme/ThemeContext';

export const HomeHeader = ({ title, handleClick }: any) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
      <div className="flex items-center z-0">
        <div className="menu-icon mr-3" onClick={handleClick}>
          <img src={menuIcon} alt="目录" />
        </div>
        <ToggleBtn />
      </div>
    </div>
  );
};

export const OtherPageHeader = ({ title, handleClick }: any) => {
  return (
    <div className="flex items-center justify-between">
      <Link className="header-link-home" to="/">
        {title}
      </Link>
      <div className="flex items-center z-0">
        <div className="menu-icon mr-3" onClick={handleClick}>
          <img src={menuIcon} alt="目录" />
        </div>
        <ToggleBtn />
      </div>
    </div>
  );
};

export const MenuOutline = ({ outline, visible, handleClick }: any) => {
  return (
    <div id="content-menu" className="pt-20 absolute">
      <div className="menu_icon" onClick={handleClick}>
        <img src={menuIcon} alt="目录" />
      </div>
      <div
        className={
          visible
            ? 'pl-6 pr-3 absolute menu'
            : 'pl-6 pr-3 absolute menu hide_menu'
        }
      >
        <div
          className="absolute bottom-6 right-6 menu-icon"
          onClick={handleClick}
        >
          <img src={packUp} alt="收起目录" />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: outline ? `<div id='article-outline'>${outline}</div>` : '',
          }}
        />
      </div>
    </div>
  );
};

export const Layout = ({ location, title, outline, children }: any) => {
  const rootPath = `/overpurple.io/`;
  const isRootPath = location?.pathname === rootPath;
  const headerTitle = title?.split('-')[0];
  const [visible, setVisible] = useState(true);

  const handleClick = useCallback(() => {
    setVisible(prev => (prev ? false : true));
  }, []);

  const header = isRootPath ? (
    <HomeHeader title={headerTitle} handleClick={handleClick} />
  ) : (
    <OtherPageHeader title={headerTitle} handleClick={handleClick} />
  );

  return (
    <ThemeProvider>
      <div className="min-w-[375px]">
        <MenuOutline
          outline={outline}
          visible={visible}
          handleClick={handleClick}
        />
        <div className="global-wrapper" data-is-root-path={isRootPath}>
          <header className="flex-1 global-header">{header}</header>
          <main>{children}</main>
          {isRootPath && (
            <footer>
              <a href="https://juejin.cn/user/4283353029944296">掘金</a>
              <> • </>
              <a href="https://github.com/guho-lovex/overpurple.io">github</a>
            </footer>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};
