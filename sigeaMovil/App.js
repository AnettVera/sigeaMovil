
import { AuthProvider, useAuth } from "./src/config/context/AuthContext"; // Asegúrate de ajustar la ruta
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/modules/login/adapters/screens/Login";
import NavigationStudent from "./src/config/navigation/NavigationStudent";
import MainNavigation from "./src/config/navigation/Navigation";
import React, { useState } from 'react';
import AxiosClient from "./src/config/http-client/axios_client";


// Componente Principal que Decide qué Mostrar basado en el Estado de Autenticación
const MainApp = () => {
  const { userData } = useAuth();

  if (userData === null) {
    return <Login />;
  }


  switch (userData.roles[0].type) {
    case "STUDENT":
      return <NavigationStudent />;
    case "ADMIN":
      return <MainNavigation />;
    default:
      return <Login />;
  }
};

// Aplicación Envuelta en AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainApp />
      </NavigationContainer>
    </AuthProvider>
  );
}
