import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { MenuDetail } from './pages/menu-detail/menu-detail';
import { AllMenus } from './pages/all-menus/all-menus';
import { AllCategories } from './pages/all-categories/all-categories';
import { AllMarketStalls } from './pages/all-market-stalls/all-market-stalls';
import { Admin } from './pages/admin/admin';
import { AdminHome } from './pages/admin-home/admin-home';
import { AdminMarketStall } from './pages/admin-market-stall/admin-market-stall';
import { AdminCategory } from './pages/admin-category/admin-category';
import { AdminMenu } from './pages/admin-menu/admin-menu';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'menus',
    component: AllMenus,
  },
  {
    path: 'categories',
    component: AllCategories,
  },
  {
    path: 'market-stalls',
    component: AllMarketStalls,
  },
  {
    path: 'admin',
    component: Admin,
    children: [
      {
        path: '',
        component: AdminHome,
      },
      {
        path: 'marketStall',
        component: AdminMarketStall,
      },
      {
        path: 'category',
        component: AdminCategory,
      },
      {
        path: 'menu',
        component: AdminMenu,
      },
    ],
  },
  {
    path: 'menu/:id',
    component: MenuDetail,
  },
];
