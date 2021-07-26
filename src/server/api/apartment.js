import Axios from "axios";

const subRoute = "apartments/";

export const fetchApartmentsFromDB = async (
  queries = {},
  apartmentIds = []
) => {
  try {
    const res = await Axios.get(process.env.REACT_APP_ROOT_URL + subRoute, {
      params: {
        ...queries,
        skipCounter: apartmentIds.length,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response.status === 422) throw new Error(err.response.data);
    throw new Error("Unable to signup. Please try again");
  }
};

export const publishApartmentOnDB = async (token, properties = {}) => {
  try {
    const res = await Axios.post(
      process.env.REACT_APP_ROOT_URL + subRoute + "publish",
      properties,
      {
        header: {
          Authorization: "Bearer " + token,
        },
        params: { token },
      }
    );

    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const uploadApartmentFilesOnDB = async (token, apartmentId, fd) => {
  try {
    const res = await Axios.post(
      process.env.REACT_APP_ROOT_URL + subRoute + "publish/upload-files",
      fd,
      {
        params: {
          token,
          apartmentId,
        },
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
