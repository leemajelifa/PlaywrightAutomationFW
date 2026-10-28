

import { CsvHelper } from 'src/utils/csvUtils.js'
import {test,expect} from '../src/fixtures/pageFixtures.js'

test.beforeEach( async ({loginPage})=>{
    await loginPage.goToLoginPage()
    await loginPage.doLogin(process.env.USER_NAME!,process.env.PASSWORD!)
})

test("Verify Search Header Functionality Test", async({homePage,searchResultsPage})=>{
    await homePage.doSearch("macbook")

    let headerSearchPage:string=await searchResultsPage.getSearchResultsPageHeader()
    expect(headerSearchPage).toBe('Search - macbook')
    
    //best only if title has no xpath to locate 
    // let headerSearchPage:string=await searchResultsPage.getSearchResultsPageTitle()
    // expect(headerSearchPage).toBe('Search - macbook')
})

test("Verify Search Functionality Count Test", async({homePage,searchResultsPage})=>{
    await homePage.doSearch("samsung")
    let searchCount:Number=await searchResultsPage.getSearchResultCount()
    expect(searchCount).toBeGreaterThan(0)
})

test("Verify CLick Product Functionality Test", async({homePage,searchResultsPage,page})=>{
    await homePage.doSearch("samsung")
    await searchResultsPage.selectAndClickProduct("Samsung SyncMaster 941BW")
    await expect(page).toHaveTitle("Samsung SyncMaster 941BW")
})

let searchItem:Record<string,string>[]=CsvHelper.readCsv("src/testData/searchData.csv")
for (let data of searchItem){

    test(`Verify multiple Data Search Functionality for ${data.searchKey} `, async({searchResultsPage,homePage})=>{
    
        await homePage.doSearch(data.searchKey)
        let searchCount:Number=await searchResultsPage.getSearchResultCount()
        console.log(`The count of the product name ${data.searchKey} is ${searchCount}`)
        expect(searchCount).toEqual(Number(data.count))
       })
    }

let prodName:Record<string,string>[]=CsvHelper.readCsv("src/testData/searchData.csv")
for (let data of prodName){
    test(`Testing the Click functionality of product name ${data.productName}`, async({homePage,searchResultsPage, productInfoPage})=>{
        await homePage.doSearch(data.searchKey)
        await searchResultsPage.selectAndClickProduct(data.productName)
        let resultTitle:string=await searchResultsPage.getPageTitle()
        let imgCount:Number= await productInfoPage.getProductImgCount()
        console.log(`the product title of ${data.searchKey} is ${resultTitle} and the count of images ${imgCount}`)
        expect(resultTitle).toContain(data.productName)
    })
}