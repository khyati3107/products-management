import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductService } from 'src/app/core';
import { ConfirmModalComponent } from 'src/app/shared/components';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productsList = [];
  priceRangeList = [{
    name: '$11k-$20k',
    isSelected: false,
  },
  {
    name: '$21k-$30k',
    isSelected: false,
  }, {
    name: '$31k-$40k',
    isSelected: false,
  }, {
    name: '$41k-$50k',
    isSelected: false,
  }];
  priceRange = [];
  productSubscription: Subscription; searchText = null;

  constructor(private modalService: NgbModal, public productService: ProductService) {
    this.productSubscription = this.productService.productDataChange$.subscribe(res => {
      this.searchText = res;
    });
  }

  ngOnInit(): void {
    if (this.productService.getItem('products')) {
      this.getProducts();
    }
  }

  filterByPrice(priceRange) {
    priceRange.isSelected = !priceRange.isSelected;
    this.priceRange = this.priceRangeList.filter((item) => item.isSelected).map(el => el.name) || [];
  }

  addProduct(): void {
    const modalRef = this.modalService.open(ManageProductComponent);
    modalRef.result.then((res) => {
      if (res) {
        this.getProducts();
      }
    }, (reason) => {
    });
  }

  editProduct(product, index) {
    const modalRef = this.modalService.open(ManageProductComponent);
    const data = { ...product };
    data.index = index;
    modalRef.componentInstance.data = data;
    modalRef.result.then((res) => {
      if (res) {
        this.getProducts();
      }
    }, (reason) => {
    });
  }

  deleteProduct(index) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.result.then((res) => {
      if (res) {
        this.productsList[index].active = false;
        this.updateProduct();
      }
    }, (reason) => {
    });
  }

  likeDislikeProduct(index) {
    this.productsList[index].favourite = !this.productsList[index].favourite;
    this.updateProduct();
  }

  updateProduct() {
    this.productService.setItem('products', this.productsList);
    this.getProducts();
  }

  getProducts() {
    this.productsList = [...this.productService.getItem('products')];
    this.productsList = this.productsList.filter(product => product.active);
  }

}
