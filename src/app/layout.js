import './globals.css';
import MainLayout from '@/components/layouts/MainLayout';

export const metadata = {
  title: 'WA Auto Reply Dashboard',
  description: 'WhatsApp Bot Dashboard'
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
