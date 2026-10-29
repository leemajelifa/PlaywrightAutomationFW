import {test,expect} from '../src/fixtures/pageFixtures.js'

test.beforeEach(async ({loginPage})=>{
    await loginPage.goToLoginPage()
    await loginPage.doLogin(process.env.USER_NAME!,process.env.PASSWORD!)
})

test("Verify Product Header Functionality Test", async({homePage, searchResultsPage,productInfoPage})=>{
    await homePage.doSearch("macbook")
    await searchResultsPage.selectAndClickProduct("MacBook Pro")
    await productInfoPage.waitForPageLoad()
    let productTitle:string=await productInfoPage.getProductHeader()
    expect(productTitle).toContain("Pro")
})

test("Count of AllProduct Images Functionality Test", async({homePage, searchResultsPage,productInfoPage})=>{
    await homePage.doSearch("macbook")
    await searchResultsPage.selectAndClickProduct("MacBook Air")

    let count:Number=await productInfoPage.getProductImgCount()
    expect(count).toBeGreaterThan(0)
})

test("Product Details Functionality Testing", async ({homePage, searchResultsPage,productInfoPage})=>{
    await homePage.doSearch("macbook")
    await searchResultsPage.selectAndClickProduct("MacBook Pro")
    let prodInfo:Map<string,string>=await productInfoPage.getProductDetails()
    console.log(prodInfo)

    expect.soft(prodInfo.get("Brand")).toBe("Apple")
    expect.soft(prodInfo.get("Product Code")).toBe("Product 18")
    expect.soft(prodInfo.get("Reward Points")).toBe("800")
    expect.soft(prodInfo.get("Availability")).toBe("In Stock")
    expect.soft(prodInfo.get("Product Price")).toBe("$2,000.00")
})

test("Verify Logo Visibility test @sanity", async({productInfoPage})=>{
    let isVisible:Boolean=await productInfoPage.isLogoVisible()
    expect(isVisible).toBe(true)

})

test("Verify Count of the Footer Links Test", async({productInfoPage})=>{
    let footerCount:Number= await productInfoPage.getPageFooterLinkCount()
    expect(footerCount).toBe(14)
})

test("Verify Add to Cart Test", async({homePage,searchResultsPage,productInfoPage})=>{
    await homePage.doSearch('macbook')
    await searchResultsPage.selectAndClickProduct('MacBook Air')

   await productInfoPage.addProductToCart()

   let successMessage:string= await productInfoPage.getSuccessMessage()
   expect(successMessage).toContain("Success")
})

test("Click on CheckOut Functionality", async ({homePage,searchResultsPage,productInfoPage})=>{
    await homePage.doSearch('iphone')
    await searchResultsPage.selectAndClickProduct("iPhone")
    await productInfoPage.addProductToCart()
    let sucess:string=await productInfoPage.getSuccessMessage()
    expect(sucess).toContain("You have added")
    console.log("product successfully added to cart")

    await productInfoPage.clickCheckOut()
    let checkOutTitle:string=await productInfoPage.getPageTitle()
    expect(checkOutTitle).toBe("Checkout")


})