'use client';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  RenderExpandIconParams,
} from 'react-pro-sidebar';
import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '../ui/icons';
import { Flex } from '@radix-ui/themes';
import { cn } from '../../utils/cn';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../stores';
import { setCollapsed } from '../../stores/reducers/layout.reducer';
import { Menu as MenuType } from '../../types/base.types';
import { useGetTransactionsWithdrawQuery } from '../../stores/reducers/transactions-withdraw.reducer';

const removeExactDuplicates = (menuData: MenuType[]): MenuType[] => {
  const seen = new Set<string>();
  return menuData.filter((menu) => {
    const key = menu.name;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

const SideBar = (props: { menuData: MenuType[] }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const filteredMenuData = removeExactDuplicates(props.menuData);

  const collapsed = useAppSelector((state) => state.layout.collapsed);

  const { data: pendingWithdrawData } = useGetTransactionsWithdrawQuery({
    pageIndex: 1,
    rowPerPage: 20,
    word: '',
    status: 'PENDING',
    date: '',
  });
  const { data: acceptedWithdrawData } = useGetTransactionsWithdrawQuery({
    pageIndex: 1,
    rowPerPage: 20,
    word: '',
    status: 'ACCEPTED',
    date: '',
  });
  const { data: rejectedWithdrawData } = useGetTransactionsWithdrawQuery({
    pageIndex: 1,
    rowPerPage: 20,
    word: '',
    status: 'REJECTED',
    date: '',
  });

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleCollapse = useCallback(() => {
    dispatch(setCollapsed(!collapsed));
  }, [collapsed, dispatch]);

  const handleSubMenuToggle = useCallback(
    (key: string) => {
      if (openKeys.includes(key)) {
        setOpenKeys(openKeys.filter((k) => k !== key));
      } else {
        setOpenKeys([...openKeys, key]);
      }
    },
    [openKeys]
  );

  const isActive = useCallback(
    (path: string) => pathname.startsWith(path),
    [pathname]
  );

  useEffect(() => {
    filteredMenuData.forEach((item) => {
      if (item.haveSubMenu) {
        item.subMenu?.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenKeys((keys) => [...keys, item.name]);
          }
        });
      }
    });
  }, [pathname, isActive]);

  return (
    <div className="h-screen overflow-auto py-[65px]">
      <Sidebar collapsed={collapsed ?? false}>
        <Menu
          className={
            collapsed
              ? 'max-w-[75px] min-w-[75px]'
              : 'max-w-[250px] min-w-[250px]'
          }
          menuItemStyles={{
            button: ({ level, active }) => ({
              color: active ? 'var(--neutral)' : 'var(--neutral-400)',
              backgroundColor: active ? 'var(--brand-300)' : '',
              marginLeft: '10px',
              marginRight: '10px',
              fontSize: '14px',
              fontWeight: active ? 'bold' : 'normal',
              padding: level === 1 ? (collapsed ? '5px' : '5px 50px') : '5px',
              transition: 'background-color 0.2s ease',
              ':hover': {
                backgroundColor: 'var(--neutral-200)',
                color: 'var(--neutral-400)',
              },
            }),
          }}
          renderExpandIcon={({ open }: RenderExpandIconParams) =>
            open ? (
              <Icons.DpArrowUp className="w-5 h-5" />
            ) : (
              <Icons.DpArrowDown className="w-5 h-5" />
            )
          }
        >
          {filteredMenuData.map(
            (item, index) =>
              !item.hide &&
              (item.haveSubMenu ? (
                <SubMenu
                  key={index}
                  label={item.name}
                  icon={item.icon}
                  open={openKeys.includes(item.name)}
                  onOpenChange={() => handleSubMenuToggle(item.name)}
                >
                  {item.subMenu?.map((subItem, subIndex) => (
                    <MenuItem
                      key={subIndex}
                      component={<Link href={subItem.path} passHref />}
                      active={isActive(subItem.path)}
                    >
                      {subItem.name}
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem
                  key={index}
                  component={<Link href={item.path} passHref />}
                  active={isActive(item.path)}
                  icon={isActive(item.path) ? item.activeIcon : item.icon}
                >
                  <Flex align="center">
                    {item.name}
                    {item.path === '/withdraw-rejected' &&
                      rejectedWithdrawData?.body?.total !== 0 && (
                        <div
                          className={cn(
                            isActive(item.path)
                              ? 'border-white text-white '
                              : 'border-primary text-primary',
                            'border  px-2 rounded-full text-xs ml-2'
                          )}
                        >
                          {item.path === '/withdraw-rejected'
                            ? rejectedWithdrawData?.body?.total
                            : ''}
                        </div>
                      )}
                    {item.path === '/withdraw-pending' &&
                      pendingWithdrawData?.body?.total !== 0 && (
                        <div
                          className={cn(
                            isActive(item.path)
                              ? 'border-white text-white '
                              : 'border-primary text-primary',
                            'border  px-2 rounded-full text-xs ml-2'
                          )}
                        >
                          {item.path === '/withdraw-pending'
                            ? pendingWithdrawData?.body?.total
                            : ''}
                        </div>
                      )}
                    {item.path === '/withdraw-accepted' &&
                      acceptedWithdrawData?.body?.total !== 0 && (
                        <div
                          className={cn(
                            isActive(item.path)
                              ? 'border-white text-white '
                              : 'border-primary text-primary',
                            'border  px-2 rounded-full text-xs ml-2'
                          )}
                        >
                          {item.path === '/withdraw-accepted'
                            ? acceptedWithdrawData?.body?.total
                            : ''}
                        </div>
                      )}
                  </Flex>
                </MenuItem>
              ))
          )}
        </Menu>
      </Sidebar>
      <Flex
        justify="center"
        align="center"
        className={cn(
          !collapsed ? 'left-[235px]' : 'left-[65px]',
          'fixed top-[75px] border border-white w-[30px] h-[30px] rounded-lg bg-primary cursor-pointer z-50 text-white'
        )}
        onClick={handleCollapse}
      >
        {collapsed ? <Icons.ForwardArrow /> : <Icons.BackwardArrow />}
      </Flex>
    </div>
  );
};

export default SideBar;
