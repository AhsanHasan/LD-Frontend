import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: []
})
export class InjectionModule {
    constructor(private injector: Injector) {
        InjectorInstance = this.injector;
    }
}

export let InjectorInstance: Injector;
