import { GET } from '$lib/api';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const productionRange = await getProductionRange(fetch);
	return { productionRange };
};

async function getProductionRange(fetchFunc: typeof fetch) {
	var res = await GET('', fetchFunc);
	var res = res.regions[0];
	var min = res.start_production_date + 'T00:00';
	var max = res.end_production_date + 'T00:00';
	return {
		min: min.slice(0, 4) + '-' + min.slice(4, 6) + '-' + min.slice(6),
		max: max.slice(0, 4) + '-' + max.slice(4, 6) + '-' + max.slice(6)
	};
}
