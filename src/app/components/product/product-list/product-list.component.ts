import { Component, effect, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service'; // Importa AuthService
import { IProduct } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../modal/modal.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    ProductFormComponent,
    MatSnackBarModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  public search: string = '';
  public productList: IProduct[] = [];
  private productService = inject(ProductService);
  private authService = inject(AuthService); // Inyecta AuthService
  private snackBar = inject(MatSnackBar);
  public currentProduct: IProduct = {
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    category: { id: 0 }
  };
  public isSuperAdmin: boolean = false; // Variable para almacenar el estado del rol

  constructor() {
    this.productService.getAllSignal();
    effect(() => {
      this.productList = this.productService.products$();
    });

    // Verifica si el usuario tiene el rol de SUPER_ADMIN
    this.isSuperAdmin = this.authService.hasAnyRole(['ROLE_SUPER_ADMIN']);
  }

  showDetail(product: IProduct, modal: any) {
    this.currentProduct = { ...product };
    modal.show();
  }

  deleteProduct(product: IProduct) {
    this.productService.deleteProductSignal(product).subscribe({
      next: () => {
        this.snackBar.open('Product deleted', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });
      },
      error: (error: any) => {
        this.snackBar.open('Error deleting product', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
