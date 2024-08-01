// App.tsx
import React from "react";
import { AuthProvider } from "./app/context/AuthContext";
import Navigation from "./app/navigation/Navigation";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
