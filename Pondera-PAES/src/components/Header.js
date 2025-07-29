import { View, StyleSheet } from "react-native";
import Title from "./Titles";
import Line from "./Line";

export default function Header({ textTitle }) {
    return (
        <View>
            <Title textTitle={textTitle} />
            <Line></Line>
        </View>
    );
}
