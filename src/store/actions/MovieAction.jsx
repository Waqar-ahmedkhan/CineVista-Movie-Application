export { removedetails } from "../reducers/movieSlice";
import axios from "../../utils/axios";
import { moviedetails } from "../reducers/movieSlice";

export const asyncCloudDetail = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalId = await axios.get(`/movie/${id}/external_ids`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const recommendation = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const video = await axios.get(`/movie/${id}/videos`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);

    let ultimateDetails = {
      detail: detail.data,
      externalId: externalId.data,
      recommendation: recommendation.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      similar: similar.data.results,
      video: video.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
    };
    dispatch(moviedetails(ultimateDetails));
    console.log(ultimateDetails);
  } catch (error) {
    console.log(error);
  }
};
