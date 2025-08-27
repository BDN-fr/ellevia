const authorization = "aea17459-7535-4f8b-a8e3-d0eca96e56cb" // Avalaible on any request to the api on ilevia's website, so no need to hide it
const baseURL = "https://api.navitia.io/v1/coverage/fr-npdc"
// export const productionRange = await getProductionRange()
export const productionRange = {min: '2025-08-01T00:00', max: '2025-08-01T00:00'} // Placeholder data until I find a new way of accessing the API (Doing this this way is fucking ugly)

async function GET(endpoint: String) {
  let res = await fetch(baseURL + endpoint, {
    "headers":{
      "authorization":authorization
    },
    "method":"GET",
    // "referrer":"https://www.ilevia.fr/"
  })
  return await res.json()
}

async function getProductionRange() {
  var res = await GET('/')
  var res = res.regions[0]
  var min = res.start_production_date + "T00:00"
  var max = res.end_production_date + "T00:00"
  return {min: min.slice(0,4) + '-' + min.slice(4,6) + '-' + min.slice(6), max: max.slice(0,4) + '-' + max.slice(4,6) + '-' + max.slice(6)}
}

// Todo: Add error handeling / notifications
// {"error":{"id":"no_destination","message":"Public transport is not reachable from destination"},"feed_publishers":[],"links":[],"tickets":[],"disruptions":[],"context":{"current_datetime":"20250809T061635","timezone":"Europe\/Paris"},"notes":[],"exceptions":[]}
// {"error":{"id":"no_solution","message":"no solution found for this journey"},"feed_publishers":[],"links":[],"tickets":[],"disruptions":[],"context":{"current_datetime":"20250809T175111","timezone":"Europe\/Paris"},"notes":[],"exceptions":[]}

export async function getPlaces(searchText: String): Promise<ApiGetPlaces | undefined> {
  return await GET('/places?q='+searchText)
}

export async function getPlace(id: string): Promise<ApiGetPlaces | undefined> {
  return await GET('/places/'+id)
}

export async function getJourneys(from?: Coord | string, to?: Coord | string, datetime?: string | undefined | null, datetimeType?: "departure" | "arrival" | undefined): Promise<ApiGetJourneys | undefined> {
  if (!(from && to)) {
    console.error('from or to have to be defined')
    return
  }
  var params = '?'
  if (from) {
    if (typeof from == "object") {
      params += 'from=' + encodeURIComponent(from.lon + ';' + from.lat)
    } else {
      params += 'from=' + encodeURIComponent(from)
    }
  }
  if (from && to) {
    params += '&'
  }
  if (to) {
    if (typeof to == "object") {
      params += 'to=' + encodeURIComponent(to.lon + ';' + to.lat)
    } else {
      params += 'to=' + encodeURIComponent(to)
    }
  }
  if (datetime) {
    params += "&datetime=" + encodeURIComponent(datetime)
  }
  if (datetimeType) {
    params += "&datetime_represents=" + encodeURI(datetimeType)
  }
  return await GET('/journeys' + params + "&free_radius_from=10&free_radius_to=10") // &data_freshness=realtime
}