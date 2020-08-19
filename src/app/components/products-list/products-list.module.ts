import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsListRoutingModule } from './products-list-routing.module';
import { ProductsListComponent } from './products-list.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { SharedModule } from 'src/app/shared';
import { ProductDetailComponent } from './product-detail/product-detail.component';


@NgModule({
  declarations: [ProductsListComponent, ManageProductComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ProductsListRoutingModule,
    SharedModule
  ],
  entryComponents: [ManageProductComponent]
})
export class ProductsListModule { }
