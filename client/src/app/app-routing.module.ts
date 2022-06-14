import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosComponent } from './components/productos/productos.component';
import { UserComponent } from './components/user/user.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { LoginComponent } from './components/login/login.component';
import { UserGuard } from './guards/user.guard';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';

const routes: Routes = [  
  {
    path: '',
    redirectTo:'/',
    pathMatch: 'full'
  },
  // {
  //   path:'menu',
  //   component: BarraLateralComponent
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'ventas',
    component: VentasComponent,
    canActivate: [UserGuard]
  }, 
  {
    path: 'usuarios',
    component: UserComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
