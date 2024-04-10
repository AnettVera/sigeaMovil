import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, ScrollView, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import MultiAnswer from '../components/MultiAnswer';
import OpenAnswer from '../components/OpenAnswer';
import AxiosClient from '../../../../config/http-client/axios_client';
import { useAuth } from '../../../../config/context/AuthContext';
import { useNavigation } from '@react-navigation/native';


export default function Exam({ route }) {
  const { exam, user } = route.params;
  const [contentExam, setcontentExam] = useState([]); // Corrección aquí
  // creo un arreglo global para guardar las respuestas de las preguntas osea solo los ids vaya
  const { arrayData, setArrayData } = useAuth();
  const { arrayDataO, setArrayDataO } = useAuth();
  const navigation = useNavigation();
  const [errorMessages, setErrorMessages] = useState({});



  //!!! el echo de mandar el examne por props no es muy eficiente pues cuando haga un examen de ams de 10 preguntas
  //!!! ahra que la navegacion sea por props no es muy eficiente pues se va a tardar mucho en cargar

  // debo de investigar la logica para poder mandar todas mis preguntas y respuestas de golpe
  //por que si el usuario va a estar  cambiando estre sus preguntas y respuestas
  // no seria muy eficiente hacer una peticion por cada pregunta y respuesta osea por cada respuesta que de el usuario
  // entonces debo de investigar como hacerlo de golpe


  // aqui tambien debo de chear cuando se el type open answer y multiple answer
  // osea voy a tener que crear las dos logicas para los dos
  // el que estoy haciendo ahora es para multiple answer
  // entonces cuando ya tenga la logica de multiple answer
  // con un if podre mandarlo para la logica que debe de ser para guardarlo en la tabla de multiple answer o open answer


  // Esto es para las MULTIPLE_ANSWER
  const handleAnswerSelect = async (idQuestion, idAnswer, questionText) => {
    console.log(`Pregunta: ${questionText}, Pregunta ID: ${idQuestion}, Respuesta ID: ${idAnswer}`);
    const idQUestionAndIdAnswer = idQuestion + ',' + idAnswer + ',' + questionText;

    // Primero, verifica si la pregunta ya tiene una respuesta en el arreglo
    const existingAnswerIndex = arrayData.findIndex(item => item.split(',')[0] === idQuestion.toString());

    if (existingAnswerIndex !== -1) {
      // Si la pregunta ya tiene una respuesta, actualízala
      const newArrayData = [...arrayData];
      newArrayData[existingAnswerIndex] = idQUestionAndIdAnswer;
      setArrayData(newArrayData);
    } else {
      // Si la pregunta no tiene una respuesta, agrega la nueva respuesta
      setArrayData([...arrayData, idQUestionAndIdAnswer]);
    }
  };

  // Esto es para las OPEN_ANSWER
  const handleOpenAnswer = async (idQuestion, text, questionType) => {
    console.log(`Pregunta ID: ${idQuestion}, Respuesta: ${text}, Tipo de pregunta: ${questionType}`);

    // Primero, verifica si la pregunta ya tiene una respuesta
    const existingAnswerIndex = arrayDataO.findIndex(item => item.idQuestion === idQuestion);

    if (existingAnswerIndex !== -1) {
      // Si la pregunta ya tiene una respuesta, actualízala
      const newArrayDataO = [...arrayDataO];
      newArrayDataO[existingAnswerIndex].text = text;
      setArrayDataO(newArrayDataO);
    } else {
      // Si la pregunta no tiene una respuesta, agrega la nueva respuesta
      setArrayDataO([...arrayDataO, { idQuestion, text, questionType }]);
    }
  };


  const confirmSubmitExam = () => {
    Alert.alert(
      "Confirmar envío",
      "¿Estás seguro de que quieres enviar el examen?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "OK", onPress: () => handleSubmitExam() }
      ]
    );
  };


  const verifyAllQuestionsAnswered = () => {
    let newErrorMessages = { ...errorMessages }; // Copia el estado actual de los mensajes de error
    let allAnswered = true; // Asume que todas las preguntas han sido respondidas

    // Verificación para MULTIPLE_ANSWER
    contentExam.filter(q => q.questionType === 'MULTIPLE_ANSWER').forEach(question => {
      if (!arrayData.some(answer => answer.split(',')[0] === question.idQuestion.toString())) {
        newErrorMessages[question.idQuestion] = 'Debes seleccionar al menos una opción.';
        allAnswered = false;
      } else {
        delete newErrorMessages[question.idQuestion]; // Elimina el error si ya se respondió
      }
    });

    // Verificación para OPEN_ANSWER
    contentExam.filter(q => q.questionType === 'OPEN_ANSWER').forEach(question => {
      if (!arrayDataO.some(answer => answer.idQuestion === question.idQuestion && answer.text.trim() !== '')) {
        newErrorMessages[question.idQuestion] = 'Debes escribir una respuesta.';
        allAnswered = false;
      } else {
        delete newErrorMessages[question.idQuestion]; // Elimina el error si ya se respondió
      }
    });

    setErrorMessages(newErrorMessages); // Actualiza el estado de los mensajes de error
    return allAnswered;
  };


  const handleSubmitExam = async () => {
    console.log('****************Iniciando el enviar el examen****************');

    const allQuestionsAnswered = verifyAllQuestionsAnswered();
    if (!allQuestionsAnswered) return;

    for (let i = 0; i < arrayData.length; i++) {
      console.log(arrayData[i]);
      const objeto = arrayData[i].split(',');
      const idQuestion = objeto[0];
      const idAnswer = objeto[1];
      const questionText = objeto[2];
      const idQUestionAndIdAnswer = idQuestion + ',' + idAnswer;
      if (questionText === 'MULTIPLE_ANSWER') {
        try {
          const response = await AxiosClient.get(`api/exam/sendTablaQuestionsOptionsId/${idQUestionAndIdAnswer}`);
          console.log(response.data);
          console.log(response.data > 0);
          console.log('****************Insercion data****************');
          if (response.data > 0) {
            console.log('****************Insercion exitosa****************');
            // aqui deberai de haroa a hacer la otra queri para meter el id de mi user y el id de la questions_options para insertar eb multiple answer
            // el id del user ya lo tenog y cuando obtenga de la query anterior ya sera tambien el otro del id de la tabla questions_options
            const idUserIdQuestionOption = user + ',' + response.data;
            console.log(idUserIdQuestionOption);
            const response2 = await AxiosClient.post(`api/exam/insertMultiAnswer/${idUserIdQuestionOption}`);
            console.log(response2.data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }


    for (let i = 0; i < arrayDataO.length; i++) {
      console.log("*********OPensAnswersss**********");
      const objeto = arrayDataO[i];
      const idQuestion = objeto.idQuestion;
      const text = objeto.text;
      const questionType = objeto.questionType;
      console.log(idQuestion + ' ' + text + ' ' + questionType);
      if (questionType === 'OPEN_ANSWER') {
        try {
          const payload = {
            question: {
              id_question: idQuestion
            },
            user: {
              id_user: user
            },
            answer: text
          };
          const response2 = await AxiosClient.post(`api/exam/openAnswer`, payload);
          console.log(response2.data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
    // Esto hace que se limpie el input del codigo de acceso
    navigation.navigate('ExamsAccess', { resetInput: Date.now() });

  };



  useEffect(() => {
    setcontentExam(exam);
  }, [exam]);


  const parseOptions = (optionsString) => {
    if (optionsString) {
      return optionsString.split(', ').map(option => {
        const [id, text] = option.split(': ');
        return { id: Number(id), text: text };
      });
    } else {
      return [];
    }
  };

  const renderQuestion = (question) => {
    const options = parseOptions(question.options);
    const errorMessage = errorMessages[question.idQuestion];

    switch (question.questionType) {
      case 'OPEN_ANSWER':
        return (
          <OpenAnswer
            key={question.idQuestion}
            idQuestion={question.idQuestion}
            question={question.question}
            questionType={question.questionType}
            handleOpenAnswer={handleOpenAnswer}
            errorMessage={errorMessage}
          />
        );
      case 'MULTIPLE_ANSWER':
        return (
          <MultiAnswer
            key={question.idQuestion}
            question={question.question}
            options={options}
            idQuestion={question.idQuestion}
            questionType={question.questionType}
            onAnswerSelect={handleAnswerSelect}
            errorMessage={errorMessage} // Pasando el mensaje de error como prop
          />
        );
      default:
        return <Text key={question.idQuestion}>Tipo de pregunta no soportado</Text>;
    }
  };

  console.log(contentExam);

  return (
    <ScrollView style={styles.container}>

      <Card.Title>{exam[0].examName}</Card.Title>
      <Card.Divider />
      {
        contentExam.length > 0 // Verifica que contentExam no esté vacío
          ? contentExam.map(renderQuestion)
          : <Text>Cargando preguntas...</Text> // Puedes poner un spinner o algún indicador de carga aquí
      }
      <Button
        title="Enviar Examen"
        onPress={confirmSubmitExam} // Reemplaza handleSubmitExam con el nombre de tu función para manejar el envío
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0', // o el color de fondo que prefieras
    padding: 5,
  },
  buttonContainer: {
    margin: 20,
  },
  button: {
    backgroundColor: '#2089dc', // Color de fondo del botón
    marginBottom: 10,
    borderRadius: 20,
    // Agrega aquí más estilos para tu botón si es necesario
  },
  // Agrega aquí cualquier otro estilo que necesites
});
