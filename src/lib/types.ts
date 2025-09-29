interface Coord {
	lat: string;
	lon: string;
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
	embedded_type: keyof Place & ('adress' | 'stop_area');
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

interface Co2Emission {
	value: number;
	unit: string;
}

interface AirPollutants {
	unit: string;
	values: {
		nox: number;
		pm: number;
	};
}

interface JourneyDurations {
	total: number;
	walking: number;
	bike: number;
	car: number;
	ridesharing: number;
	taxi: number;
}

interface JourneyDistances {
	walking: number;
	bike: number;
	car: number;
	ridesharing: number;
	taxi: number;
}

interface Fare {
	found: boolean;
	total?: {
		value: string;
	};
	links: Link[];
}

interface Calendar {
	week_pattern: {
		monday: boolean;
		tuesday: boolean;
		wednesday: boolean;
		thursday: boolean;
		friday: boolean;
		saturday: boolean;
		sunday: boolean;
	};
	active_periods: {
		begin: string;
		end: string;
	}[];
}

interface PathInstruction {
	length: number;
	name: string;
	duration: number;
	direction: number;
	instruction: string;
	instruction_start_coordinate: Coord;
}

interface SectionBase {
	id: string;
	duration: number;
	co2_emission: Co2Emission;
	departure_date_time: string;
	arrival_date_time: string;
	type: string;
	links: Link[];
}

interface WaitingSection extends SectionBase {
	type: 'waiting';
}

interface TransferSection extends SectionBase {
	type: 'transfer';
	transfer_type: string;
	from?: Place;
	to?: Place;
}

interface StreetNetworkSection extends SectionBase {
	type: 'street_network' | 'non_pt_walk';
	to: Place;
	from: Place;
	geojson: {
		type: string;
		coordinates: number[][];
		properties: { length: number }[];
	};
	mode: string;
	path?: PathInstruction[];
}

interface PublicTransportSection extends SectionBase {
	type: 'public_transport' | 'on_demand_transport';
	base_departure_date_time?: string;
	base_arrival_date_time?: string;
	data_freshness?: string;
	to: Place;
	from: Place;
	additional_informations?: string[];
	geojson: {
		type: string;
		coordinates: number[][];
		properties: { length: number }[];
	};
	display_informations: {
		commercial_mode: string;
		network: string;
		direction: string;
		label: string;
		color: string;
		code: string;
		headsign: string;
		name: string;
		links: Link[];
		text_color: string;
		trip_short_name: string;
		description: string;
		physical_mode: string;
		equipments: any[];
	};
	stop_date_times: {
		departure_date_time: string;
		base_departure_date_time?: string;
		arrival_date_time: string;
		base_arrival_date_time?: string;
		stop_point: Place;
		additional_informations?: string[];
		links: Link[];
	}[];
}

type Section = StreetNetworkSection | PublicTransportSection | WaitingSection | TransferSection;

interface Journey {
	duration: number;
	nb_transfers: number;
	departure_date_time: string;
	arrival_date_time: string;
	requested_date_time: string;
	type: string;
	status: string;
	tags: string[];
	co2_emission: Co2Emission;
	air_pollutants: AirPollutants;
	durations: JourneyDurations;
	distances: JourneyDistances;
	fare: Fare;
	sections: Section[];
	links?: Link[];
}

interface pt_object {
	id: string;
	name: string;
	quality: number;
	embedded_type: 'line';
	line?: Line;
}

interface Disruption {
	id: string;
	disruption_id: string;
	impact_id: string;
	application_periods: {
		begin: string;
		end: string;
	}[];
	status: string;
	updated_at: string;
	cause: string;
	severity: {
		name: string;
		effect: string;
		color: string;
		priority: number;
	};
	messages: {
		text: string;
		channel: {
			content_type: string;
			id: string;
			name: string;
			types: string[];
		};
	}[];
	impacted_objects: {
		pt_object?: pt_object;
	}[];
	uri: string;
	disruption_uri: string;
	contributor: string;
}

interface ApiGetJourneys {
	feed_publishers: FeedPublisher[];
	links: Link[];
	journeys: Journey[];
	tickets: any[];
	disruptions: Disruption[];
	terminus: StopArea[];
	context: Context;
	notes: any[];
	exceptions: any[];
	error?: {
		id: string;
		message: string;
	};
}
