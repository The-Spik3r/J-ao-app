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
import { AdminMarketStallCreateComponent } from './pages/admin/admin-market-stall-create/admin-market-stall-create';
import { AdminMarketStallEditComponent } from './pages/admin/admin-market-stall-edit/admin-market-stall-edit';
import { AdminMarketStallDeleteComponent } from './pages/admin/admin-market-stall-delete/admin-market-stall-delete';
import { AdminCategoryCreateComponent } from './pages/admin/admin-category-create/admin-category-create';
import { AdminCategoryEditComponent } from './pages/admin/admin-category-edit/admin-category-edit';
import { AdminCategoryDeleteComponent } from './pages/admin/admin-category-delete/admin-category-delete';
import { AdminMenuComponent } from './pages/admin/admin-menu/admin-menu';
import { AdminMenuCreateComponent } from './pages/admin/admin-menu-create/admin-menu-create';
import { AdminMenuEditComponent } from './pages/admin/admin-menu-edit/admin-menu-edit';
import { AdminMenuDeleteComponent } from './pages/admin/admin-menu-delete/admin-menu-delete';
import { Cart } from './pages/cart/cart';
import { MarketStallDetail } from './pages/market-stall-detail/market-stall-detail';
import { CategoryDetail } from './pages/category-detail/category-detail';
import { authGuard } from './guards/auth-guard-guard';

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
    path: 'cart',
    component: Cart,
  },
  {
    path: 'market-stalls',
    component: AllMarketStalls,
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard],
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
        path: 'marketStall/create',
        component: AdminMarketStallCreateComponent,
      },
      {
        path: 'marketStall/edit',
        component: AdminMarketStallEditComponent,
      },
      {
        path: 'marketStall/delete',
        component: AdminMarketStallDeleteComponent,
      },
      {
        path: 'category',
        component: AdminCategory,
      },
      {
        path: 'category/create',
        component: AdminCategoryCreateComponent,
      },
      {
        path: 'category/edit',
        component: AdminCategoryEditComponent,
      },
      {
        path: 'category/delete',
        component: AdminCategoryDeleteComponent,
      },
      {
        path: 'menu',
        component: AdminMenuComponent,
      },
      {
        path: 'menu/create',
        component: AdminMenuCreateComponent,
      },
      {
        path: 'menu/edit',
        component: AdminMenuEditComponent,
      },
      {
        path: 'menu/delete',
        component: AdminMenuDeleteComponent,
      },
    ],
  },
  {
    path: 'menu/:id',
    component: MenuDetail,
  },
  {
    path: 'market-stall/:id',
    component: MarketStallDetail,
  },
  {
    path: 'category/:id',
    component: CategoryDetail,
  },
];
