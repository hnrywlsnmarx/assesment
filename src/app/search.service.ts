import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  searchKeyword: string = '';
  searchStatus: string = '';
  setJumlahData: number = 0;
  searchResults: any[] = [];

}
