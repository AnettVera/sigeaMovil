import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, CheckBox } from '@rneui/themed';

export default function MultiAnswer({ question, options, idQuestion, estadoRespuesta, opcionesCorrectasSiIncorrecta, respuestaEstudiante }) {

    const [selectedIndexes, setSelectedIndexes] = useState([]);

    const handleCheck = (option) => {
        const index = options.indexOf(option);
        if (index !== -1) {
            setSelectedIndexes([...selectedIndexes, index]);
        }
    }


    useEffect(() => {
        if (estadoRespuesta === 'Incorrecta') {
            handleCheck(respuestaEstudiante);
        }else if(estadoRespuesta === 'Correcta'){
            handleCheck(respuestaEstudiante);
        }
    }, []);

    const isIncorrect = estadoRespuesta === 'Incorrecta';

    return (
        <Card containerStyle={styles.cardContainer}>
            <Card.Title>{question}</Card.Title>
            <Card.Divider />
            {options.map((option, index) => (
                <CheckBox
                    key={index}
                    title={option}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    containerStyle={
                        isIncorrect && selectedIndexes.includes(index) ? styles.incorrectCheckboxContainer :
                            estadoRespuesta === 'Correcta' && selectedIndexes.includes(index) ? styles.correctCheckboxContainer :
                                styles.checkboxContainer
                    }
                    textStyle={styles.checkboxText}
                />
            ))}
            {isIncorrect && (
                <View style={styles.correctAnswerContainer}>
                    <Text style={styles.correctAnswerText}>Respuesta correcta: {opcionesCorrectasSiIncorrecta}</Text>
                </View>
            )}
        </Card>
    );
}

// ... styles ...

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 20,
        borderWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        margin: 0,
        marginBottom: 5,
        padding: 0,
    },
    incorrectCheckboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        margin: 0,
        marginBottom: 5,
        padding: 0,
        backgroundColor: '#FFD7D7',
        borderRadius: 10,
    },
    checkboxText: {
        fontSize: 16,
    },
    correctAnswerContainer: {
        padding: 10,
    },
    correctAnswerText: {
        color: 'green',

    },
    correctCheckboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        margin: 0,
        marginBottom: 5,
        padding: 0,
        borderRadius: 10,
        backgroundColor: '#B5DFBC',
    },
});