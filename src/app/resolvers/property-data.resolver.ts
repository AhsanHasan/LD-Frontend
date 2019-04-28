import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { PropertyDataService } from '../services/property-data.service';
import { Utils } from '../utils';

@Injectable({ providedIn: 'root' })
export class PropertyDataResolver implements Resolve<any> {
    constructor(private propertyDataService: PropertyDataService) { }

    async resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot) {
        try {
            const postcodes = (await this.propertyDataService.getPostcodes() as any).data.propertyPostCodes;
            const bedrooms = (await this.propertyDataService.getBedrooms() as any).data.Bedrooms[0];
            const prices = (await this.propertyDataService.getPrices() as any).data.prices[0];
            const borough = (await this.propertyDataService.getBoroughs() as any).data.PropertyBoroughs;
            return {
                postcodes: postcodes,
                bedrooms: bedrooms,
                prices: prices,
                borough: borough
            };
        } catch (error) {
            Utils.showErrorMessage('', error);
        }
    }
}
