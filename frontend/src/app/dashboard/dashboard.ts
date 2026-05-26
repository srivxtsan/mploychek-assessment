import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  records: any[] = [];
  isLoading = true;
  fetchError: string | null = null;
  userRole = '';
  userName = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // This wrapper stops the SSR engine from breaking when reading browser storage
    if (isPlatformBrowser(this.platformId)) {
      const sessionData = sessionStorage.getItem('userProfile');
      
      if (!sessionData) {
        this.router.navigate(['/']);
        return;
      }

      const profile = JSON.parse(sessionData);
      this.userRole = profile.role;
      this.userName = profile.name;
      const userId = profile.userId;

      // Fires the network call with your 2.5-second async delay parameter
      this.http.get(`http://localhost:3000/api/records?userId=${userId}&role=${this.userRole}&delay=2500`)
        .subscribe({
          next: (response: any) => {
            // Assigns the backend data array safely to your view template
            this.records = response.data || response; 
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.fetchError = "Failed to load records from server.";
            this.isLoading = false;
            this.cdr.detectChanges();
            console.error(err);
          }
        });
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
    this.router.navigate(['/']);
  }
}