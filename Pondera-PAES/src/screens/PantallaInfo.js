import { View, Text, StyleSheet, Platform, SafeAreaView } from "react-native";
import Header from "../components/Header";
import CareerDescription from "../components/CareerDescription";

export default function PantallaInfo() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F5FCFF" }}>
            <View style={styles.container}>
                <Header textTitle={"Información"} />
                <CareerDescription
                    NameCareer={"Derecho"}
                    NameUniversity={"Universidad San Sebastian"}
                    Description={
                        "La evolución constante de la actividad humana, la complejidad de los procesos sociales, culturales y económicos, y el desarrollo permanente de nuestro país, nos plantean como desafío la formación de abogados con un alto nivel de respuesta frente a las problemáticas actuales. En la Universidad San Sebastián estamos comprometidos con prepararte para estos desafíos, con las respuestas técnicas y humanas necesarias para hacer de nuestra sociedad un mundo más justo, y para desempeñarte innovadoramente frente a estas exigencias que el sistema demanda"
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        alignItems: "center",
        paddingVertical: Platform.OS === "android" && 35,
        backgroundColor: "#F5FCFF",
    },
});
