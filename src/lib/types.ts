interface Coord {
  lat: string,
  lon: string
}

interface AdministrativeRegion {
  id: string;
  insee: string;
  name: string;
  label: string;
  level: number;
  coord: Coord;
  zip_code: string | null;
}

interface CommercialMode {
  id: string;
  name: string;
}

interface PhysicalMode {
  id: string;
  name: string;
}

interface Comment {
  type: string;
  value: string;
}

interface Code {
  type: string;
  value: string;
}

interface Line {
  id: string;
  name: string;
  code: string;
  commercial_mode: CommercialMode;
  physical_modes: PhysicalMode[];
  network: {
    id: string;
    name: string;
  };
  color: string;
  text_color: string;
}

interface StopArea {
  id: string;
  coord: Coord;
  label: string;
  name: string;
  administrative_regions: AdministrativeRegion[];
  timezone: string;
  commercial_modes: CommercialMode[];
  physical_modes: PhysicalMode[];
  comments: Comment[];
  comment: string;
  codes: Code[];
  lines: Line[];
}

interface Address {
  id: string;
  coord: Coord;
  house_number: number;
  label: string;
  name: string;
  administrative_regions: AdministrativeRegion[];
}

interface Place {
  id: string;
  name: string;
  quality: number;
  embedded_type: keyof Place & ("adress" | "stop_area");
  stop_area?: StopArea;
  address?: Address;
}

interface Warning {
  id: string;
  message: string;
}

interface FeedPublisher {
  id: string;
  license: string;
  name: string;
  url: string;
}

interface Context {
  current_datetime: string;
  timezone: string;
}

interface Link {
  href: string;
  templated: boolean;
  rel: string;
  type: string;
}

interface ApiGetPlaces {
  places: Place[];
  warnings: Warning[];
  feed_publishers: FeedPublisher[];
  context: Context;
  links: Link[];
}