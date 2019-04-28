import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { CrimeDataService } from '../../services/crime-data.service';

@Component({
  selector: 'app-crime-data',
  templateUrl: './crime-data.component.html',
  styleUrls: ['./crime-data.component.css']
})
export class CrimeDataComponent implements OnInit {
  categories: any;
  months: any;
  boroughs: any;
  postCodes: any;
  searchParams: any;
  public crimeForm: FormGroup;

  pageNumber = 1;
  pageLimit = 50;
  totalPages = 0;

  dataList: any = [];
  constructor(private route: ActivatedRoute,
    private crimeDataService: CrimeDataService) { }

  ngOnInit() {
    this.searchParams = {
      category: null,
      postCode: null,
      borough: null,
      month: null,
      pageLimit: this.pageLimit,
      pageNumber: this.pageNumber,
    };

    const data = this.route.snapshot.data['data'];
    if (data != null) {
      this.categories = data.categories;
      this.months = data.months;
      this.boroughs = data.boroughs;
      this.postCodes = data.postCodes;
    }
  }

  async getData(crimeForm: NgForm) {
    try {
      let date = null;
      if (crimeForm.value.month && crimeForm.value.year) {
        date = crimeForm.value.year + `-` + crimeForm.value.month;
      }
      this.searchParams = {};
      if (crimeForm.value.category) {
        this.searchParams.category = crimeForm.value.category;
      }
      if (crimeForm.value.postcode) {
        this.searchParams.postcode = crimeForm.value.postcode;
      }
      if (crimeForm.value.borough) {
        this.searchParams.borough = crimeForm.value.borough;
      }
      if (date) {
        this.searchParams.month = date;
      }
      this.searchParams.pageLimit = this.pageLimit;
      this.searchParams.pageNumber = this.pageNumber = 1;

      this.insertData();
    } catch (error) {
      console.log(error);
    }

  }

  goNext() {
    if (this.pageNumber < this.totalPages) {
      this.searchParams.pageNumber = ++this.pageNumber;
      this.insertData();
    }
  }

  goPrevious() {
    if (this.pageNumber > 1) {
      this.searchParams.pageNumber = --this.pageNumber;
      this.insertData();
    }

  }

  async insertData() {
    try {
      const response = await this.crimeDataService.getCrimeData(this.searchParams);
      this.dataList = response.crimes;
      this.totalPages = response.totalPages;
    } catch (error) {
      console.log(error);
    }

  }

  increment(i) {
    return ++i;
  }
}
