import {Locator, Page} from '@playwright/test'

export class BasePage{
    protected readonly page:Page
    private readonly logo:Locator
    protected readonly search:Locator
    protected readonly searchIcon:Locator
    private readonly footerLink:Locator
    private readonly currency:Locator
    private readonly cartButton:Locator


    constructor(page:Page){
        this.page=page
        this.logo=page.getByTitle("NLTECH Trainings Hub")
        this.search=page.getByPlaceholder("Search")
        this.searchIcon=page.locator("button[class*=btn-light]")
        this.footerLink=page.locator("//footer//div[@class='col-sm-3']//a")
        this.currency=page.locator("//span[text()='Currency']")
        this.cartButton=page.locator("button[class*='btn-dark']")

    }

    async isLogoVisible():Promise<Boolean>
    {
        return await this.logo.isVisible()
    }

    async isSearchBoxVisible():Promise<Boolean>
    {
       return await this.search.isVisible()
    }

    async isAddToCartVisible(){
        return this.cartButton.isVisible()
    }

    async isCurrencyVisible():Promise<Boolean>
    {
        return  await this.currency.isVisible()
    }

    async getPageFooterLinkCount():Promise<Number>
    {
        return await this.footerLink.count()
    }

    async getAllFooters():Promise<String[]>
    {
        return await this.footerLink.allInnerTexts()
    }

    //Page Level Generic Method

    async getPageTitle():Promise<string>
    {
        return await this.page.title()
    }

    getCurrentUrl(): string {
        return this.page.url()
    }

    async waitForPageLoad():Promise<void>
    {
        return await this.page.waitForLoadState('load')
    }


}