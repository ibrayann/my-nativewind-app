import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { image185 } from "../api/moviedb";
import { fallbackPersonImage } from "../api/moviedb";

const Cast = ({ cast, navigation }) => {
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cast.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            className="mr-4 items-center"
            onPress={() => navigation.navigate("Person", item)}
          >
            <View className="rounded-full overflow-hidden w-20 h-20 items-center">
              <Image
                className="rounded-2xl h-24 w-20"
                source={{
                  uri: image185(item.profile_path) || fallbackPersonImage,
                }}
              />
            </View>
            <Text className="text-white text-sm mt-1">
              {item.character.length > 14
                ? item.character.slice(0, 14) + "..."
                : item.character}
            </Text>
            <Text className="text-neutral-400 text-xs">
              {item.original_name.length > 14
                ? item.original_name.slice(0, 14) + "..."
                : item.original_name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Cast;
