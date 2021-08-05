import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styles: [],
  providers: [ProductService],
})
export class CatalogComponent implements OnInit {
  errorMessage: string = '';
  private _listFilter: string = '';

  colors: string[] = ['All', 'Dark Brown', 'Blonde', 'White'];

  colorForm: FormGroup = new FormBuilder().group({
    color: ['']
  });

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private router: Router) {  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  performFilter(selectBy: string, textBox: string): void {
    this.filteredProducts=this.products.filter((item) => {
      if (selectBy!='All')
      {
      return selectBy===item.color;
      }
      else 
      {
        return this.products;
      }
    })
  } 

  selectColor() {
    let value=(this.colorForm.get('color')||{}).value;
    this.performFilter(value, '');
    console.log('value=', value);
  }
}

