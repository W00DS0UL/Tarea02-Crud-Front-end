import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProduct } from '../interfaces';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<IProduct> {
  protected override source: string = 'products'; // Endpoint para los productos

  private productListSignal = signal<IProduct[]>([]);

  get products$() {
    return this.productListSignal;
  }

  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse(); // Si es necesario, invertir el orden
        this.productListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching products', error);
      }
    });
  }

  saveProductSignal(product: IProduct): Observable<any> {
    return this.add(product).pipe(
      tap((response: any) => {
        this.productListSignal.update(products => [response, ...products]);
      }),
      catchError(error => {
        console.error('Error saving product', error);
        return throwError(error);
      })
    );
  }

  updateProductSignal(product: IProduct): Observable<any> {
    return this.edit(product.id, product).pipe(
      tap((response: any) => {
        const updatedProducts = this.productListSignal().map(p => p.id === product.id ? response : p);
        this.productListSignal.set(updatedProducts);
      }),
      catchError(error => {
        console.error('Error updating product', error);
        return throwError(error);
      })
    );
  }

  deleteProductSignal(product: IProduct): Observable<any> {
    return this.del(product.id).pipe(
      tap((response: any) => {
        const updatedProducts = this.productListSignal().filter(p => p.id !== product.id);
        this.productListSignal.set(updatedProducts);
      }),
      catchError(error => {
        console.error('Error deleting product', error);
        return throwError(error);
      })
    );
  }
}
