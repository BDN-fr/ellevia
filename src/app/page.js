import PlaceSearch from "@/components/placeSearch";

export default function Home() {
    return (
        <main className="h-center">
            <PlaceSearch placeholder={'Rechercher un lieu...'}/>
            <PlaceSearch placeholder={'Rechercher un lieu mais c\'est le 2...'}/>
            <PlaceSearch placeholder={'Rechercher un lieu mais c\'est le 3...'}/>
        </main>
    );
}
