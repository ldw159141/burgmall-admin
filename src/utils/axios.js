import axios from "axios"
import Element from "element-ui"


const request = axios.create({
    
    baseURL: "http://localhost:8282/",
    timeout: 8000,
    headers: {
        
    }
})

request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token") 
    return config
})


request.interceptors.response.use(
    response => {

        let res = response.data
        if(response == null){
          return  Element.Message.error("返回为空")
        }
        if(response.data.code === 403){
            return  Element.Message.error("权限不足")
        }
        if(response.data.code === 401){
            return  Element.Message.error("账号密码错误")
        }
        if (res.code === 200) {
          //  Element.Message.success(res.msg)
             return response.data
        } else {

            //重定向||权限不足
            //这里在引入spring security之后报错了，返回code但是没办法正常处理
            // if (res.code === 301 || res.code === 401) {
            //    Element.Message.error(res.msg)
            //     router.push({ path: "/login" })
            //     return Promise.resolve(res.msg)
            // } else {
            //     Element.Message.error(!res.msg?"系统异常，请联系管理员":res.msg)
            //     return Promise.resolve(res.msg)
                
            // }
            
        }

        
    },
    error => {
        if(error.response.status === 401){
            return  Element.Message.error(error.response.data.msg)
        }if(error.response.status === 403){
            return  Element.Message.error("权限不足")
        }else{
            console.log(error);
              return   Element.Message.error(error)
        }
     
      
     
    }
)

export default request