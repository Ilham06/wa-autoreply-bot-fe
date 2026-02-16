'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { setAuthSession } from '@/lib/auth-storage';
import { useLoginMutation, useRegisterMutation } from '@/lib/wa-api';

function getErrorMessage(error) {
  return (
    error?.data?.message ||
    error?.data?.error ||
    'Gagal memproses autentikasi'
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const isSubmitting = isLoginLoading || isRegisterLoading;

  const handleChange = key => event => {
    setForm(prev => ({
      ...prev,
      [key]: event.target.value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const payload =
        mode === 'login'
          ? await login({
              email: form.email,
              password: form.password
            }).unwrap()
          : await register({
              name: form.name,
              email: form.email,
              password: form.password
            }).unwrap();

      if (!payload?.token) {
        throw new Error('Token tidak ditemukan di response.');
      }

      setAuthSession({
        token: payload.token,
        user: payload.user
      });
      router.replace('/');
    } catch (error) {
      setErrorMessage(error.message || getErrorMessage(error));
    }
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">🔐 Login Dashboard</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="space-y-2">
              <Label>Nama</Label>
              <Input
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Nama user"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="user@mail.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              placeholder="secret"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-rose-600">{errorMessage}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? 'Memproses...'
              : mode === 'login'
                ? 'Masuk'
                : 'Daftar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
