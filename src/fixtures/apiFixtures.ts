
import { APIHelper } from "../api/APIHelper.js";
import {test as baseTest,expect} from "@playwright/test"

//define types for API fixtures

type apiFixtures={
    apiHelper:APIHelper
}

export let test=baseTest.extend<apiFixtures>({

    apiHelper:async ({request},use)=>{
        let apiHelper=new APIHelper(request, process.env.API_BASE_URL!)
        await use(apiHelper)
    }
})

export {expect} from '@playwright/test'


