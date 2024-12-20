import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAuthForm } from '../hooks/useAuthForm';
import { AuthForm } from '../components/AuthForm';
import { FormInput } from '../components/FormInput';
import { AuthMessage } from '../components/AuthMessage';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, handleSignIn } = useAuthForm();
  const { user } = useAuth();
  const location = useLocation();

  // If already logged in, redirect to intended destination or home
  if (user) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignIn(email, password);
  };

  return (
    <>
      <AuthMessage />
      <AuthForm
        title="Sign in to your account"
        error={error}
        loading={loading}
        onSubmit={handleSubmit}
      >
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </AuthForm>
    </>
  );
}