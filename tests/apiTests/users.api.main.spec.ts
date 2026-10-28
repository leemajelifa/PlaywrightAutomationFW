import {test,expect} from '../../src/fixtures/apiFixtures.js'

const TOKEN=process.env.API_TOKEN

let userId:number
let AUTH_TOKEN={Authorization:`Bearer ${TOKEN}`}

test.describe.serial("End to End API test cases", ()=>{

test("Get All the Users", async({apiHelper})=>{
    let response=await apiHelper.getRequest('/public/v2/users',AUTH_TOKEN)
    
    console.log(response.responseBody)
    expect(response.statusCode).toBe(200)
    expect(response.responseBody.length).toBeGreaterThan(5)
})

test("Create new resource", async({apiHelper})=>{
    let userData=
    {
        "name":"lee",
        "email":`lee${Date.now()}@gmail.com`,
        "gender":"female",
        "status":"active"
    }
    

    let response= await apiHelper.postRequest('/public/v2/users',userData,AUTH_TOKEN)
    console.log(response.responseBody)

    expect(response.statusCode).toBe(201)
    expect(response.responseBody.name).toBe(userData.name)

    userId=response.responseBody.id
    console.log(userId)
})

test("update new Resource", async({apiHelper})=>{
     let userData=
    {
        "name":"liza Meral",
        "email":`liza${Date.now()}@gmail.com`,
        "gender":"female",
        "status":"inactive"
    }

    console.log(userId)

    let response=await apiHelper.updateRequest(`/public/v2/users/${userId}`, userData, AUTH_TOKEN)
    console.log(response.responseBody)

    expect(response.statusCode).toBe(200)
    expect(response.responseBody.name).toBe(userData.name)
})

test("Udpate email and status", async ({apiHelper})=>{
let userData = 
{
    "email":"leelu@gmail.com",
    "status":"active"
}
   let response= await apiHelper.patchRequest(`/public/v2/users/${userId}`,userData, AUTH_TOKEN)
    console.log(response.responseBody)
    expect(response.statusCode).toBe(200)
    expect(response.responseBody.email).toBe(userData.email)

})

test("Delete the created User", async ({apiHelper})=>{

    let response=await apiHelper.deleteRequest(`/public/v2/users/${userId}`,AUTH_TOKEN)

    console.log(response.statusMessage)
    expect(response.statusCode).toBe(204)
    expect(response.statusMessage).toBe("No Content")
})

})