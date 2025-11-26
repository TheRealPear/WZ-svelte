import config from '$lib/config.json';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
    // params.username comes from the [username] route segment
    const { username } = params;

    if (!username) {
        throw error(400, 'Missing username');
    }

    const url = `${config.API_BASE}/mc/players/${encodeURIComponent(username)}`;
    const res = await fetch(url);

    if (res.status === 404) {
        throw error(404, 'Player not found');
    }

    if (!res.ok) {
        // other errors (rate limit, 5xx, etc.)
        throw error(res.status || 500, 'Failed to fetch player data');
    }

    const player = await res.json();

    return { player };
};
