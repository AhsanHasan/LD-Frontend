import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CrimeDataService {
    private CATEGORY_ENDPOINT = '/get-crime-categories';
    private MONTHS_ENDPOINT = '/get-crime-months';
    private POSTCODES_ENDPOINT = '/get-crime-postcodes';
    private BOROUGHS_ENDPOINT = '/get-crime-boroughs';
    private CRIME_DATA_ENDPOINT = '/get-all-crimes';

    public profile: any;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    /**
     * Get profile of the user
     */
    public async getCategories() {
        try {
            const response = await this.http.get(environment.apiBase + this.CATEGORY_ENDPOINT).toPromise() as any;
            return response.data.categories;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Get profile of the user
     */
    public async getMonths() {
        try {
            const response = await this.http.get(environment.apiBase + this.MONTHS_ENDPOINT).toPromise() as any;
            return response.data.months;
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Get profile of the user
     */
    public async getPostCodes() {
        try {
            const response = await this.http.get(environment.apiBase + this.POSTCODES_ENDPOINT).toPromise() as any;
            return response.data.postCodes;
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Get profile of the user
     */
    public async getBoroughs() {
        try {
            const response = await this.http.get(environment.apiBase + this.BOROUGHS_ENDPOINT).toPromise() as any;
            return response.data.boroughs;
        } catch (error) {
            console.log(error);
        }
    }

    /**
 * Get profile of the user
 */
    public async getCrimeData(body) {
        try {
            const response = await this.http.get(environment.apiBase + this.CRIME_DATA_ENDPOINT, { params: body }).toPromise() as any;
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
