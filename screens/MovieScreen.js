import {
  View,
  Text,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { fallbackMoviePoster, image500 } from "../api/moviedb";
import {
  fetchMovieDetails,
  fetchSimilarMovies,
  fetchMovieCredits,
} from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const marginTop = ios ? "" : "mt-3";
const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    setMovieDetails(data);
    setLoading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    setCast(data.cast);
    setLoading(false);
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    setSimilarMovies(data.results);
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="bg-neutral-900 flex-1"
    >
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4" +
            marginTop
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl p-1"
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <HeartIcon
              size={28}
              strokeWidth={2.5}
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              style={{
                width,
                height: height * 0.55,
              }}
              source={{
                uri: image500(movieDetails?.poster_path || fallbackMoviePoster),
              }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{
                width,
                height: height * 0.4,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-3xl text-center font-bold tracking-wider">
          {movieDetails.title}
        </Text>
        {movieDetails?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movieDetails?.status} • {movieDetails?.release_date?.slice(0, 4)} •{" "}
            {movieDetails?.runtime} min
          </Text>
        ) : null}
        <View className="flex-row justify-center  space-x-2 mx-4">
          {movieDetails?.genres?.map((genre, index) => {
            let showDot = index + 1 != movieDetails?.genres?.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre.name} {showDot && "•"}
              </Text>
            );
          })}
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movieDetails?.overview}
        </Text>
      </View>
      {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}
      {similarMovies.length > 0 && (
        <MovieList
          title="Similar Movies"
          hideViewAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
};

export default MovieScreen;
