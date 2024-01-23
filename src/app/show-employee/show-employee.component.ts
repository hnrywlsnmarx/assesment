import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css'],
})
export class ShowEmployeeComponent implements OnInit {
  employee: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const employeeId = +params['id']; // '+' converts string to number
      this.apiService.getEmployeeById(employeeId).subscribe(
        (data) => {
          this.employee = data;
        },
        (error) => {
          console.error('Error fetching employee details', error);
        }
      );
    });
  }

  goBack(): void {
    this.router.navigate(['/employee']);
    this.searchService.searchKeyword = this.searchService.searchKeyword;
    this.searchService.searchStatus = this.searchService.searchStatus;
    this.searchService.searchResults = this.searchService.searchResults;
  }
}