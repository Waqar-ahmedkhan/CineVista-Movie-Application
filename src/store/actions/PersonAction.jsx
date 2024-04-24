import axios from "../../utils/axios";
import { peopleDetails } from "../reducers/peopleSlice";
export { removePeople } from "../reducers/peopleSlice";

export const asyncCloudDetail = (id) => async (dispatch) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalId = await axios.get(`/person/${id}/external_ids`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);

    const ultimateDetails = {
      detail: detail.data,
      externalId: externalId.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
      combinedCredits: combinedCredits.data,
    };

    dispatch(peopleDetails(ultimateDetails));
    console.log("Person details fetched:", ultimateDetails);
  } catch (error) {
    console.error("Error fetching person details:", error);
    // Handle error (e.g., dispatch an action to update error state in Redux)
  }
};
