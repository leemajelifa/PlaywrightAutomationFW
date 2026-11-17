import {test as setup} from '../src/fixtures/pageFixtures.js'

const authFile= 'playwright/.auth/user.json'

setup('authenticate', async({page,loginPage})=>{
// Perform authentication steps
    await loginPage.goToLoginPage()
    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!)
    await page.context().storageState({ path : authFile })

})