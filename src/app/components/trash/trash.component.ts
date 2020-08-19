import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  productsList = [];

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    if (this.productService.getItem('products')) {
      this.getProducts();
    }
  }

  getProducts() {
    this.productsList = [...this.productService.getItem('products')];
    this.productsList = this.productsList.filter(product => !product.active);
  }

  restoreProduct(index) {
    this.productsList[index].active = true;
    this.productService.setItem('products', this.productsList);
    this.getProducts();
  }

}
