import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Card } from 'react-native-elements';

export default function OpenAnswer({ idQuestion, question, estadoRespuesta, examId, nombreExamen, opcionesCorrectasSiIncorrecta, preguntaId, respuestaEstudiante, retroalimentacion }) {

    const [text, setText] = useState(respuestaEstudiante || '');

    const inputStyle = estadoRespuesta === 'Correcta' ? styles.correctInputControl : estadoRespuesta === 'Incorrecta' ? styles.incorrectInputControl : styles.inputControl;

    return (
        <Card
            containerStyle={styles.cardContainer}
        >
            <Card.Title>{question}</Card.Title>
            <Card.Divider />
            <TextInput
                placeholder='Escribe tu respuesta...    '
                placeholderTextColor='#6b7288'
                style={inputStyle}
                onChangeText={setText}
                value={text} // Asegúrate de que el valor del TextInput sea el estado del texto
            />
            {estadoRespuesta === 'Incorrecta' && <Text style={styles.feedbackText}>{`Respuesta Correcta: ${retroalimentacion}`}</Text>}
        </Card>
    );
}

// Tus estilos aquí...
const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 20, // Esto da los bordes redondeados al Card
        borderWidth: 0, // Esto elimina el borde del Card
        // Añade sombra para darle un aspecto elevado, si así lo deseas
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    inputControl: {
        borderWidth: 0, // Esto quita el borde del TextInput
        backgroundColor: '#E4EAF8',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10, // Bordes redondeados para el TextInput
        fontSize: 16,
        color: '#222',
        marginTop: 10,
    },
    correctInputControl: {
        borderWidth: 0, // Esto quita el borde del TextInput
        backgroundColor: '#B5DFBC',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10, // Bordes redondeados para el TextInput
        fontSize: 16,
        color: '#222',
        marginTop: 10,
    },
    incorrectInputControl: {
        borderWidth: 0, // Esto quita el borde del TextInput
        backgroundColor: '#FFD7D7',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10, // Bordes redondeados para el TextInput
        fontSize: 16,
        color: '#222',
        marginTop: 10,
    },
    feedbackText: {
        fontSize: 16,
        color: 'red',
        marginTop: 10,
    },
});