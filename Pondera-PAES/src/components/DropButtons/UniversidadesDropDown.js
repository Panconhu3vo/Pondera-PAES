import { View, StyleSheet } from "react-native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import color from "../../constants/Colores";

export default function UniversidadesDropDown({ value, setValue }) {
    const [open, setOpen] = useState(false);

    const [items, setItems] = useState([
        {
            label: "PONTIFICIA UNIVERSIDAD CATÓLICA DE CHILE",
            value: "PUC",
        },
        {
            label: "PONTIFICIA UNIVERSIDAD CATÓLICA DE VALPARAÍSO",
            value: "PUCV",
        },
        {
            label: "UNIVERSIDAD ACADEMIA DE HUMANISMO CRISTIANO",
            value: "UAHC",
        },
        {
            label: "UNIVERSIDAD ADOLFO IBÁÑEZ",
            value: "UAI",
        },
        {
            label: "UNIVERSIDAD ADVENTISTA DE CHILE",
            value: "UNACH",
        },
        {
            label: "UNIVERSIDAD ALBERTO HURTADO",
            value: "UAH",
        },
        {
            label: "UNIVERSIDAD ANDRÉS BELLO",
            value: "UNAB",
        },
        {
            label: "UNIVERSIDAD ARTURO PRAT",
            value: "UNAP",
        },
        {
            label: "UNIVERSIDAD AUSTRAL DE CHILE",
            value: "UACH",
        },
        {
            label: "UNIVERSIDAD AUTÓNOMA DE CHILE",
            value: "UAUTÓNOMA",
        },
        {
            label: "UNIVERSIDAD BERNARDO O’HIGGINS",
            value: "UBO",
        },
        {
            label: "UNIVERSIDAD CATÓLICA DE LA SANTÍSIMA CONCEPCIÓN",
            value: "UCSC",
        },
        {
            label: "UNIVERSIDAD CATÓLICA DE TEMUCO",
            value: "UCT",
        },
        {
            label: "UNIVERSIDAD CATÓLICA DEL MAULE",
            value: "UCM",
        },
        {
            label: "UNIVERSIDAD CATÓLICA DEL NORTE",
            value: "UCN",
        },
        {
            label: "UNIVERSIDAD CATÓLICA SILVA HENRÍQUEZ",
            value: "UCSH",
        },
        {
            label: "UNIVERSIDAD CENTRAL DE CHILE",
            value: "UCEN",
        },
        {
            label: "UNIVERSIDAD DE ANTOFAGASTA",
            value: "UA",
        },
        {
            label: "UNIVERSIDAD DE ATACAMA",
            value: "UDA",
        },
        {
            label: "UNIVERSIDAD DE AYSÉN",
            value: "UAYSÉN",
        },
        {
            label: "UNIVERSIDAD DE CHILE",
            value: "UCH",
        },
        {
            label: "UNIVERSIDAD DE CONCEPCIÓN",
            value: "UDEC",
        },
        {
            label: "UNIVERSIDAD DE LA FRONTERA",
            value: "UFRO",
        },
        {
            label: "UNIVERSIDAD DE LA SERENA",
            value: "ULS",
        },
        {
            label: "UNIVERSIDAD DE LAS AMÉRICAS",
            value: "UDLA",
        },
        {
            label: "UNIVERSIDAD DE LOS ANDES",
            value: "UANDES",
        },
        {
            label: "UNIVERSIDAD DE LOS LAGOS",
            value: "ULAGOS",
        },
        {
            label: "UNIVERSIDAD DE MAGALLANES",
            value: "UMAG",
        },
        {
            label: "UNIVERSIDAD DE O’HIGGINS",
            value: "UOH",
        },
        {
            label: "UNIVERSIDAD DE PLAYA ANCHA",
            value: "UPLA",
        },
        {
            label: "UNIVERSIDAD DE SANTIAGO DE CHILE",
            value: "USACH",
        },
        {
            label: "UNIVERSIDAD DE TALCA",
            value: "UTALCA",
        },
        {
            label: "UNIVERSIDAD DE TARAPACÁ",
            value: "UTA",
        },
        {
            label: "UNIVERSIDAD DE VALPARAÍSO",
            value: "UV",
        },
        {
            label: "UNIVERSIDAD DEL BÍO-BÍO",
            value: "UBB",
        },
        {
            label: "UNIVERSIDAD DEL DESARROLLO",
            value: "UDD",
        },
        {
            label: "UNIVERSIDAD DIEGO PORTALES",
            value: "UDP",
        },
        {
            label: "UNIVERSIDAD FINIS TERRAE",
            value: "UFT",
        },
        {
            label: "UNIVERSIDAD GABRIELA MISTRAL",
            value: "UGM",
        },
        {
            label: "UNIVERSIDAD MAYOR",
            value: "UMAYOR",
        },
        {
            label: "UNIVERSIDAD METROPOLITANA DE CS. DE LA EDUCACIÓN",
            value: "UMCE",
        },
        {
            label: "UNIVERSIDAD SAN SEBASTIÁN",
            value: "USS",
        },
        {
            label: "UNIVERSIDAD SANTO TOMÁS",
            value: "UST",
        },
        {
            label: "UNIVERSIDAD TÉCNICA FEDERICO SANTA MARÍA",
            value: "USM",
        },
        {
            label: "UNIVERSIDAD TECNOLÓGICA METROPOLITANA",
            value: "UTEM",
        },
    ]);

    return (
        <View style={styles.container}>
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
                placeholder="Selecciona una universidad"
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
        zIndex: 1,
    },
    dropdownContainer: {
        height: 60,
        width: "90%",
    },
    dropdownOpenContainer: {
        backgroundColor: color.fondo,
        borderColor: color.primario,
    },
    dropdownText: {
        fontFamily: "Raleway-Bold",
        fontSize: 18,
        color: color.primario,
    },
});
