import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import ListaExam from "./ListaExam";
import AxiosClient from "../../../../config/http-client/axios_client";
import { useAuth } from '../../../../config/context/AuthContext';

export default function ExamHistory(props) {
  const { navigation } = props;
  const { userData } = useAuth();
  const [arrayExams, setArrayExams] = useState([]);

  const { user: { id_user } } = userData;

  const foudExamForStudent = async () => {
    try {
      const response = await AxiosClient.get(`api/exam/foundExamForStudent/${id_user}`);
      const exams = response.data.map((exam, index) => ({
        id: index,
        Examid: exam.idExam,
        nameExam: exam.examName,
        nameSub: exam.subjectName,
        date: exam.limitDate,
        unit: exam.unitName,
        score: exam.average || 'SC',
        action: () =>
          navigation.navigate("Results", { title: exam.examName, id_exam: exam.idExam, id_user: id_user }),
      }));
      setArrayExams(exams);
    } catch (error) {
      console.log(error);
    }
  }

  // Usar useFocusEffect para recargar los datos cada vez que la pantalla gane foco
  useFocusEffect(
    useCallback(() => {
      foudExamForStudent();
    }, [id_user])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={arrayExams}
        renderItem={({ item }) => (
          <ListaExam
            nameExam={item.nameExam}
            nameSub={item.nameSub}
            date={item.date}
            unit={item.unit}
            score={item.score}
            action={item.action}
            idExam={item.Examid}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingVertical: 16,
  },
});
