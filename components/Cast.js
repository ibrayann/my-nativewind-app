import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";

const Cast = ({ cast, navigation }) => {
  let personName = "Kanu Reeves";
  let characterName = "John Wick";
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cast.map((item, index) => (
          <TouchableOpacity
            key={item}
            className="mr-4 items-center"
            onPress={() => navigation.navigate("Person")}
          >
            <View className="rounded-full overflow-hidden w-20 h-20 items-center">
              <Image
                className="rounded-2xl h-24 w-20"
                source={require("../assets/images/castImage1.png")}
              />
            </View>
            <Text className="text-white text-sm mt-1">
              {characterName.length > 14
                ? characterName.slice(0, 14) + "..."
                : characterName}
            </Text>
            <Text className="text-neutral-400 text-xs">
              {personName.length > 14
                ? personName.slice(0, 14) + "..."
                : personName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Cast;
