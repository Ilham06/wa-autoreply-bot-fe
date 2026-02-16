'use client';

import { useState } from 'react';
import QRCard from '@/components/page/whatsapp/QRCard';
import WAStatus from '@/components/page/whatsapp/WAStatus';
import WAActions from '@/components/page/whatsapp/WAAction';
import {
  useConnectWaMutation,
  useGetQrQuery,
  useLogoutWaMutation,
  useResetWaMutation
} from '@/lib/wa-api';

function getErrorMessage(error) {
  return error?.data?.message || error?.data?.error || 'Terjadi kesalahan saat request ke server';
}

export default function WhatsAppPage() {
  const [actionError, setActionError] = useState('');

  const {
    data: qrPayload,
    isFetching: isLoadingQr,
    isError: isQrError,
    error: qrError,
    refetch
  } = useGetQrQuery(undefined, {
    pollingInterval: 10000,
    refetchOnFocus: true
  });

  const [connectWa, { isLoading: isConnecting }] = useConnectWaMutation();
  const [logoutWa, { isLoading: isLoggingOut }] = useLogoutWaMutation();
  const [resetWa, { isLoading: isResetting }] = useResetWaMutation();

  const qrCode = qrPayload?.qrCode || '';
  const waStatus = qrPayload?.status || 'disconnected';

  const isSubmitting = isConnecting || isLoggingOut || isResetting;

  const handleConnect = async () => {
    setActionError('');
    try {
      await connectWa().unwrap();
      await refetch();
    } catch (error) {
      setActionError(getErrorMessage(error));
    }
  };

  const handleLogout = async () => {
    setActionError('');
    try {
      await logoutWa().unwrap();
      await refetch();
    } catch (error) {
      setActionError(getErrorMessage(error));
    }
  };

  const handleReset = async () => {
    setActionError('');
    try {
      await resetWa().unwrap();
      await refetch();
    } catch (error) {
      setActionError(getErrorMessage(error));
    }
  };

  const queryErrorMessage = isQrError ? getErrorMessage(qrError) : '';

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        <WAStatus status={waStatus} />
        <QRCard status={waStatus} qrCode={qrCode} isLoading={isLoadingQr} />
        <WAActions
          status={waStatus}
          isSubmitting={isSubmitting}
          onConnect={handleConnect}
          onLogout={handleLogout}
          onReset={handleReset}
        />
        {(queryErrorMessage || actionError) && (
          <p className="text-sm text-center text-rose-600">
            {actionError || queryErrorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
