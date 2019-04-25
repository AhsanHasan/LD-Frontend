import { NgModule, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { InjectorInstance } from './helpers/injection.module';
declare const mApp: any;

@NgModule()
export class Utils {
/**
     * Show error messages whenever occured.
     * @todo use a plugin to toast error notifications.
     * @param text string
     * @param error obj
     */
    public static showErrorMessage(text, error) {
        console.log(error);
    }

    /**
     * Show loader on entire page
     */
    public static blockPage() {
        const platformId = InjectorInstance.get(<any>PLATFORM_ID);
        if (isPlatformBrowser(platformId)) {
            mApp.blockPage();
        }
    }

    /**
     * Hide loader from the page
     */
    public static unblockPage() {
        const platformId = InjectorInstance.get(<any>PLATFORM_ID);
        if (isPlatformBrowser(platformId)) {
            mApp.unblockPage();
        }
    }

    /**
     * Show loader on an element
     * @param element element selector e.g. #div-id
     */
    public static showLoader(element) {
        const platformId = InjectorInstance.get(<any>PLATFORM_ID);
        if (isPlatformBrowser(platformId)) {
            mApp.showLoader(element);
        }
    }

    /**
     * Hide loader on an element
     * @param element element selector e.g. #div-id
     */
    public static hideLoader(element) {
        const platformId = InjectorInstance.get(<any>PLATFORM_ID);
        if (isPlatformBrowser(platformId)) {
            mApp.hideLoader(element);
        }
    }
}
