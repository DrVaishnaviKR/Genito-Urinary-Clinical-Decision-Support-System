
import React, { useState } from 'react';
import { User } from './types';
import LoginPage from './components/LoginPage';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="font-sans">
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <ChatInterface user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
