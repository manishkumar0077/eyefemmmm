import { ReactNode } from 'react';
import EyeCareNavbar from './EyeCareNavbar';
import Footer from './Footer';
import PageTransition from './PageTransition';
import WhatsAppChat from './WhatsAppChat';

interface EyeCareLayoutProps {
  children: ReactNode;
}

const EyeCareLayout = ({ children }: EyeCareLayoutProps) => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <EyeCareNavbar />
        <main className="flex-grow pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
        
        {/* WhatsApp Chat Widget - will only show on eye care pages */}
        <WhatsAppChat className="fixed bottom-4 right-4 z-50" />
      </div>
    </PageTransition>
  );
};

export default EyeCareLayout;
