import { APIRequestContext } from "@playwright/test";

export class APIHelper
{
    private readonly baseUrl:string;
    private readonly request:APIRequestContext

    constructor(request:APIRequestContext,baseUrl:string)
    {
        this.baseUrl=baseUrl
        this.request=request
    }

    //Public Reusable HTTP Methods

     async getRequest(endPoint:string, requestHeaders?:Record<string,string>)
    {
       let response= await this.request.get(`${this.baseUrl}${endPoint}`,{headers:requestHeaders})

       return {
                statusCode: response.status(),
                responseBody: await response.json()
                }
    }

     async postRequest(endPoint:string, userData:object, requestHeaders?:Record<string,string>){
       let response=await this.request.post(`${this.baseUrl}${endPoint}`, {headers:requestHeaders,data:userData})
        
       return{

            statusCode:response.status(),
            responseBody: await response.json()

        }
    }

     async updateRequest(endPoint:string,userData:object,requestHeaders?:Record<string,string>)
    {
       let response= await this.request.put(`${this.baseUrl}${endPoint}`,{headers:requestHeaders,data:userData})

       return {
            statusCode:response.status(),
            responseBody: await response.json()
       }
    }

    async patchRequest(endPoint:string, userData:object ,requestHeaders?:Record<string,string>)
    {
        let response=await this.request.patch(`${this.baseUrl}${endPoint}`,{headers:requestHeaders,data:userData})
        return{
            statusCode:response.status(),
            responseBody: await response.json()
        }
    }

    async deleteRequest(endPoint:string, requestHeaders:Record<string,string>)
    {
       let response= await this.request.delete(`${this.baseUrl}${endPoint}`,{headers:requestHeaders})
       return {
        statusCode:response.status(),
        statusMessage: response.statusText()
       }
    }



}