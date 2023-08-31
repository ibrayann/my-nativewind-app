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

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const marginTop = ios ? "" : "mt-3";
const MovieScreen = () => {
  let movieName = "Ant-Man and the Wasp: Quantumania";
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ]);
  useEffect(() => {}, [item]);

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
        <View>
          <Image
            style={{
              width,
              height: height * 0.55,
            }}
            source={require(`../assets/images/moviePoster2.png`)}
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
      </View>
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-3xl text-center font-bold tracking-wider">
          {movieName}
        </Text>
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released • 2020 • 170 min
        </Text>
        <View className="flex-row justify-center  space-x-2 mx-4">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy •
          </Text>
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatum, quibusdam, quia, quod voluptate voluptatem quos
          exercitationem quas voluptatibus quibusdam, quia, quod voluptate
          voluptatem quos exercitationem quas voluptatibus quod voluptate
          voluptatem quos exercitationem quas voluptatibus quibusdam, quia, quod
          voluptate voluptatem quos exercitationem quas voluptatibus
        </Text>
      </View>
      <Cast cast={cast} navigation={navigation} />
      <MovieList
        title="Similar Movies"
        hideViewAll={true}
        data={[1, 2, 3, 4, 5]}
      />
    </ScrollView>
  );
};

export default MovieScreen;
