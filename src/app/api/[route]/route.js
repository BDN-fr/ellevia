import Config from '@/config'

const config = Config()

export async function GET(
    request,
    { params },
) {
    const route = (await params).route;

    var searchParams = await request.nextUrl.searchParams;
    var string = '?' + new URLSearchParams(searchParams).toString();

    var res = await fetch(config.API.baseURL+route+string, {
        "headers": {
            "authorization": config.API.authorization
        }
    })
    var json = await res.json()
    return new Response (JSON.stringify(json), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}