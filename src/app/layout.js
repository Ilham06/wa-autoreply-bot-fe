import './globals.css';
import MainLayout from '@/components/layouts/MainLayout';
import StoreProvider from '@/components/providers/StoreProvider';

export const metadata = {
  title: 'WA Auto Reply Dashboard',
  description: 'WhatsApp Bot Dashboard'
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <StoreProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
