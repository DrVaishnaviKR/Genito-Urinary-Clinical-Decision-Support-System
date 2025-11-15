import React, { useState } from 'react';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !age || !gender) {
      setError('All fields are required.');
      return;
    }
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
        setError('Please enter a valid age.');
        return;
    }
    setError('');
    onLogin({ name: name.trim(), age: ageNum, gender });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-800">
            GU Clinical Decision Support
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter patient details to begin a new session.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Patient Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-blue-50"
                placeholder="Patient Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="age" className="sr-only">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-blue-50"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="flex items-center justify-around">
                 <label className="inline-flex items-center">
                    <input type="radio" className="form-radio h-5 w-5 text-blue-600" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
                    <span className="ml-2 text-gray-700">Male</span>
                </label>
                <label className="inline-flex items-center">
                    <input type="radio" className="form-radio h-5 w-5 text-pink-600" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
                    <span className="ml-2 text-gray-700">Female</span>
                </label>
              </div>
            </div>
          </div>
          
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start Session
            </button>
          </div>
        </form>
         <p className="text-center text-xs text-gray-400 pt-4">This is an AI-powered tool for informational purposes only. Always consult a healthcare professional.</p>
      </div>
    </div>
  );
};

export default LoginPage;