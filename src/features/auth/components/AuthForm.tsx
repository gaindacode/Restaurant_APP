import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../../components/common/Logo';

interface AuthFormProps {
  title: string;
  error: string | null;
  loading: boolean;
  isSignUp?: boolean;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export function AuthForm({ 
  title, 
  error, 
  loading, 
  isSignUp, 
  onSubmit, 
  children 
}: AuthFormProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {children}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
              >
                {loading 
                  ? (isSignUp ? 'Creating account...' : 'Signing in...') 
                  : (isSignUp ? 'Create account' : 'Sign in')}
              </button>
            </div>

            <div className="text-sm text-center">
              {isSignUp ? (
                <Link to="/login" className="font-medium text-yellow-600 hover:text-yellow-500">
                  Already have an account? Sign in
                </Link>
              ) : (
                <Link to="/signup" className="font-medium text-yellow-600 hover:text-yellow-500">
                  Don't have an account? Sign up
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}