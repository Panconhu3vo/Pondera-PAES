import { View, StyleSheet } from "react-native";
import SquareTable from "./TablaPonderaciones/SquareTable";
import Input from "./Input";
import ButtonRed from "./ButtonRed";
export default function ModifyTable() {
    return (
        <View style={{ gap: 8, alignItems: "center" }}>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"NEM"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input valueInput={null} onChangeTextInput={null} />
            </View>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"Ranking"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input valueInput={null} onChangeTextInput={null} />
            </View>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"Competencia Matemáticas 1"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input valueInput={null} onChangeTextInput={null} />
            </View>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"Comptencia Lectora"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input valueInput={null} onChangeTextInput={null} />
            </View>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"Historia y Ciencias Sociales"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input valueInput={null} onChangeTextInput={null} />
            </View>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"Ciencais"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input valueInput={null} onChangeTextInput={null} />
            </View>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"Comptencia Matemáticas 2"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input valueInput={null} onChangeTextInput={null} />
            </View>
            <ButtonRed textButton={"Guardar"} buttonFunction={null} />
        </View>
    );
}
const styles = StyleSheet.create({
    fila: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
    },
});
