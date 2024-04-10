import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from '@rneui/themed';
import { Icon } from 'react-native-elements';
import { Button, Input } from '@rneui/base';
import { useAuth } from '../../../../../config/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosClient from '../../../../../config/http-client/axios_client';
import { ScrollView } from 'react-native-gesture-handler';


export default function Settings() {
  const [editMode, setEditMode] = useState(false);
  //Para mostrar un mensaje de error en caso de que haya un error en la actualización
  const [errorUsername, setErrorUsername] = useState("");
  const [errorFullName, setErrorFullName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorCURP, setErrorCURP] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  /////////////////////////////////////////////////////

  //Para la logica de mostar los datos del usuario y poder actualizarlos
  const { userData } = useAuth();
  const navigation = useNavigation();
  const { userType, onLoginSuccess } = useAuth();
  const [name, setName] = useState(userData.user.person.name);
  const [secondName, setSecondName] = useState(userData.user.person.secondName);
  const [lastname, setLastname] = useState(userData.user.person.lastname);
  const [surname, setSurname] = useState(userData.user.person.surname);
  const [curp, setCurp] = useState(userData.user.person.curp);
  const [email, setEmail] = useState(userData.user.person.email);
  const [password, setPassword] = useState('');
  //contraseña validaciones
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const [fulllastname, setFullLastname] = useState(surname ? `${lastname} ${surname}` : lastname); //Apellido paterno y materno // surname es el apellido materno y lastname es el apellido paterno
  const [username, setUsername] = useState(userData.user.username);
  const [fullName, setFullName] = useState(secondName ? `${name} ${secondName}` : name); //Nombre completo

  const nameUpdate = fullName.split(' ')[0];
  const SecondNameUpdate = fullName.split(' ')[1];
  const surnameUpdate = fulllastname.split(' ')[1];
  const lastnameUpdate = fulllastname.split(' ')[0];
  ////////////////////////////////////////////////////




  // Función para manejar el cambio entre modos
  const toggleEditMode = () => {
    // Reiniciar mensajes de error
    setErrorUsername("");
    setErrorFullName("");
    setErrorLastName("");
    setErrorCURP("");
    setErrorEmail("");
    setIsTouched(!isTouched);
    setEditMode(!editMode);
  };

  // primero entra aqui
  const handleUpdate = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Contraseña incorrecta', 'Las contraseñas no coinciden');
      return;
    }
    // Reiniciar mensajes de error
    setErrorUsername("");
    setErrorFullName("");
    setErrorLastName("");
    setErrorCURP("");
    setErrorEmail("");

    let isValid = true;

    if (!username.trim()) {
      setErrorUsername("El nombre de usuario es obligatorio.");
      isValid = false;
    }

    if (!fullName.trim()) {
      setErrorFullName("El nombre es obligatorio.");
      isValid = false;
    }

    if (!fulllastname.trim()) {
      setErrorLastName("Los apellidos son obligatorios.");
      isValid = false;
    }

    if (curp.length !== 18) {
      setErrorCURP("El CURP debe tener exactamente 18 caracteres.");
      isValid = false;
    }

    if (!email.includes('@')) {
      setErrorEmail("El correo electrónico debe contener un '@'.");
      isValid = false;
    }

    if (!isValid) return; // Detener la ejecución si hay errores


    try {
      const payload = {
        id: userData.user.person.id_person,
        name: nameUpdate,
        secondName: SecondNameUpdate,
        lastname: lastnameUpdate,
        surname: surnameUpdate,
        email: email,
        curp: curp,
        user: {
          username: username,
          password: password,
        },
      }

      const response = await AxiosClient.put(`api/person/admin/${1}`, payload)
      alert('actualizado correctamente');
      // Reiniciar mensajes de error
      setErrorUsername("");
      setErrorFullName("");
      setErrorLastName("");
      setErrorCURP("");
      setErrorEmail("");
      toggleEditMode();
    } catch (error) {
      alert('Error al actualizar el usuario');

    }
  };


  const handleLogout = async () => {
    await AsyncStorage.removeItem('session'); // Eliminar la sesión almacenada
    onLoginSuccess(null)
  };


  return (

    <View style={styles.container}>
      <Avatar
        size="large"
        rounded
        title={name[0]}
        containerStyle={{ backgroundColor: "#052368", marginVertical: 15, borderColor: "#4480FF", borderWidth: 5 }}
      >
        <Avatar.Accessory
          size={24}
          name="edit"
          type="pen-to-square"
          color={isTouched ? '#f5dd4b' : '#f4f3f4'}
          onPress={() => {
            toggleEditMode();
            setIsConfirmPasswordVisible(true);
          }}
        />
      </Avatar>

      <Text style={styles.name}>Admin</Text>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Input
          label='Nombre de usuario'
          labelStyle={styles.label}
          inputContainerStyle={styles.form}
          inputStyle={styles.input}
          value={username}
          onChangeText={setUsername}
          editable={editMode}
          errorMessage={errorUsername}
          errorStyle={{ marginLeft: 29, fontSize: 12 }}

        />

        <Input
          label='Nombre'
          labelStyle={styles.label}
          inputContainerStyle={styles.form}
          inputStyle={styles.input}
          value={fullName}
          onChangeText={setFullName}
          editable={editMode}
          errorMessage={errorFullName}
          errorStyle={{ marginLeft: 29, fontSize: 12 }}


        />

        <Input
          label='Apellidos'
          labelStyle={styles.label}
          inputContainerStyle={styles.form}
          inputStyle={styles.input}
          value={fulllastname}
          onChangeText={setFullLastname}
          editable={editMode}
          errorMessage={errorLastName}
          errorStyle={{ marginLeft: 29, fontSize: 12 }}
        />

        <Input
          label='CURP'
          labelStyle={styles.label}
          inputContainerStyle={styles.form}
          inputStyle={styles.input}
          value={curp}
          onChangeText={setCurp}
          editable={editMode}
          errorMessage={errorCURP}
          errorStyle={{ marginLeft: 29, fontSize: 12 }}
        />

        <Input
          label='Email'
          labelStyle={styles.label}
          inputContainerStyle={styles.form}
          inputStyle={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={editMode}
          errorMessage={errorEmail}
          errorStyle={{ marginLeft: 29, fontSize: 12 }}
        />


        <Input
          label='Contraseña'
          labelStyle={styles.label}
          inputContainerStyle={styles.form}
          inputStyle={styles.input}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          editable={editMode}
        />
        {editMode ? (
          <>
            {isConfirmPasswordVisible && (
              <Input
                label='Confirmar contraseña'
                labelStyle={styles.label}
                inputContainerStyle={styles.form}
                inputStyle={styles.input}
                value={confirmPassword}
                secureTextEntry
                onChangeText={setConfirmPassword}

                editable={editMode}
              />
            )}

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Actualizar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    paddingHorizontal: 6,
    justifyContent: 'center',
  },
  label: {
    color: '#6B82B8',
    fontSize: 18,
    marginStart: 30,
    fontWeight: 'bold',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginStart: 30,
  },
  button: {
    backgroundColor: '#4480FF', // Color de fondo del botón
    padding: 10, // Espaciado interno del botón
    borderRadius: 20, // Hace que los bordes del botón sean más redondos
    alignItems: 'center', // Centra el texto del botón
    justifyContent: 'center', // Asegura que el contenido esté centrado verticalmente
    margin: 10, // Margen exterior para separarlo de otros elementos
  },
  buttonText: {
    color: '#FFFFFF', // Color del texto
    fontSize: 16, // Tamaño del texto
  },
  scrollView: {
    width: '100%', // O ajusta según sea necesario
  },
  scrollContent: {
    alignItems: 'center', // Centra los elementos en el eje cruzado
  },

})
