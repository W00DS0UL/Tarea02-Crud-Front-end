import { Component } from '@angular/core';
import { CategoryListComponent } from '../../components/category/category-list/category-list.component';
import { CategoryFormComponent } from '../../components/category/category-form/category-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { AuthService } from '../../services/auth.service'; // Importa AuthService

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoryListComponent,
    CategoryFormComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule // Asegúrate de importar CommonModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  public isSuperAdmin: boolean = false; // Variable para almacenar el estado del rol

  constructor(private authService: AuthService) {
    // Verifica si el usuario tiene el rol de SUPER_ADMIN
    this.isSuperAdmin = this.authService.hasAnyRole(['ROLE_SUPER_ADMIN']);
  }
}
