import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  generatedPassword = '';
  passwordLength = 8;
  useLowercase = true;
  useUppercase = true;
  useNumbers = true;
  useSymbols = true;

  generatePassword(): void {
    let validChars = '';

    if (this.useLowercase) validChars += 'abcdefghijklmnopqrstuvwxyz';
    if (this.useUppercase) validChars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (this.useNumbers) validChars += '0123456789';
    if (this.useSymbols) validChars += '!@#$%^&*()_+[]{}<>?';

    if (validChars.length === 0) {
      this.generatedPassword = '';
      return;
    }

    let password = '';
    for (let i = 0; i < this.passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      password += validChars[randomIndex];
    }

    this.generatedPassword = password;
  }

  copyPasswordToClipboard(): void {
    navigator.clipboard.writeText(this.generatedPassword).then(() => {
      this.openSnackBar();
    });
  }

  onPasswordLengthChange(event: any): void {
    const length = event.target?.value ?? 8;
    this.passwordLength = Math.min(32, Math.max(8, length));
    this.generatePassword();
  }

  onToggleChange(event: any): void {
    const values = event.value;

    this.useUppercase = values.includes('uppercase');
    this.useLowercase = values.includes('lowercase');
    this.useNumbers = values.includes('numbers');
    this.useSymbols = values.includes('symbols');

    this.generatePassword();
  }

  public snackBarRef = inject(MatSnackBar)
  openSnackBar() {
    this.snackBarRef.open('Senha copiada com sucesso!');
  }

  formatLabel(value: number): string {
    return `${value}`;
  }
}
