import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { CrimeDataService } from '../../services/crime-data.service';
import { Utils } from 'src/app/utils';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

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
  @ViewChild('crimeForm') crimeForm: NgForm;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];

  pageNumber = 1;
  pageLimit = 10;
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

    this.insertData();
    this.getCrimeChart();
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
      this.getCrimeChart();
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
    Utils.showLoader('.panel-body-table');
    try {
      for (const key in this.searchParams) {
        if (this.searchParams.hasOwnProperty(key) && this.searchParams[key] == null) {
          delete this.searchParams[key];
        }
      }
      const response = await this.crimeDataService.getCrimeData(this.searchParams);
      this.dataList = response.crimes;
      this.totalPages = response.totalPages;
    } catch (error) {
      console.log(error);
    }
    Utils.hideLoader('.panel-body-table');
  }

  async getCrimeChart() {
    Utils.hideLoader('#chart-panel');
    try {
      for (const key in this.searchParams) {
        if (this.searchParams.hasOwnProperty(key) && this.searchParams[key] == null) {
          delete this.searchParams[key];
        }
      }
      const response = await this.crimeDataService.getCrimeChart(this.searchParams) as any;
      const data = [];
      const labels = [];
      response.data.chartData.forEach(borough => {
        data.push(borough.y);
        labels.push(borough.x);
      });
      this.barChartData = [
        {
          data: data,
          label: 'Crimes'
        }
      ];
      this.barChartLabels = labels;
    } catch (error) {
      Utils.showErrorMessage('Something went wrong', error);
    }
    Utils.hideLoader('#chart-panel');
  }

  increment(i) {
    return ++i;
  }

  clearForm() {
    this.crimeForm.reset();
    this.getData(this.crimeForm);
  }
}
