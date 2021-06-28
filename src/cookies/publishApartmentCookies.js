import Cookies from 'js-cookie';

const PUBLISH_APARTMENT_DATA = "publish-apartment-data";

export const savePublishApartmentOnCookie = (PublishApartmentData) => {
    const jsonPublishApartmentDataData = JSON.stringify(PublishApartmentData);
    Cookies.set(PUBLISH_APARTMENT_DATA, jsonPublishApartmentDataData, { expires: 1/24, sameSite: "strict" });
    if (!Cookies.get(PUBLISH_APARTMENT_DATA))
        console.log('publish apartment data size is too large to be contained in a cookie')
};

export const deletePublishApartmentFromCookie = () => {
    Cookies.remove(PUBLISH_APARTMENT_DATA, { sameSite: "strict" });
};

export const getPublishApartmentFromCookie = () => {
    const jsonPublishApartmentDataDataData = Cookies.get(PUBLISH_APARTMENT_DATA);
    if (jsonPublishApartmentDataDataData === undefined) return null;
    return JSON.parse(jsonPublishApartmentDataDataData);
};