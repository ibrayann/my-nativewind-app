import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import Carousel from "react-native-snap-carousel";

var { width, height } = Dimensions.get("window");
const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 my-5">Trending Movies</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} key={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{
          display: "flex",
          alignItems: "center",
        }}
      />
    </View>
  );
};

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={require(`../assets/images/moviePoster1.png`)}
        style={{
          width: width * 0.6,
          height: height * 0.4,
          borderRadius: 20,
        }}
      />
    </TouchableWithoutFeedback>
  );
};

export default TrendingMovies;
