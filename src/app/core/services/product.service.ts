import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductService {
    private productDataSource = new BehaviorSubject('');
    productDataChange$ = this.productDataSource.asObservable();

    constructor() { }

    getItem(key) {
        return window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : null;
    }

    setItem(key, value) {
        window.localStorage[key] = JSON.stringify(value);
        return this.getItem(key);
    }

    removeItem(key) {
        window.localStorage.removeItem(key);
    }

    updateProductData(category) {
        this.productDataSource.next(category);
    }

}

