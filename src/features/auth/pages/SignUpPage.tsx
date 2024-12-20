import React, { useState } from 'react';
import { useAuthForm } from '../hooks/useAuthForm';
import { AuthForm } from '../components/AuthForm';
import { FormInput } from '../components/FormInput';
import { OfflineAlert } from '../components/OfflineAlert';
import { EmulatorAlert } from '../components/EmulatorAlert';

export function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const { loading, error, isOnline, handleSignUp, setError } = useAuthForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    await handleSignUp(formData.email, formData.password, formData.displayName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <AuthForm
        title="Create your account"
        error={error}
        loading={loading}
        isSignUp
        onSubmit={handleSubmit}
      >
        {!isOnline && <OfflineAlert />}
        <FormInput
          id="displayName"
          name="displayName"
          type="text"
          label="Full Name"
          value={formData.displayName}
          onChange={handleChange}
        />
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </AuthForm>
      <EmulatorAlert />
    </>
  );
}