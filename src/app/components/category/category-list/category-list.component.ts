import { Component, effect, inject } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { AuthService } from '../../../services/auth.service'; // Importa AuthService
import { ICategory } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../modal/modal.component';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    CategoryFormComponent,
    MatSnackBarModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  public search: string = '';
  public categoryList: ICategory[] = [];
  private service = inject(CategoryService);
  private authService = inject(AuthService); // Inyecta AuthService
  private snackBar = inject(MatSnackBar);
  public currentCategory: ICategory = {
    name: '',
    description: ''
  };
  public isSuperAdmin: boolean = false; // Variable para almacenar el estado del rol

  constructor() {
    this.service.getAllSignal();
    effect(() => {
      this.categoryList = this.service.categories$();
    });

    // Verifica si el usuario tiene el rol de SUPER_ADMIN
    this.isSuperAdmin = this.authService.hasAnyRole(['ROLE_SUPER_ADMIN']);
  }

  showDetail(category: ICategory, modal: any) {
    this.currentCategory = { ...category };
    modal.show();
  }

  deleteCategory(category: ICategory) {
    this.service.deleteCategorySignal(category).subscribe({
      next: () => {
        this.snackBar.open('Category deleted', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
        });
      },
      error: (error: any) => {
        this.snackBar.open('Error deleting category', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
