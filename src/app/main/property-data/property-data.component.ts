import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PropertyDataService } from 'src/app/services/property-data.service';
import { Utils } from 'src/app/utils';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-property-data',
  templateUrl: './property-data.component.html',
  styleUrls: ['./property-data.component.css']
})
export class PropertyDataComponent implements OnInit {
  postcodes: any;
  boroughs: any;
  bedrooms: any;
  prices: any;
  properties = [];
  @ViewChild('propertyForm') propertyForm;
  searchQuery = {
      propertyType: null,
      postcode: null,
      borough: null,
      minBed: null,
      maxBed: null,
      minPrice: null,
      maxPrice: null,
      limit: 10,
      page: 1,
  };
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

  constructor(
    private route: ActivatedRoute,
    private propertyDataService: PropertyDataService
  ) { }

  ngOnInit() {
    const data = this.route.snapshot.data.data;
    this.postcodes = data.postcodes;
    this.boroughs = data.borough;
    this.bedrooms = data.bedrooms;
    this.prices = data.prices;
    this.searchQuery.minPrice = this.prices.min;
    this.searchQuery.maxPrice = this.prices.max;
    this.searchQuery.minBed = this.bedrooms.min;
    this.searchQuery.maxBed = this.bedrooms.min;
    this.loadProperties();
    this.getPropertyChart();
  }

  getProperties(propertyForm: NgForm) {
    try {
      const formValue = propertyForm.value;
      this.searchQuery.borough = formValue.borough;
      this.searchQuery.propertyType = formValue.propertyType;
      this.searchQuery.postcode = formValue.postcode;
      this.searchQuery.minBed = formValue.minBed;
      this.searchQuery.maxBed = formValue.maxBed;
      this.searchQuery.minPrice = formValue.minPrice;
      this.searchQuery.maxPrice = formValue.maxPrice;
      this.searchQuery.page = 1;
      this.loadProperties();
      this.getPropertyChart();
    } catch (error) {
      Utils.showErrorMessage('', error);
    }
  }

  async loadProperties() {
    Utils.showLoader('.panel-body-table');
    try {
      for (const key in this.searchQuery) {
        if (this.searchQuery.hasOwnProperty(key) && this.searchQuery[key] == null) {
          delete this.searchQuery[key];
        }
      }
      const response = await this.propertyDataService.getProperties(this.searchQuery) as any;
      this.properties = response.data.properties;
    } catch (error) {
      Utils.showErrorMessage('', error);
    }
    Utils.hideLoader('.panel-body-table');
  }

  goPrevious() {
    if (this.searchQuery.page >= 1) {
      this.searchQuery.page --;
      this.loadProperties();
    }
  }

  goNext() {
    this.searchQuery.page ++;
    this.loadProperties();
  }

  clearForm() {
    this.propertyForm.reset();
    this.getProperties(this.propertyForm);
  }

  async getPropertyChart() {
    Utils.hideLoader('#chart-panel');
    try {
      for (const key in this.searchQuery) {
        if (this.searchQuery.hasOwnProperty(key) && this.searchQuery[key] == null) {
          delete this.searchQuery[key];
        }
      }
      const response = await this.propertyDataService.getPropertyChart(this.searchQuery) as any;
      const data = [];
      const labels = [];
      response.data.chartData.forEach(borough => {
        data.push(borough.y);
        labels.push(borough.x);
      });
      this.barChartData = [
        {
          data: data,
          label: 'Prices'
        }
      ];
      this.barChartLabels = labels;
    } catch (error) {
      Utils.showErrorMessage('Something went wrong', error);
    }
    Utils.hideLoader('#chart-panel');
  }

}
