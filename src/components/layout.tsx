import React from 'react';
import { Link } from 'gatsby';
import { isBrowser } from '../utils/const';
import { ToggleBtn } from './Toggle/Toggle';
import { ThemeProvider } from './theme/ThemeContext';

export const HomeHeader = ({ title }: any) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
      <ToggleBtn />
    </div>
  );
};

export const OtherPageHeader = ({ title }: any) => {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const allCodeNode = window.document.querySelectorAll(
        'code[class*="language-"]'
      );
      console.log('-----allCodeNode', allCodeNode);
    }
  }, []);
  return (
    <div className="flex items-center justify-between">
      <Link className="header-link-home" to="/">
        {title}
      </Link>
      <ToggleBtn />
    </div>
  );
};

export const Layout = ({ location, title, outline, children }: any) => {
  const rootPath = `/overpurple.io/`;
  const isRootPath = location?.pathname === rootPath;

  const header = isRootPath ? (
    <HomeHeader title={title} />
  ) : (
    <OtherPageHeader title={title} />
  );

  console.log('---outline', outline);

  const transformVNode = (children: any): any => {
    if (children == null || typeof children !== 'object') {
      return null;
    }
    if (Array.isArray(children)) {
      return children.map(transformVNode);
    }
    const { type, props, ...restProps } = children;
    if (type === 'ol') {
      const { children: propsChildren, ...rest } = props;
      if (Array.isArray(propsChildren)) {
        const vNodeChildren = propsChildren.map(x => {
          const childProps = x?.props;
          const childNode = childProps?.children;
          const grandChildProps = childNode?.props;
          const grandChildNode = childNode?.props?.children;

          if (Array.isArray(grandChildNode)) {
            const grandson = grandChildNode.filter(
              cur => cur.type === 'header'
            );
            const outlineTextNode = grandson[0]?.props?.children?.filter(
              (cur: any) => cur.type === 'h2'
            );

            const grandsonNode = {
              ...grandson[0],
              props: {
                ...grandson[0].props,
                children: {
                  ...outlineTextNode[0],
                  type: 'p',
                },
              },
            };

            return {
              ...x,
              props: {
                ...childProps,
                children: {
                  ...childNode,
                  props: {
                    ...grandChildProps,
                    children: grandsonNode,
                  },
                },
              },
            };
          }
        });

        console.log('00000000vNode', vNodeChildren);

        return {
          type,
          props: { ...rest, children: vNodeChildren },
          ...restProps,
        };
      }
    }

    if (type === 'article') {
      const { children } = props;
      if (Array.isArray(children)) {
        const grandson = children.filter(x => x.type === 'section');
        const content = grandson[0]?.props?.dangerouslySetInnerHTML.__html;

        if (isBrowser) {
          const placeholder = document.createElement('div');
          // placeholder.setAttribute('id', 'content');
          // placeholder.insertAdjacentHTML('afterbegin', content);
          placeholder.innerHTML = content;

          // const vDOM = content.match(/<(h\d).*?>.*?<\/h\d>/g);

          // console.log('-------vDOM', vDOM);

          return content;
        }
      }
    }
  };

  const outlineData = transformVNode(children);
  console.log('---outlineData', outlineData);

  const list = [
    { name: 'A', level: 0 },
    { name: 'B', level: 0 },
    { name: 'b1', level: 1 },
    { name: 'b2', level: 1 },
    { name: 'b2-1', level: 2 },
    { name: 'b2-2', level: 2 },
    { name: 'b2-3', level: 2 },
    { name: 'b3', level: 1 },
    { name: 'C', level: 0 },
    { name: 'c1', level: 1 },
  ];

  function listToTree(list: any) {
    const arr = [];
    const template = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];

      if (arr.length < 1 || arr[arr.length - 1].level === item.level) {
        arr.push(item);
      }

      if (arr[arr.length - 1].level < item.level) {
        console.log('--------', item);
        console.log('--------template', template);
        template.push(item);
      } else {
        const temp = [];
        while (
          arr &&
          arr.length > 0 &&
          arr[arr.length - 1].level > item.level
        ) {
          temp.unshift(arr.pop());
        }

        arr[arr.length - 1].children = temp;

        arr.push(item);
      }
    }
    return arr;
  }

  console.log('------listToTree(list)', listToTree(list));

  // function dataToTree(data) {
  //   const arr = [];
  //   for (let i = 0; i < data.length; i++) {
  //     const item = data[i];

  //     console.log('-----arr 栈顶', arr.length > 0 && arr[arr.length - 1].level);

  //     if (arr.length < 1 || arr[arr.length - 1].level === item.level) {
  //       console.log('------item', item);
  //       arr.push(item);
  //     } else {
  //       const temp = [];
  //       while (
  //         arr &&
  //         arr.length > 0 &&
  //         arr[arr.length - 1].level > item.level
  //       ) {
  //         temp.unshift(arr.pop());
  //       }

  //       if (arr[arr.length - 1].level < item.level) {
  //         console.log('------item++++', item);
  //       }

  //       arr[arr.length - 1].children = temp;
  //       arr.push(item);
  //     }
  //   }
  //   return arr;
  // }

  // console.log('---------tree', dataToTree(sourceData));

  return (
    <ThemeProvider>
      <div>
        <div
          id="content-menu"
          className="max-w-[815px]  pt-10 pl-6 pr-3 absolute"
          dangerouslySetInnerHTML={{
            __html: outline ? `<div id='article-outline'>${outline}</div>` : '',
          }}
        />
        <div className="global-wrapper" data-is-root-path={isRootPath}>
          <header className="global-header">{header}</header>
          <main>{children}</main>
          {isRootPath && (
            <footer>
              <a href="https://juejin.cn/user/4283353029944296">掘金</a>
              <> • </>
              <a href="https://github.com/lovexueorangecat/overpurple.io">
                github
              </a>
            </footer>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};
