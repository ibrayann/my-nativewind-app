import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../theme";

const { width, height } = Dimensions.get("window");
const MovieList = ({ title, data, hideViewAll }) => {
  const navigation = useNavigation();

  let movieName = "Ant-Man and the Wasp: Quantumania";
  return (
    <View className=" mb-8 space-y-4">
      <View className=" mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideViewAll && (
          <TouchableOpacity>
            <Text style={styles.text}>View All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 10 }}
      >
        {data.map((item) => (
          <TouchableWithoutFeedback
            key={item}
            onPress={() => navigation.push("Movie", item)}
          >
            <View>
              <Image
                source={require(`../assets/images/moviePoster2.png`)}
                style={{
                  width: width * 0.33,
                  height: height * 0.22,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              />
              <Text className="text-neutral-300">
                {movieName.length > 14
                  ? movieName.slice(0, 14) + "..."
                  : movieName}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
