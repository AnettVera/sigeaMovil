import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, Alert } from 'react-native';
import { Avatar } from '@rneui/themed';
import { Input, Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import AxiosClient from '../../../../../config/http-client/axios_client';


export default function TeachersSettings({ route }) {
    const navigation = useNavigation();
    const userData = route.params.user || {}; // esto es por que dentro de params se encuentra el objeto user y dentro de user se encuentra el objeto person // y entonces userData es igual a route.params.user que eso el el user
    const [username, setUsername] = useState(userData.username); // por eso aqui es userData.person para acceder a los datos de la persona
    const [name, setName] = useState(userData.person.name);
    const [secondName, setSecondName] = useState(userData.person.secondName); // segundo nombre
    const [lastname, setLastname] = useState(userData.person.lastname); // apellido paterno
    const [surname, setSurname] = useState(userData.person.surname); // apellido materno
    const [curp, setCurp] = useState(userData.person.curp);
    const [email, setEmail] = useState(userData.person.email);
    const [password, setPassword] = useState('');
    const [isEnabled, setIsEnabled] = useState(userData.status); // status es un entero y isEnabled es un booleano
    //contraseña validaciones
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorUsername, setErrorUsername] = useState("");
    const [errorFullName, setErrorFullName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorCURP, setErrorCURP] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    //puedes inicializar el estado del Switch (isEnabled) basado en este status. Por ejemplo, si status es 1, el Switch debe estar activado (true),
    // y si es diferente de 1, desactivado (false).



    const [fullname, setFullname] = useState(`${name}${secondName ? ' ' + secondName : ''}`);
    const [fulllastname, setFulllastname] = useState(`${lastname}${surname ? ' ' + surname : ''}`);


    const nameUpdate = fullname.split(' ')[0];
    const SecondNameUpdate = fullname.split(' ')[1];
    const surnameUpdate = fulllastname.split(' ')[1];
    const lastnameUpdate = fulllastname.split(' ')[0];


    //!! ME FALTA MANEJAR CUANDO EN LOS INPUT COMO METE SUS DOS NOMRES Y APELLIDOS Y SEPARARLOS

    useEffect(() => {
        if (userData) {
            navigation.setOptions({ title: `${name}` });
        }
    }, [userData]);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const updateTeacher = async () => {
        // Reiniciar mensajes de error
        setErrorUsername("");
        setErrorFullName("");
        setErrorLastName("");
        setErrorCURP("");
        setErrorEmail("");

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            Alert.alert('Contraseña incorrecta', 'Las contraseñas no coinciden');
            return;
        }

        let isValid = true;

        if (!username.trim()) {
            setErrorUsername("El nombre de usuario es obligatorio.");
            isValid = false;
        }

        if (!fullname.trim()) {
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
                id: userData.person.id_person,
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
            };

            const response = await AxiosClient.put(`api/person/teacher/${userData.id_user}`, payload);
            alert('Usuario actualizado correctamente');
            // Reiniciar mensajes de error
            setErrorUsername("");
            setErrorFullName("");
            setErrorLastName("");
            setErrorCURP("");
            setErrorEmail("");
            navigation.navigate('Teachers')
        } catch (error) {
            console.error("Error al actualizar el usuario: ", error);
            alert('Error al actualizar el usuario');
        }
    }


    const handleToggleSwitch = async () => {
        const newStatus = !isEnabled;

        try {
            // Realiza la llamada a la API para actualizar el estado
            const response = await AxiosClient.patch(`/api/user/${userData.id_user}`, {
                status: newStatus
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Si la operación es exitosa, actualiza isEnabled para reflejar el cambio real
            // Asumiendo que la operación fue exitosa y el estado se actualizó en el backend

            navigation.navigate('Teachers')
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
            // No necesitas revertir isEnabled aquí ya que lo actualizas solo después de la confirmación exitosa
        }
    };




    return (

        <ScrollView >
            <View style={styles.container}>
                <Avatar
                    size={80}
                    rounded
                    title={name[0]}
                    containerStyle={{ backgroundColor: "#052368", marginVertical: 20, borderColor: "#4480FF", borderWidth: 5 }}
                />

                <Switch
                    trackColor={{ false: '#4480FF', true: '#CCCCCC' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#6B82B8"
                    onValueChange={handleToggleSwitch}
                    value={isEnabled}
                />

                <Input
                    label='Nombre de usuario'
                    labelStyle={styles.label}
                    inputContainerStyle={styles.form}
                    inputStyle={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    errorMessage={errorUsername}
                    errorStyle={{ marginLeft: 29, fontSize: 12 }}
                />

                <Input
                    label='Nombres'
                    labelStyle={styles.label}
                    inputContainerStyle={styles.form}
                    inputStyle={styles.input}
                    value={fullname}
                    onChangeText={setFullname}
                    errorMessage={errorFullName}
                    errorStyle={{ marginLeft: 29, fontSize: 12 }}
                />

                <Input
                    label='Apellidos'
                    labelStyle={styles.label}
                    inputContainerStyle={styles.form}
                    inputStyle={styles.input}
                    value={fulllastname}
                    onChangeText={setFulllastname}
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
                    errorMessage={errorEmail}
                    errorStyle={{ marginLeft: 29, fontSize: 12 }}
                />

                <Input
                    label='Contraseña'
                    labelStyle={styles.label}
                    inputContainerStyle={styles.form}
                    inputStyle={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}

                />

                <Input
                    label='Confirmar contraseña'
                    labelStyle={styles.label}
                    inputContainerStyle={styles.form}
                    inputStyle={styles.input}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}


                />

                <Button
                    title="Actualizar"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnStyle}
                    onPress={updateTeacher}
                />
            </View>
        </ScrollView>
    );
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
        marginVertical: 20,
    },
    input: {
        paddingHorizontal: 6,
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
    switch: {

    },
    btnContainer: {
        width: "78%",
        borderRadius: 10,
    },
    btnStyle: {
        backgroundColor: "#052368",
    },
});
