import {CsvHelper} from 'src/utils/csvUtils.js'
import {test,expect} from '../src/fixtures/pageFixtures.js'
import {ExcelHelper} from '../src/utils/excelUtils.js'
import {JsonHelper} from '../src/utils/jsonUtils.js'

test.beforeEach(async ({loginPage})=>{
   
    await loginPage.goToLoginPage()

})

test('Login Page Title Test', async({loginPage})=>{

    let title=await loginPage.getLoginPageTitle()
    expect(title).toBe("Account Login")
})

test("Forgot Password Link Exist Test", async({loginPage})=>{
   
   let isForgotPasswordVisible=await loginPage.isForgotPwdLinkAvailable()
    expect(isForgotPasswordVisible).toBe(true)
    })

test("Logo Visible Test", async({loginPage})=>{
    let isLogoVisible:Boolean=await loginPage.isLogoVisible()
    console.log(isLogoVisible)
    
})

test("Actual Login Test @sanity", async({loginPage,homePage})=>{
    await loginPage.doLogin(process.env.USER_NAME!,process.env.PASSWORD!)

    //assertions
    // let homPageTitle:string=await hp.getHomePageTitle()
    // expect(homPageTitle).toBe("My Account")

    //OR

   let isLogoutLinkPresent:boolean= await homePage.isLogoutLinkPresent()
   expect(isLogoutLinkPresent).toBeTruthy()
    
})

//pic the data from csv file
let testData:Record<string, string>[]=CsvHelper.readCsv('src/testData/loginData.csv')
 
for (let data of testData)
{
    test(`Negative Login Test with username: ${data.username} and paswd:${data.password}` , async({loginPage})=>{
    await loginPage.doLogin(data.username,data.password)
    let errorMessage:string=await loginPage.getLoginErrorMessage()
    
    expect(errorMessage).toContain("Warning: No match for E-Mail Address and/or Password.")

})
}

//pic data from excel sheet'

let excelTestData:Record<string,string>[]= ExcelHelper.readExcel('src/testData/testData.xlsx')

for(let data of excelTestData){

    test(`negative login test for excel sheet with username: ${data.username} and paswd:${data.password}`, async({loginPage})=>{
        await loginPage.doLogin(data.username,data.password)
        let errorMessage=await loginPage.getLoginErrorMessage()
        expect(errorMessage).toContain("Warning: No match for E-Mail Address and/or Password.")
    })
}

////pic data from json sheet'

let jsonData:Record<string, string>[]=JsonHelper.readJson('src/testData/jsonData.json')

for(let data of jsonData){
    test(`negative login test for json file with username: ${data.username} and paswd:${data.password}`, async({loginPage})=>{
        await loginPage.doLogin(data.username,data.password)
        let errorMessage=await loginPage.getLoginErrorMessage()
        expect(errorMessage).toContain("Warning: No match for E-Mail Address and/or Password.")
    })

}