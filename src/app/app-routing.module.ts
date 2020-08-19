import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/products-list' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'products-list',
        loadChildren: () => import('./components/products-list/products-list.module').then(m => m.ProductsListModule)
      }, {
        path: 'trash',
        loadChildren: () => import('./components/trash/trash.module').then(m => m.TrashModule)
      }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
