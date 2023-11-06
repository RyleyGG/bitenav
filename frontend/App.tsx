import React from 'react';
import { AuthProvider } from './AuthContext';
import Root from './Root';

const App = () => {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
};

export default App;