export default function Config() {
    return (
        {
            API:{
                authorization:'aea17459-7535-4f8b-a8e3-d0eca96e56cb',
                baseURL:'https://api.navitia.io/v1/coverage/fr-npdc/'
            },
            routes:{
                places:{
                    args:['q']
                }
            }
        }
    )
}