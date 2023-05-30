'use client';

import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

import { Nav, Page } from '@/components/Nav';
import { RemarkList } from '@/components/RemarkList';
import { Auth } from '@/components/Auth';
import { CreateRemark } from '@/components/CreateRemark';

import styles from './page.module.css';

// Helpers
const filterDateForPage = new Map<Page, Date>([
  [Page.Recent, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)], // 1 week ago
  [Page.Hot, new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)], // 1 day ago
  // all other pages return undefined, which means no date filter
]);

// Component
export default function Main() {
  // State
  const [selectedPage, setSelectedPage] = useState<Page>(Page.Home);

  // Handlers
  const handleHomeClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setSelectedPage(Page.Home);
  };

  const handleRecentClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setSelectedPage(Page.Recent);
  };

  const handleHotClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setSelectedPage(Page.Hot);
  };

  const handleCreateClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const auth = getAuth();
    if (!auth.currentUser) return;

    setSelectedPage(Page.Create);
  };

  const handleAuthClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const auth = getAuth();
    if (auth.currentUser) {
      signOut(auth);
      setSelectedPage(Page.Home);
      return;
    }

    setSelectedPage(Page.Auth);
  };

  const handleSuccess = () => {
    setSelectedPage(Page.Home);
  }

  // Calculated Props
  const inRemarksMode = selectedPage === Page.Home
                     || selectedPage === Page.Recent
                     || selectedPage === Page.Hot;
  const inAuthMode    = selectedPage === Page.Auth;
  const inCreateMode  = selectedPage === Page.Create;

  return (
    <>
      <Nav
        selectedPage={selectedPage}
        onHomeClick={handleHomeClick}
        onRecentClick={handleRecentClick}
        onHotClick={handleHotClick}
        onCreateClick={handleCreateClick}
        onAuthClick={handleAuthClick}
      />
      <main className={styles.main}>
        {inRemarksMode && <RemarkList startDate={filterDateForPage.get(selectedPage)} />}
        {inAuthMode    && <Auth onSuccess={handleSuccess}/>}
        {inCreateMode  && <CreateRemark onSuccess={handleSuccess}/>}
      </main>
    </>
  );
}
