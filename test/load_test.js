import { check } from "k6"
import http from "k6/http"

export const options = {
    stages:[
        {duration:"1s",target:5},
        {duration:"5s",target:15},
        {duration:"5s",target:50},
        {duration:"1s",target:2}
    ]
}

export default function(){
    const res = http.get("https://fakestoreapi.com/products")
    check(res,{
        "Status is 200":(e)=>e.status===200,
        "return array":(e)=>{
            try{
                const d = JSON.parse(e.body)
                return Array.isArray(d) && d.length > 0
            } catch(err){
                return false
            }
        }
    })
}