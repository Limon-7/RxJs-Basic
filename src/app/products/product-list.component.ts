import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { EMPTY, combineLatest, Subject } from 'rxjs';
import { ProductService } from './product.service';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  selectedCategoryId = 1;
  categorySelectSubject = new Subject<number>();
  categorySelectSubject$ = this.categorySelectSubject.asObservable();

  products$ = combineLatest([
    this.productService.productWithCatagory$,
    this.categorySelectSubject$
  ])
    // products$ = this.productService.productWithCatagory$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      }
      )
    );
  categories$ = this.categoryService.productCategories$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  productSimpleFilter$ = this.productService.productWithCatagory$
    .pipe(
      map(products =>
        products.filter(product =>
          this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true
        )
      )
    );

  constructor(private productService: ProductService, private categoryService: ProductCategoryService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectSubject.next(+categoryId);
    // this.selectedCategoryId = +categoryId;
  }
}
