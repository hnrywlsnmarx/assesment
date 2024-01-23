import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthGuard]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginStatus = 0;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      // console.log(this.authService.isLoggedInUser());
      console.log('Login berhasil');
      this.router.navigate(['/employee']);
    } else {
      console.log('Login gagal');
      this.showSnackBar('Login gagal. Periksa kembali username dan password.');
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Tutup', {
      // duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-delete'] 
      
    });
  }
}