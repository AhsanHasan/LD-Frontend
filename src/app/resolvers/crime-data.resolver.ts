import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CrimeDataService } from '../services/crime-data.service';

@Injectable({ providedIn: 'root' })
export class CrimeDataResolver implements Resolve<any> {
    constructor(private crimeDataService: CrimeDataService) { }

    async resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot) {
        const months = await this.crimeDataService.getMonths();
        const postCodes = await this.crimeDataService.getPostCodes();
        const boroughs = await this.crimeDataService.getBoroughs();
        const categories = await this.crimeDataService.getCategories();
        const data = {
            months: months,
            postCodes: postCodes,
            boroughs: boroughs,
            categories: categories
        };
        return data;
    }
}
