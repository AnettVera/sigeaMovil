import { StyleSheet, ScrollView, FlatList, View, SafeAreaView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { ListItem, SearchBar, Icon } from '@rneui/themed';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ListStudents from './components/ListStudents';
import AxiosClient from '../../../../../config/http-client/axios_client';

export default function Students() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const goToStudentSettings = (user) => {
    navigation.navigate('StudentSettings', { user });
  };


  const fetchData = async () => {

    setLoading(true);
    try {
      const response = await AxiosClient.get('api/user/allStudents');
      setUsers(response.data);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      // Este retorno se llama cuando el componente pierde el foco, aquí no necesitamos hacer nada
      return () => { };
    }, [])
  );


  // !!! AQUI TENGO QUE VALDIAR TOABIEN QUE SI NO TIENE ALGUNO DE SUS APELLIDOS NO SE MUESTRE O NOMBRES VACIOS
  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.cont}
        inputContainerStyle={styles.contInput}
        lightTheme={true}
        placeholder="Buscar estudiante por nombre"
      />
      <SafeAreaView style={styles.contList}>
        <FlatList
          data={users}
          renderItem={({ item }) =>
            <ListStudents
              name={item.person.name}
              lastname={item.person.lastname}
              surname={item.person.surname ? item.person.surname : ''}
              username={item.username}
              curp={item.person.curp}
              onPress={() => goToStudentSettings(item)}
            />
          }
          keyExtractor={item => item.id_user.toString()}
        />
      </SafeAreaView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: "#fff",
  },
  cont: {
    backgroundColor: '#fff',
  },
  contInput: {
    backgroundColor: '#f9f9f9'
  },
  contList: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});