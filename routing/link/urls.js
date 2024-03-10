const urlPathnamesAreEqual = (url1, url2) => url1.pathname === url2.pathname;

// We can't use the URL's `search` property directly because it doesn't
// handle the case where the order of the query parameters is different.
const searchParamEqualIn =
    (url) =>
    ([key, value]) =>
        url.searchParams.get(key) === value;

const areUrls = (...urls) => urls.every((url) => url instanceof URL);

export const urlsAreEqual = (url1, url2) =>
    [
        url1 instanceof URL,
        url2 instanceof URL,
        urlPathnamesAreEqual(url1, url2)
        //url1.searchParams.entries().every(searchParamEqualIn(url2)),
        //url2.searchParams.entries().every(searchParamEqualIn(url1))
    ].every(Boolean);
