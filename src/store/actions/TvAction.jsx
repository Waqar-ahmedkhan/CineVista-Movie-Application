export { removeTvDetails } from "../reducers/tvSlice";
import axios from "../../utils/axios";
import { TvDetails } from "../reducers/tvSlice";

export const asyncCloudDetail = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const recommendation = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const video = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);

    let ultimateDetails = {
      detail: detail.data,
      externalId: externalId.data,
      recommendation: recommendation.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      similar: similar.data.results,
      video: video.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
    };
    dispatch(TvDetails(ultimateDetails));
    console.log(ultimateDetails);
  } catch (error) {
    console.log(error);
  }
};
