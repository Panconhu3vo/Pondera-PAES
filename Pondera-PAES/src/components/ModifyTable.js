import { View, StyleSheet } from "react-native";
import SquareTable from "./TablaPonderaciones/SquareTable";
import Input from "./Input";
import ButtonRed from "./ButtonRed";
import { use, useState } from "react";

export default function ModifyTable({ puntajes, setPuntajes }) {
    const [puntajesInputs, setPuntajesInputs] = useState({
        NEM: "",
        Ranking: "",
        Matematicas1: "",
        Lectora: "",
        Historia: "",
        Ciencias: "",
        Matematicas2: "",
    });
    const handleInputChange = (fieldName, value) => {
        setPuntajesInputs({
            ...puntajesInputs, // Mantenemos los otros valores del estado
            [fieldName]: value === "" ? null : parseInt(value), // Actualizamos solo el valor del campo que cambió
        });
    };
    const handleSave = () => {
        // Aquí puedes hacer algo con los datos de puntajesInputs
        // Por ejemplo, pasarlos al componente padre para que se guarden
        setPuntajes(puntajesInputs);
        console.log("Datos guardados:", puntajesInputs);
    };
    return (
        <View style={{ gap: 8, alignItems: "center" }}>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"NEM"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input
                    valueInput={puntajesInputs.NEM}
                    onChangeTextInput={(value) =>
                        handleInputChange("NEM", value)
                    }
                />
            </View>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"Ranking"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input
                    valueInput={puntajesInputs.Ranking}
                    onChangeTextInput={(value) =>
                        handleInputChange("Ranking", value)
                    }
                />
            </View>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"Competencia Matemáticas 1"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input
                    valueInput={puntajesInputs.Matematicas1}
                    onChangeTextInput={(value) =>
                        handleInputChange("Matematicas1", value)
                    }
                />
            </View>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"Competencia Lectora"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input
                    valueInput={puntajesInputs.Lectora}
                    onChangeTextInput={(value) =>
                        handleInputChange("Lectora", value)
                    }
                />
            </View>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"Historia y Ciencias Sociales"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input
                    valueInput={puntajesInputs.Historia}
                    onChangeTextInput={(value) =>
                        handleInputChange("Historia", value)
                    }
                />
            </View>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"Ciencias"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input
                    valueInput={puntajesInputs.Ciencias}
                    onChangeTextInput={(value) =>
                        handleInputChange("Ciencias", value)
                    }
                />
            </View>
            <View style={styles.fila}>
                <SquareTable
                    textSquare={"Competencia Matemáticas 2"}
                    rotate={false}
                    litleSquare={false}
                />
                <Input
                    valueInput={puntajesInputs.Matematicas2}
                    onChangeTextInput={(value) =>
                        handleInputChange("Matematicas2", value)
                    }
                />
            </View>
            <ButtonRed textButton={"Guardar"} buttonFunction={handleSave} />
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
