import Config from '@/config'
const config = Config()

export default async function call(method, params) {
    var res = await fetch(
        config.API.baseURL+params, {
            method:method,
            headers:{
                'Authorization':config.API.authorization
            }
        }
    )
    if (res.status==200) {
        return await res.json()
    }
}