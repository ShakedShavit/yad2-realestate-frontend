import Cookies from 'js-cookie';

const QUERY_PARAMS_DATA = "query-params-data";

export const saveSearchParamsOnCookie = (searchParamsData) => {
    const jsonSearchParamsData = JSON.stringify(searchParamsData);
    Cookies.set(QUERY_PARAMS_DATA, jsonSearchParamsData, { expires: 1/24, sameSite: "strict" });
    if (!Cookies.get(QUERY_PARAMS_DATA))
        console.log('search query params data size is too large to be contained in a cookie')
};

export const deleteSearchParamsFromCookie = () => {
    Cookies.remove(QUERY_PARAMS_DATA, { sameSite: "strict" });
};

export const getSearchParamsFromCookie = () => {
    const jsonSearchParamsData = Cookies.get(QUERY_PARAMS_DATA);
    if (jsonSearchParamsData === undefined) return null;
    return JSON.parse(jsonSearchParamsData);
};