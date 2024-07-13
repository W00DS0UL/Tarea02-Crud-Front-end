import { Component } from '@angular/core';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';
import { ProductFormComponent } from '../../components/product/product-form/product-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductListComponent,
    ProductFormComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule // Asegúrate de importar CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public isSuperAdmin: boolean = false; // Variable para almacenar el estado del rol

  constructor(private authService: AuthService) {
    // Verifica si el usuario tiene el rol de SUPER_ADMIN
    this.isSuperAdmin = this.authService.hasAnyRole(['ROLE_SUPER_ADMIN']);
  }
}
