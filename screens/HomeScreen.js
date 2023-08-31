import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useState } from "react";

const ios = Platform.OS === "ios";
const HomeScreen = () => {
  const [trending, setTrending] = useState([1, 2, 3, 4]);

  return (
    <View className=" flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "-mb-1" : "mb-2"}>
        <StatusBar style="light" />
      </SafeAreaView>
      <View className="flex-row justify-between items-center mx-4">
        <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
        <Text className="text-3xl font-bold text-white">
          <Text style={styles.text}>M</Text>ovie
        </Text>
        <TouchableOpacity>
          <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <TrendingMovies data={trending} />

        <MovieList title="Upcoming" data={trending} />

        <MovieList title="Top Rated" data={trending} />
      </ScrollView>
    </View>
  );
};
export default HomeScreen;
