import {test, expect} from '../src/fixtures/pageFixtures.js'

test.beforeEach(async ({loginPage})=>{
    await loginPage.goToLoginPage()
    await loginPage.doLogin(process.env.USER_NAME!,process.env.PASSWORD!)
})

test("Verifying Selection Of Shipping Address", async({page,homePage,searchResultsPage,productInfoPage,checkOutPage})=>{
    await homePage.doSearch('iphone')
    await searchResultsPage.selectAndClickProduct("iPhone")
    await productInfoPage.addProductToCart()
    await productInfoPage.clickCheckOut()
    await checkOutPage.clickShippingAddress()
    await checkOutPage.clickShippingMethod()
    await checkOutPage.clickPaymentMethod()
    await checkOutPage.clickConfirmOrder()

    await page.waitForTimeout(5000)
    
    let title:string=await checkOutPage.getPageTitle()
    console.log(title)
    expect(title).toContain("Your order has been placed!")
})