import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class PropertyDataService {
    private POSTCODE_ENDPONIT = '/property/postcodes';
    private BEDROOMS_ENDPONIT = '/property/bedrooms';
    private PRICES_ENDPONIT = '/property/prices';
    private BOROUGH_ENDPONIT = '/property/boroughs';
    private PROPERTIES_ENDPONIT = '/property/all';
    private PROPERTIES_CHART_ENDPONIT = '/property/bar-chart';

    constructor (
        private http: HttpClient
    ) { }

    public getPostcodes () {
        return this.http.get(environment.apiBase + this.POSTCODE_ENDPONIT).toPromise();
    }

    public getBedrooms () {
        return this.http.get(environment.apiBase + this.BEDROOMS_ENDPONIT).toPromise();
    }

    public getPrices () {
        return this.http.get(environment.apiBase + this.PRICES_ENDPONIT).toPromise();
    }

    public getBoroughs () {
        return this.http.get(environment.apiBase + this.BOROUGH_ENDPONIT).toPromise();
    }

    public getProperties (params) {
        return this.http.get(environment.apiBase + this.PROPERTIES_ENDPONIT, { params: params }).toPromise();
    }

    public getPropertyChart(params) {
        return this.http.get(environment.apiBase + this.PROPERTIES_CHART_ENDPONIT, { params: params }).toPromise();
    }
}
