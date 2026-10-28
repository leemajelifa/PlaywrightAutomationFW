import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class ProductInfoPage extends BasePage
{
    private readonly productHeader:Locator
    private readonly productImg:Locator
    private readonly productMetaData:Locator
    private readonly productPrice:Locator
    private readonly map:Map<string,string>
    private readonly addToCart:Locator
    private readonly successMessage:Locator
    private readonly checkOut:Locator

    constructor(page:Page){
        super(page)
        this.productHeader=page.locator("//h1")
        this.productImg=page.locator("//div[@class='image magnific-popup']//img")
        this.productMetaData=page.locator("(//div[@class='col-sm']//ul[@class='list-unstyled'])[1]//li")
        this.productPrice=page.locator("(//div[@class='col-sm']//ul[@class='list-unstyled'])[2]//span")
        this.map= new Map<string,string>
        this.addToCart=page.locator("#button-cart")
        this.successMessage=page.locator('//div[contains(text(),"Success")]')
        this.checkOut=page.locator("//span[text()='Checkout']")
    }

    async getProductHeader():Promise<string>
    {
       return await this.productHeader.innerText()
    }
    
    async getProductImgCount():Promise<Number>
    {
        await this.productImg.first().waitFor()
        return await this.productImg.count()
    }

    async getProductMetaData():Promise<void>
    {
        await this.productMetaData.first().waitFor()

        let metaData:string[]=await this.productMetaData.allInnerTexts()
        for(let data of metaData){
           let splitData:string[]= data.split(":")
            let metaKey:string=splitData[0].trim()
            let metaValue:string=splitData[1].trim()

            this.map.set(metaKey,metaValue)
        }
    }
    
    async getProductPrice():Promise<void>
    {
        let prodPrice:string= await this.productPrice.innerText()
        this.map.set("Product Price",prodPrice)
    }

    async getProductDetails():Promise<Map<string,string>>
    {
        await this.getProductMetaData()
        await this.getProductPrice()
        return this.map
    }

    async addProductToCart():Promise<void>
    {
        return await this.addToCart.click()
    }

    async getSuccessMessage():Promise<string>
    {
        await this.successMessage.waitFor({state:'visible'})
        return await this.successMessage.innerText()
    }

    async clickCheckOut():Promise<void>
    {
       return await this.checkOut.click()
    }

}