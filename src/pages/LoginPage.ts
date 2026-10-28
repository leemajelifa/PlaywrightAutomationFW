import {Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage.js'

export class LoginPage extends BasePage{
    private readonly emailId:Locator
    private readonly password:Locator
    private readonly loginButton:Locator
    private readonly passwordLink:Locator
    private readonly loginErrorMessage:Locator

    constructor(page:Page){
        super(page)
        this.emailId=page.getByPlaceholder("E-Mail Address")
        this.password=page.getByPlaceholder("Password")
        this.loginButton=page.locator("button[class='btn btn-primary']")
        this.passwordLink=page.locator("(//a[text()='Forgotten Password'])[1]")
        this.loginErrorMessage=page.locator("//div[contains(@class,'alert-danger')]")
    }

    async goToLoginPage():Promise<void>
    {
         await this.page.goto("en-gb?route=account/login")
    }
    async getLoginPageTitle():Promise<string>
    {
        return await this.page.title()
    }

    async isForgotPwdLinkAvailable():Promise<Boolean>
    {
        return await this.passwordLink.isVisible()
    }

    async doLogin(username:string,password:string)
    {
        await this.emailId.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()

        await this.page.waitForTimeout(2000)
    }

    async getLoginErrorMessage():Promise<string>
    {
        return await this.loginErrorMessage.innerText()
    }
}