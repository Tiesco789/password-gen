import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  public snackBarRef = inject(MatSnackBar)

  openSnackBar() {
    this.snackBarRef.open('Senha copiada com sucesso!');
  }

  formatLabel(value: number): string {
    return `${value}`;
  }
}
