import { useEffect, useState } from "react";
import DashboardRoutes from "./routes/DashboardRoutes";
import { config } from '@fortawesome/fontawesome-svg-core'
import { CustomProvider } from "rsuite";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CustomProvider theme="light">
        <DashboardRoutes />
      </CustomProvider>
    </AuthProvider>
  );
}

export default App;
