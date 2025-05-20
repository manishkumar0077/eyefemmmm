import { ReactNode } from 'react';
import GynecologyNavbar from './GynecologyNavbar';
import Footer from './Footer';
import PageTransition from './PageTransition';
import WhatsAppChat from './WhatsAppChat';

interface GynecologyLayoutProps {
  children: ReactNode;
}

const GynecologyLayout = ({ children }: GynecologyLayoutProps) => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <GynecologyNavbar />
        <main className="flex-grow pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
        
        {/* WhatsApp Chat Widget - will only show on gynecology pages */}
        <WhatsAppChat className="fixed bottom-4 right-4 z-50" />
      </div>
    </PageTransition>
  );
};

export default GynecologyLayout;
