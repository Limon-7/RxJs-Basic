import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, combineLatest, BehaviorSubject, Subject, merge } from 'rxjs';
import { catchError, tap, map, scan } from 'rxjs/operators';

import { Product } from './product';
import { Supplier } from '../suppliers/supplier';
import { SupplierService } from '../suppliers/supplier.service';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private suppliersUrl = this.supplierService.suppliersUrl;

  products$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      // map(products =>
      //   products.map(product => ({
      //     ...product,
      //     price: product.price * 12,
      //     searchKey: [product.productName]
      //   }) as Product)
      // ),
      tap(data => console.log('Products: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  productWithCatagory$ = combineLatest([
    this.products$,
    this.productCategoryService.productCategories$
  ]).pipe(
    map(([products, categories]) =>
      products.map(product => ({
        ...product,
        price: product.price * 13,
        category: categories.find(c => product.categoryId === c.id).name,
        searchKey: [product.productName]
      }) as Product)
    )
  );
  // Todo update selected id

  // select single product
  // selectedProduct$ = this.productWithCatagory$
  //   .pipe(
  //     map(products =>
  //       products.find(product => product.id === 5)
  //     ),
  //     tap(res => console.log('Selected Product', res))
  //   );

  private productSelectedSubject = new BehaviorSubject<number>(0);
  productSelectedAction$ = this.productSelectedSubject.asObservable();
  selectedProduct$ = combineLatest([
    this.productWithCatagory$,
    this.productSelectedAction$
  ])
    .pipe(
      map(([products, selectedProductId]) =>
        products.find(product => product.id === selectedProductId)
      ),
      tap(res => console.log(res))
    );

  private productInsertSubject = new Subject<Product>();
  productyInsertAction$ = this.productInsertSubject.asObservable();

  productWithAdd$ = merge(
    this.productWithCatagory$,
    this.productyInsertAction$
  ).pipe(
    scan((acc: Product[], value: Product) => [...acc, value])
  );
  // product change
  selectedProductChange(selectedProductId: number): void {
    this.productSelectedSubject.next(selectedProductId);
  }

  // add Product
  addProduct(newProduct?: Product) {
    newProduct = newProduct || this.fakeProduct();
    this.productInsertSubject.next(newProduct);
  }

  constructor(private http: HttpClient, private productCategoryService: ProductCategoryService, private supplierService:
    SupplierService) { }


  private fakeProduct() {
    return {
      id: 42,
      productName: 'Another One',
      productCode: 'TBX-0042',
      description: 'Our new product',
      price: 8.9,
      categoryId: 3,
      category: 'Toolbox',
      quantityInStock: 30
    };
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
