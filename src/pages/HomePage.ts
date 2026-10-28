import { Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage.js'

export class HomePage extends BasePage
{
   
    private readonly logoutLink:Locator
    private readonly headers:Locator
    // private readonly searchBar:Locator
    // private readonly searchIcon:Locator

    constructor(page:Page){
        super(page)

        this.logoutLink=page.locator("(//a[text()='Logout'])[2]")
        this.headers=page.locator("//h2")
        // this.searchBar=page.locator("input[name='search']")
        // this.searchIcon=page.locator("button[class*='btn-light']")
    }


    async getHomePageTitle():Promise<string>
    {
       return await this.page.title()
    }

    async isLogoutLinkPresent():Promise<boolean>
    {
        return await this.logoutLink.isVisible()
    }

    async getHeaders():Promise<string[]>
    {
        let allHeaders:string[]=await this.headers.allInnerTexts()
        return allHeaders
    }

    async doSearch(searchText:string):Promise<void>
    {
        console.log(`Searching for Product : ${searchText}`)
        await this.search.fill(searchText)
        await this.searchIcon.click()
        
    }

}