import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productDetail;

  constructor(public activateRoute: ActivatedRoute, public productService: ProductService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (this.productService.getItem('products')) {
        const productsList = [...this.productService.getItem('products')];
        this.productDetail = productsList.find((el, i) => { console.log(i, params.id); return i === parseInt(params.id, 10); });
      }
    });
  }

}
