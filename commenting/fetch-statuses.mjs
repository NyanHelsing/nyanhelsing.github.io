// TODO: Put this in config
//
const mastodonInstance = "mastodon.social";
const baseUrl = new URL(`https://${mastodonInstance}`);

// TODO: Put this in consts
const endpoints = {
    statuses: `/api/v1/statuses`
};


const statusForIdUrl = (id) => {
    return new URL(`${endpoints.statuses}/${id}`, baseUrl);
};
const statusContextForIdUrl = (id) => {
    return new URL(`${endpoints.statuses}/${id}/context`, baseUrl);
};

export const fetchStatusById = async (id) => {
    const response = await fetch(statusForIdUrl(id));
    return await response.json();
};
export const fetchContextForStatusById = async (id) => {
    const response = await fetch(statusContextForIdUrl(id));
    return await response.json();
};

//   /api/v1/statuses/112119988279391292/context"


