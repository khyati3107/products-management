import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isNavbarCollapsed = false; searchText; showSearch = false;
  navigationList = [
    {
      name: 'Home',
      val: '/products-list'
    },
    {
      name: 'Trash',
      val: '/trash'
    }
  ];

  constructor(public productService: ProductService, public router: Router) { }

  ngOnInit(): void {
    this.showSearch = this.router.url === '/products-list';
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.showSearch = this.router.url === '/products-list';
      }
    });

  }

  search() {
    this.productService.updateProductData(this.searchText);
  }

}
