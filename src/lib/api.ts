import { resolve } from "$app/paths"

export async function GET(endpoint: string, fetchFunc?: typeof fetch) {
  let url = resolve('/api/proxy/[...endpoint]', {
    endpoint: endpoint
  })
  let res
  if (fetchFunc) {
    res = await fetchFunc(url)
  } else {
    res = await fetch(url)
  }
  return await res.json()
}

// Todo: Add error handeling / notifications
// {"error":{"id":"no_destination","message":"Public transport is not reachable from destination"},"feed_publishers":[],"links":[],"tickets":[],"disruptions":[],"context":{"current_datetime":"20250809T061635","timezone":"Europe\/Paris"},"notes":[],"exceptions":[]}
// {"error":{"id":"no_solution","message":"no solution found for this journey"},"feed_publishers":[],"links":[],"tickets":[],"disruptions":[],"context":{"current_datetime":"20250809T175111","timezone":"Europe\/Paris"},"notes":[],"exceptions":[]}

export async function getPlaces(searchText: String): Promise<ApiGetPlaces | undefined> {
  return await GET('places?q='+searchText)
}

export async function getPlace(id: string, name: string): Promise<Place | undefined> {
  let res: ApiGetPlaces = await GET(`places?q=${encodeURIComponent(name)}`)
  return res.places.find((place, i, places) => {
    return place.id == id
  }) || res.places?.[0]
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
  return await GET('journeys' + params) // &data_freshness=realtime
}