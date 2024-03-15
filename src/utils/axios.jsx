import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer   eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGZiOTNiNGZmOTZjNTdlNWRiNmI1MjdlYjJjY2IyYiIsInN1YiI6IjY1ZWU4MmQwNTk1YTU2MDBjYTNkMTg1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3FidytCtgUH4awgjzmbQYUlSOix8h5f6dP1BY40CXpk`,
  },
});

export default instance;
