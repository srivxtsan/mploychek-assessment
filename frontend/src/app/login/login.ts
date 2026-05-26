import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { timeout, TimeoutError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  userId: string = '';
  password: string = '';
  selectedRole: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.userId || !this.password || !this.selectedRole) {
      this.errorMessage = 'Please fill in all fields before signing in.';
      return;
    }

    this.isSubmitting = true;
    this.http.post<any>('http://localhost:3000/api/login', {
      userId: this.userId,
      password: this.password,
      role: this.selectedRole
    }).pipe(timeout(5000)).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        sessionStorage.setItem('userProfile', JSON.stringify(response));
        this.router.navigate(['/dashboard']);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err instanceof TimeoutError) {
          this.errorMessage = 'Request timed out. Please check the server is running.';
        } else {
          this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        }
        this.cdr.detectChanges();
      }
    });
  }
}
