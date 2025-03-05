import type { ComponentType, JSX } from 'react';

import IndexPage from '@/pages/Index';
import JoinDrawPage from '@/pages/JoinDraw';
import ProfilePage from '@/pages/Profile';

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


];
