import { View, StyleSheet, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import color from "../../constants/Colores";
import Ponderaciones from "../../../data/Ponderaciones.json";
import { useEffect, useState, useContext } from "react";
import { PonderacionContext } from "../../context/PonderacionContext";

export default function CarrerasDropDown({
    value,
    setValue,
    university = null,
}) {
    useEffect(() => {
        if (Ponderaciones) {
            console.log("Ponderaciones cargadas");
        } else {
            console.log("Ponderaciones no cargadas");
        }
    }, []);
    const [items, setItems] = useState([]);
    const { setPonderaciones } = useContext(PonderacionContext);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Solo ejecuta la lógica si se ha seleccionado una universidad
        if (university) {
            console.log(`Buscando carreras para la universidad: ${university}`);

            // Busca la universidad en el JSON usando las siglas
            const universidad = Ponderaciones.find(
                (uni) => uni.UNIVERSIDAD.siglas === university
            );

            // Si se encuentra la universidad, procesa las carreras
            if (universidad) {
                const carreras = universidad.UNIVERSIDAD.carreras;

                // Mapea las carreras al formato { label, value }
                const carrerasFormatoDropdown = carreras.map((carrera) => ({
                    label:
                        carrera.CARRERA_O_PROGRAMA_ACADÉMICO +
                        ", SEDE: " +
                        carrera.LUGAR_EN_QUE_SE_IMPARTE,
                    value: carrera.COD,
                }));

                // Actualiza el estado de los ítems del dropdown
                setItems([...carrerasFormatoDropdown]);
            } else {
                console.log("No se encontró la universidad en el JSON.");
                setItems([]); // Limpia el dropdown si no se encuentra la universidad
            }
        } else {
            // Si no hay una universidad seleccionada, limpia el dropdown
            setItems([]);
        }
    }, [university]);

    useEffect(() => {
        if (value && university) {
            const universidad = Ponderaciones.find(
                (uni) => uni.UNIVERSIDAD.siglas === university
            );
            if (universidad) {
                const carreraSeleccionada =
                    universidad.UNIVERSIDAD.carreras.find(
                        (carrera) => carrera.COD === value
                    );
                if (carreraSeleccionada) {
                    setPonderaciones(carreraSeleccionada);
                    console.log(carreraSeleccionada);
                }
            }
        } else {
            setPonderaciones(null); // Limpia los datos si no hay carrera seleccionada
        }
    }, [value, university]);

    return (
        <View>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                dropDownContainerStyle={styles.dropdownOpenContainer}
                textStyle={styles.dropdownText}
                placeholder="Selecciona una carrera"
                disabled={university === null ? true : false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "left",
    },
    dropdown: {
        backgroundColor: color.fondo,
        borderColor: color.primario,
        borderWidth: 5,
        borderRadius: 10,
        zIndex: 0,
    },
    dropdownContainer: {
        height: 70,
        width: "90%",
    },
    dropdownOpenContainer: {
        backgroundColor: color.fondo,
        borderColor: color.primario,
    },
    dropdownText: {
        fontFamily: "Raleway-Bold",
        fontSize: 16,
        color: color.primario,
    },
});
