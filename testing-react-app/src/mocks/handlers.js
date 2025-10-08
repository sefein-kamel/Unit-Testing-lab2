import { http, HttpResponse } from "msw";
import { setupServer } from 'msw/node'

const handlers=[
    http.get('https://api.chucknorris.io/jokes/random',()=>{
        return HttpResponse.json({value:"our fake joke"})
    })
   /*  ,
    http.post() */
]

const server =setupServer(...handlers)

export default server