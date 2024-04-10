import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Alert } from "react-native";

export default function ListaExam(props) {
  const { nameExam, nameSub, date, unit, score, action, idExam } = props;


  const handlePress = () => {
    if (score !== 'SC') {
      action();
    }
    else {
      Alert.alert('Examen no disponible', 'El examen aún no ha sido calificado');

    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.cardContent}>
        <Text style={styles.examName}>{nameExam}</Text>
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={styles.text}>{nameSub}</Text>
            <Text style={styles.text}>{date}</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.text}>{unit}</Text>
            <Text style={styles.text}>{score}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    elevation: 2,
    borderColor: "#4480FF",
    borderWidth: 3,
    shadowColor: "#red",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.3,
  },
  cardContent: {
    alignItems: "center",
    margin: 8,
  },
  examName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#052368"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  leftColumn: {
    alignItems: "flex-start",
  },
  rightColumn: {
    alignItems: "flex-end",
  },
  text: {
    fontSize: 16,
    color: "#000000",
    fontStyle: "normal",
    fontWeight: "500",
  },
});