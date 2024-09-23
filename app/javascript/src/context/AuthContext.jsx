import React, { createContext, useEffect, useState } from 'react';
import AuthService from '../services/auth.service';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (!user) return;
    console.log('gravatar');


    AuthService.getGravatar(user.email)
      .then(response => setAvatar(URL.createObjectURL(response.data)))
      .catch(console.log);
  }, [user]);

  const handleSignIn = async (email, password) => {
    const session = {
      email: email,
      password: password,
    };
    const response = await AuthService.signIn({ session: session });
    setUser(response.data.user);
  };

  const handleSignUp = async (name, email, password) => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    await AuthService.signUp({ user: user });
    handleSignIn(email, password);
  };

  const handleSignOut = () => {
    AuthService.signOut()
      .then(() => setUser(null))
      .catch(console.log);
  };

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleSignUp,
        handleSignOut,
        user,
        avatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthProvider;
