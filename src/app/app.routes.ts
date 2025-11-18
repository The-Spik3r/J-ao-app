import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { MenuDetail } from './pages/menu-detail/menu-detail';
import { AllMenus } from './pages/all-menus/all-menus';
import { AllCategories } from './pages/all-categories/all-categories';

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
    path: 'menu/:id',
    component: MenuDetail,
  },
];
