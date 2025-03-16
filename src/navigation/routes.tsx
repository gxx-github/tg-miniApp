import type { ComponentType, JSX } from 'react';

import IndexPage from '@/pages/Index';
import JoinDrawPage from '@/pages/JoinDraw';
import ProfilePage from '@/pages/Profile';
import DetailPage from '@/pages/Detail';
import AssetsPage from '@/pages/AssetsPage';
import DrawHistoryPage from '@/pages/DrawHistory';
import WinHistoryPage from '@/pages/WinHistory';
import AladdinPage from '@/pages/Aladdin';
import DrawDetailPage from '@/pages/DrawDetail';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

function Tab() {
  return <div style={{ color: 'red', width: '100vw', height: '100vh', position: 'fixed' }}>1111</div>
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/joindraw', Component: JoinDrawPage },
  { path: '/profile', Component: ProfilePage },
  { path: `/detail/:id`, Component: DetailPage },
  { path: `/assets`, Component: AssetsPage },
  { path: `/drawhistory`, Component: DrawHistoryPage },
  { path: `/winhistory`, Component: WinHistoryPage },
  { path: `/aladdin`, Component: AladdinPage },
  { path: `/drawdetail/:id`, Component: DrawDetailPage },



];
