import {test, expect} from '@playwright/test'
import { compose } from 'node:stream'

let auth_token={'Authorization':'Bearer 1c79d2d8180aa00260331b56baadf6f4c8f54a219983d878df5ac0dac264e9ce'}

test("Fetch a single user", async ({request})=>{
   let response=await request.get('https://gorest.co.in/public/v2/users/8680363', {headers:auth_token})
    console.log(response) //JS object in return

    let response_Data=await response.json() //conversion into Json string
    console.log(response_Data)
    console.log(response.status())
    console.log(response.statusText())
})

test("Fetching Multiple Users", async({request})=>{
    let response=await request.get("https://gorest.co.in/public/v2/users",{headers:auth_token})
    console.log(response)

    let responseBody=await response.json()
    console.log(responseBody)

    console.log("Response Code is "+response.status())
    console.log("Response Message "+response.statusText())
})

test("Creating a new Resource", async({request})=>{
    let userData=
        {
            "name":"Lee",
            "email":`lee${Date.now()}@gmail.com`,
            "gender":"female",
            "status":"active"
        }
    let response=await request.post("https://gorest.co.in/public/v2/users",{headers:auth_token,data:userData})
    console.log(response)

    let responseBody= await response.json()
    console.log(responseBody)

    console.log(response.status())
    console.log(response.statusText())

})

test("Update created user", async({request})=>{
    let userData= {
        "name":"lee",
        "email":"lee@gmail.com",
        "gender":"female",
        "status":"inactive"
    }
    let response=await request.put("https://gorest.co.in/public/v2/users/8686224",{headers:auth_token,data:userData})
    console.log(response)

   let responseBody= await response.json()
   console.log(responseBody)

    console.log(response.status())
    console.log(response.statusText())

})

test("Delete Created User", async ({request})=>{
   let response=await request.delete("https://gorest.co.in/public/v2/users/8686224",{headers:auth_token})
    console.log(response)

    console.log("Response code is "+response.status())
    console.log("Response Message "+response.statusText())
})