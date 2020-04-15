import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { EMPTY } from 'rxjs';

import { ProductService } from '../product.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId;

  products$ = this.productService.productWithCatagory$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  selectedProduct$ = this.productService.selectedProduct$;
  constructor(private productService: ProductService) { }


  onSelected(productId: number): void {
    this.productService.selectedProductChange(productId);
  }
}
