import { Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class CheckOutPage extends BasePage
{
    private readonly shippingAddress;
    private readonly shippingMethod;
    private readonly paymentMethod;
    private readonly shippingMethodOption;
    private readonly paymentMethodOption
    private readonly confirmOrder;

    
    constructor(page:Page){
        super(page)
        this.shippingAddress=page.locator("//select[@name='address_id']")
        this.shippingMethod=page.locator("#button-shipping-methods")
        this.paymentMethod=page.locator("#button-payment-methods")
        this.shippingMethodOption=page.locator("//button[@id='button-shipping-method']")
        this.paymentMethodOption= page.locator("//button[@id='button-payment-method']")
        this.confirmOrder=page.locator("#button-confirm")
    }

    async clickShippingAddress():Promise<Array<string>>
    {
        return await this.shippingAddress.selectOption({value:"2"})

    }

    async clickShippingMethod():Promise<void>
    {
        await this.shippingMethod.click()
        await this.shippingMethodOption.waitFor({timeout:2000})
         await this.shippingMethodOption.click()
    }

    async clickPaymentMethod():Promise<void>
    {
        await this.paymentMethod.click()
        // await this.shippingMethodOption.waitFor({timeout:3000})
        await this.paymentMethodOption.click()
    }

    async clickConfirmOrder():Promise<void>
    {
        await this.confirmOrder.click()
        await this.confirmOrder.waitFor({timeout:5000})
    }


}