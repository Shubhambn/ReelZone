
import {IVideo} from "@/models/Video"

export type videoFormData= Omit<IVideo,"_id">
type FetchOptions<T=unknown>={
    method? :"GET"|"POST"|"PUT"|"DELETE"
    body?:T
    headers?:Record<string,string>

}
class ApiClient{
    private async fetch<T>(
        endpoint:string,
        options:FetchOptions={}
    ):Promise<T>{
        const{method="GET",body,headers={}}=options

        const defaultHeaders={
            "Content-Type":"application/json",
            ...headers
        }

        const response=await fetch(`/api/${endpoint}`,{
            method,
            headers:defaultHeaders,
            body:body? JSON.stringify(body):undefined
        })
        if(!response.ok){
            throw new Error(await response.text())
        }
        return response.json()
    }
    //Get new Video
  async getVideos() {
    return this.fetch<IVideo[]>("/videos");
  }
    // 🔹 Create a new video
  async createVideo(data: videoFormData) {
    return this.fetch<IVideo>("/videos", {
      method: "POST",
      body: data,
    });
  }
}
export const apiClient=new ApiClient()