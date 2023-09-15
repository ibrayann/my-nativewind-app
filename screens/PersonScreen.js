import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import React, { useEffect, useState } from "react";
import { styles, theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
  image500,
} from "../api/moviedb";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticalMargin = ios ? "" : "my-3";

const PersonScreen = () => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [movies, setMovies] = useState([]);
  const [personDetails, setPersonDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const { params: item } = useRoute();

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    console.log("personDetails: ", data);
    setPersonDetails(data);
    setLoading(false);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    console.log("MoviesDetails", data.cast);
    setMovies(data.cast);
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="bg-neutral-900 flex-1"
    >
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4" +
          verticalMargin
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
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center "
            style={{
              shadowColor: "gray",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 1,
              shadowRadius: 40,
            }}
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-400">
              <Image
                source={{
                  uri: image342(personDetails?.profile_path),
                }}
                style={{
                  width: width * 0.73,
                  height: height * 0.43,
                }}
              ></Image>
            </View>
          </View>
          <View className=" mt-6">
            <Text className="text-white text-3xl font-bold text-center">
              {personDetails?.name}
            </Text>
            <Text className="text-neutral-400 text-base ml-2 text-center">
              {personDetails?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 mt-3 p-4 flex-row justify-center items-center bg-neutral-700 rounded-full ">
            <View className=" border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className=" border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.birthday}
              </Text>
            </View>
            <View className=" border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Know for</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.known_for_department}
              </Text>
            </View>
            <View className=" px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails.popularity?.toFixed(2)}%
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography Overview</Text>
            <Text className="text-neutral-400 tracking-wide">
              {personDetails?.biography || "No biography found"}
            </Text>
          </View>
          <MovieList title="Movies" data={movies} hideViewAll={true} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
