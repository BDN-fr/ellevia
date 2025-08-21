import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  let journey = atob(params.journey)
  return journey
};