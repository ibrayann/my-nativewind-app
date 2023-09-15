import axios from "axios";
import { bearerToken } from "../constants";

const baseURL = "https://api.themoviedb.org/3";
const trendingMoviesEndPoint = `${baseURL}/trending/movie/day`;
const UpcomingMoviesEndPoint = `${baseURL}/movie/upcoming`;
const TopRatedMoviesEndPoint = `${baseURL}/movie/top_rated`;
const SearchMoviesEndPoint = `${baseURL}/search/movie`;

const movieDetailsEndPoint = (id) => `${baseURL}/movie/${id}`;
const movieCreditsEndPoint = (id) => `${baseURL}/movie/${id}/credits`;
const similarMoviesEndPoint = (id) => `${baseURL}/movie/${id}/similar`;

const personDetailsEndPoint = (id) => `${baseURL}/person/${id}`;
const personMoviesEndPoint = (id) => `${baseURL}/person/${id}/credits`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

const config = {
  method: "GET",

  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  },
};

const apiCall = async (url, params) => {
  try {
    const { data } = await axios.request({
      url,
      params,
      ...config,
    });
    return data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(UpcomingMoviesEndPoint);
};
export const fetchTopRatedMovies = async () => {
  return apiCall(TopRatedMoviesEndPoint);
};

export const fetchMovieDetails = async (id) => {
  return apiCall(movieDetailsEndPoint(id));
};

export const fetchMovieCredits = async (id) => {
  return apiCall(movieCreditsEndPoint(id));
};

export const fetchSimilarMovies = async (id) => {
  return apiCall(similarMoviesEndPoint(id));
};
export const fetchPersonDetails = async (id) => {
  return apiCall(personDetailsEndPoint(id));
};
export const fetchPersonMovies = async (id) => {
  return apiCall(personMoviesEndPoint(id));
};
export const fetchSearchMovies = async (params) => {
  return apiCall(SearchMoviesEndPoint, params);
};
