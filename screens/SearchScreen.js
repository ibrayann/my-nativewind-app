import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../components/Loading";
import {
  fallbackMoviePoster,
  fetchSearchMovies,
  image185,
} from "../api/moviedb";
import { debounce } from "lodash";

const { width, height } = Dimensions.get("window");

const SearchScreen = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const movieTitle = "Ant-Man and the Wasp: Quantumania";

  const handleSearch = (text) => {
    if (text.length > 2 && text) {
      setLoading(true);
      fetchSearchMovies({
        query: text,
        include_adult: true,
        languaje: "en-US",
        page: 1,
      }).then((data) => {
        setResults(data.results);
        setLoading(false);
      });
    } else {
      console.log("text: ", text);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className=" mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full p-1">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search"
          placeholderTextColor="gray"
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className=" rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className=" text-white font-semibold ml-1">
            Results ({results.length})
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {results.map((result, index) => (
              <TouchableOpacity
                onPress={() => navigation.push("Movie", result)}
                key={index}
              >
                <View className=" space-y-2 mb-4">
                  <Image
                    className="rounded-3xl"
                    source={{
                      uri: image185(result.poster_path || fallbackMoviePoster),
                    }}
                    style={{
                      width: width * 0.44,
                      height: height * 0.3,
                    }}
                  />
                  <Text className="text-white font-semibold text-sm mt-1">
                    {result.title.length > 20
                      ? result.title.slice(0, 20) + "..."
                      : result.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center items-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="w-96 h-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
