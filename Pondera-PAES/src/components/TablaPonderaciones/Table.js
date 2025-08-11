import { View, StyleSheet } from "react-native";
import SquareTable from "./SquareTable";
import SquareTotal from "./SquareTotal";
import { useContext } from "react";
import { PonderacionContext } from "../../context/PonderacionContext";

export default function Table({ puntajes }) {
    const { ponderaciones } = useContext(PonderacionContext);

    if (!ponderaciones) {
        // Opcionalmente, puedes devolver una vista con un mensaje
        // para guiar al usuario. Por ahora, solo devolvemos null para que no se muestre nada.
        return null;
    }
    const ponderado = {
        NEM: (parseFloat(ponderaciones.NEM) / 100) * puntajes.NEM,
        Ranking: (parseFloat(ponderaciones.RANKING) / 100) * puntajes.Ranking,
        Matematicas1:
            (parseFloat(ponderaciones.COMPETENCIA_MATEMÁTICA_1_M1) / 100) *
            puntajes.Matematicas1,
        Lectora:
            (parseFloat(ponderaciones.COMPETENCIA_LECTORA_C_LECT) / 100) *
            puntajes.Lectora,
        Historia:
            (parseFloat(ponderaciones.HISTORIA_Y_CIENCIAS_SOCIALES) / 100) *
            puntajes.Historia,
        Ciencias:
            (parseFloat(ponderaciones.CIENCIAS) / 100) * puntajes.Ciencias,
        Matematicas2:
            (parseFloat(ponderaciones.COMPETENCIA_MATEMÁTICA_2_M2) / 100) *
            puntajes.Matematicas2,
    };
    const totalPonderado = Object.values(ponderado)
        .reduce((sum, current) => sum + current, 0)
        .toFixed(2);
    return (
        <View style={{ alignItems: "center" }}>
            <View
                style={{
                    gap: 2,
                    marginVertical: 15,
                    width: 261,
                    marginBottom: 10,
                }}>
                <View style={[tabla.fila, { justifyContent: "flex-end" }]}>
                    <SquareTable
                        textSquare={"Ponderación"}
                        rotate={true}
                        litleSquare={false}
                    />
                    <SquareTable
                        textSquare={"Tu Puntaje"}
                        rotate={true}
                        litleSquare={false}
                    />
                    <SquareTable
                        textSquare={"Puntaje Ponderado"}
                        rotate={true}
                        litleSquare={false}
                    />
                </View>
                <View style={tabla.fila}>
                    <SquareTable
                        textSquare={"NEM"}
                        rotate={false}
                        litleSquare={false}
                    />
                    <SquareTable
                        textSquare={ponderaciones.NEM + "%"}
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={puntajes.NEM}
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={ponderado.NEM.toFixed(2)}
                        rotate={false}
                        litleSquare={true}
                    />
                </View>
                <View style={tabla.fila}>
                    <SquareTable
                        textSquare={"Ranking"}
                        rotate={false}
                        litleSquare={false}
                    />
                    <SquareTable
                        textSquare={ponderaciones.RANKING + "%"}
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={puntajes.Ranking}
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={ponderado.Ranking.toFixed(2)}
                        rotate={false}
                        litleSquare={true}
                    />
                </View>
                <View style={tabla.fila}>
                    <SquareTable
                        textSquare={"Competencia Matemáticas 1"}
                        rotate={false}
                        litleSquare={false}
                    />
                    <SquareTable
                        textSquare={
                            ponderaciones.COMPETENCIA_MATEMÁTICA_1_M1 + "%"
                        }
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={puntajes.Matematicas1}
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={ponderado.Matematicas1.toFixed(2)}
                        rotate={false}
                        litleSquare={true}
                    />
                </View>
                <View style={tabla.fila}>
                    <SquareTable
                        textSquare={"Comptencia Lectora"}
                        rotate={false}
                        litleSquare={false}
                    />
                    <SquareTable
                        textSquare={
                            ponderaciones.COMPETENCIA_LECTORA_C_LECT + "%"
                        }
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={puntajes.Lectora}
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={ponderado.Lectora.toFixed(2)}
                        rotate={false}
                        litleSquare={true}
                    />
                </View>
                <View style={tabla.fila}>
                    <SquareTable
                        textSquare={"Historia y Ciencias Sociales"}
                        rotate={false}
                        litleSquare={false}
                    />
                    <SquareTable
                        textSquare={
                            ponderaciones.HISTORIA_Y_CIENCIAS_SOCIALES + "%"
                        }
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={puntajes.Historia}
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={ponderado.Historia.toFixed(2)}
                        rotate={false}
                        litleSquare={true}
                    />
                </View>
                <View style={tabla.fila}>
                    <SquareTable
                        textSquare={"Ciencais"}
                        rotate={false}
                        litleSquare={false}
                    />
                    <SquareTable
                        textSquare={ponderaciones.CIENCIAS + "%"}
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={puntajes.Ciencias}
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={ponderado.Ciencias.toFixed(2)}
                        rotate={false}
                        litleSquare={true}
                    />
                </View>
                <View style={tabla.fila}>
                    <SquareTable
                        textSquare={"Comptencia Matemáticas 2"}
                        rotate={false}
                        litleSquare={false}
                    />
                    <SquareTable
                        textSquare={
                            ponderaciones.COMPETENCIA_MATEMÁTICA_2_M2 + "%"
                        }
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={puntajes.Matematicas2}
                        rotate={false}
                        litleSquare={true}
                    />
                    <SquareTable
                        textSquare={ponderado.Matematicas2.toFixed(2)}
                        rotate={false}
                        litleSquare={true}
                    />
                </View>
                <View style={tabla.fila}>
                    <SquareTable
                        textSquare={"Total Puntaje"}
                        rotate={false}
                        litleSquare={false}
                    />
                    <SquareTotal textSquare={totalPonderado} />
                </View>
            </View>
        </View>
    );
}

const tabla = StyleSheet.create({
    fila: {
        flexDirection: "row",
        gap: 2,
    },
});
