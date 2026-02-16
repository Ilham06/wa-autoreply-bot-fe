import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
const WA_BASE_URL = `${API_BASE_URL}/api/wa`;

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method = 'GET', data, params, responseType }) => {
    try {
      const result = await axios({
        url: `${baseUrl}${url}`,
        method,
        data,
        params,
        responseType
      });

      return {
        data: result.data,
        meta: {
          status: result.status,
          headers: result.headers
        }
      };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError?.response?.status,
          data:
            axiosError?.response?.data || {
              message: axiosError.message || 'Request gagal'
            }
        }
      };
    }
  };

function decodeArrayBuffer(input) {
  if (input instanceof ArrayBuffer) {
    return new TextDecoder().decode(input);
  }

  if (ArrayBuffer.isView(input)) {
    return new TextDecoder().decode(input);
  }

  if (typeof input === 'string') {
    return input;
  }

  return '';
}

function toBase64FromBuffer(buffer) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';

  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

function normalizeQrResponse(result) {
  const contentType = result?.headers?.['content-type'] || '';
  const lowerType = contentType.toLowerCase();

  if (lowerType.includes('image/')) {
    const qrCode = `data:${contentType};base64,${toBase64FromBuffer(result.data)}`;
    return {
      status: 'waiting',
      qrCode
    };
  }

  const message = decodeArrayBuffer(result.data);
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('already connected')) {
    return {
      status: 'connected',
      qrCode: '',
      message
    };
  }

  if (lowerMessage.includes('qr not available')) {
    return {
      status: 'connected',
      qrCode: '',
      message
    };
  }

  return {
    status: 'disconnected',
    qrCode: '',
    message
  };
}

export const waApi = createApi({
  reducerPath: 'waApi',
  baseQuery: axiosBaseQuery({
    baseUrl: WA_BASE_URL
  }),
  tagTypes: ['WA'],
  endpoints: builder => ({
    getQr: builder.query({
      async queryFn() {
        try {
          const result = await axios({
            url: `${WA_BASE_URL}/qr`,
            method: 'GET',
            responseType: 'arraybuffer'
          });

          return { data: normalizeQrResponse(result) };
        } catch (axiosError) {
          return {
            error: {
              status: axiosError?.response?.status,
              data: {
                message: axiosError?.message || 'Gagal mengambil QR'
              }
            }
          };
        }
      },
      providesTags: ['WA']
    }),
    connectWa: builder.mutation({
      query: () => ({
        url: '/connect',
        method: 'POST'
      }),
      invalidatesTags: ['WA']
    }),
    logoutWa: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST'
      }),
      invalidatesTags: ['WA']
    }),
    resetWa: builder.mutation({
      query: () => ({
        url: '/reset',
        method: 'POST'
      }),
      invalidatesTags: ['WA']
    })
  })
});

export const {
  useGetQrQuery,
  useConnectWaMutation,
  useLogoutWaMutation,
  useResetWaMutation
} = waApi;
