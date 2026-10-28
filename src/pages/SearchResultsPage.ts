import { Locator, Page } from "@playwright/test"
import {BasePage} from "./BasePage.js"

export class SearchResultsPage extends BasePage{

    private readonly resultHeader:Locator
    private readonly searchResults:Locator

    constructor(page:Page){
        super(page)
        this.resultHeader=page.locator("//h1")
        this.searchResults=page.locator("//h4//a")
    }

    async getSearchResultsPageTitle():Promise<string>
    {
        return await this.page.title()
    }

    async getSearchResultsPageHeader():Promise<string>
    {
        return await this.resultHeader.innerText()
    }

    async getSearchResultCount():Promise<Number>
    {
        return await this.searchResults.count()
    }

    async selectAndClickProduct(productName:string):Promise<void>
    {
        //will not work for samsung and other products cause of [2] --hard code

    //    let productLocator= this.page.locator(`(//a[text()='${productName}'])[2]`)
    //     console.log("CLicking on the product named :"+productName)
    //     await productLocator.click()

       //My Logic to click a product but may not work cause div tag has no link...so change the locator prod-thumb to //h4//a which shows each name of product plus helpful for count
        let allLocators:Locator[]=await this.searchResults.all()
        for(let loc of allLocators){
            if(await loc.innerText()==productName){
               await loc.click()
               break;
            }
        }
    }
}