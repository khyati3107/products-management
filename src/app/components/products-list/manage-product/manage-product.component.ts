import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LITERALS, REGEX_PATTERNS, ProductService } from 'src/app/core';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  productForm: FormGroup; @Input() data;
  locations = ['Ahmedabad', 'Surat', 'Mumbai', 'Delhi'];
  priceRangeList = ['$11k-$20k', '$21k-$30k', '$31k-$40k', '$41k-$50k'];
  ratingList = [1, 2, 3, 4, 5];
  stockTypes = [{ label: 'In stock', value: 'in' }, { label: 'Out of stock', value: 'out' }];
  manageProductFormErrors = LITERALS.PRODUCT.ERROR_MESSAGES;
  productList = [];

  constructor(public fb: FormBuilder, public activeModal: NgbActiveModal, public productService: ProductService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      desc: ['', [Validators.required, Validators.minLength(150)]],
      imageUrl: ['', [Validators.required, Validators.pattern(REGEX_PATTERNS.URL)]],
      priceRange: ['$11k-$20k'],
      rating: [5],
      locationList: this.fb.array(this.locations.map(x => !1)),
      inOutStock: ['in']
    });

    // SET VALUE IN EDIT FORM
    if (this.data) {
      this.productForm.patchValue({
        title: this.data.title,
        desc: this.data.desc,
        imageUrl: this.data.imageUrl,
        priceRange: this.data.priceRange,
        rating: this.data.rating,
        inOutStock: this.data.inOutStock,
        locationList: this.locations.map(x => this.data.locationList.indexOf(x) > -1)
      });
    }
  }

  get f() { return this.productForm.controls; }

  close() {
    this.activeModal.close();
  }

  saveProduct() {
    const params = Object.assign({}, this.productForm.value, {
      locationList: this.productForm.value.locationList.map((x, i) => x && this.locations[i]).filter(x => !!x),
    });
    let products = this.productService.getItem('products');

    if (!this.data) {
      // ADD NEW PRODUCT
      params.active = true;
      params.favourite = false;
      if (products && products.length) {
        products.push(params);
      } else {
        products = [];
        products.push(params);
      }
    } else {
      params.active = this.data.active;
      params.favourite = this.data.favourite;
      products[this.data.index] = { ...params }; // UPDATE PRODUCT
    }
    this.productService.setItem('products', products);
    this.activeModal.close(true);
  }

}
