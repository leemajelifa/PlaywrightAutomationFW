import {test,expect} from '../src/fixtures/pageFixtures.js'

test.beforeEach(async({loginPage})=>{

    await loginPage.goToLoginPage()
   await loginPage.doLogin(process.env.USER_NAME!,process.env.PASSWORD!)
})

test("Home Page Title Test", async({homePage})=>{

   let hometitle:string=await homePage.getHomePageTitle()
   expect(hometitle).toBe("My Account")
})

test("Home Page Logout Link Test", async({homePage})=>{

   let isLogoutLinkAvail:boolean=await homePage.isLogoutLinkPresent()
   expect(isLogoutLinkAvail).toBeTruthy()
})

test("Home Page Headers Text Test", async({homePage})=>{

   let allHeaders:string[]=await homePage.getHeaders()
   console.log(allHeaders)
   expect(allHeaders).toHaveLength(3)
   expect.soft(allHeaders).toEqual(["My Orders","My Affiliate Account","Newsletter"])
})

test("Search Product Functionality", async({homePage,searchResultsPage})=>{
    await homePage.doSearch('MacBook')
    let title:string=await searchResultsPage.getSearchResultsPageTitle()

    expect(title).toContain("Search - MacBook")

})