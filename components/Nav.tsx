'use client';

import { useSigninCheck } from 'reactfire';

import HouseSVG from '@/components/svg/HouseSVG';
import ClockSVG from '@/components/svg/ClockSVG';
import FireSVG from '@/components/svg/FireSVG';
import PlusSVG from '@/components/svg/PlusSVG';
import UserSolidSVG from '@/components/svg/UserSolidSVG';
import UserRegularSVG from '@/components/svg/UserRegularSVG';

import styles from './Nav.module.css';

// Helpers
const selectedColour = 'rgb(var(--dark-rgb))';
const unselectedColour = 'rgb(var(--primary-rgb))';

// Component
export enum Page {
  Home,
  Recent,
  Hot,
  Create,
  Auth,
}
export interface NavProps {
  selectedPage?: Page;
  onHomeClick?: React.MouseEventHandler<HTMLButtonElement>;
  onRecentClick?: React.MouseEventHandler<HTMLButtonElement>;
  onHotClick?: React.MouseEventHandler<HTMLButtonElement>;
  onCreateClick?: React.MouseEventHandler<HTMLButtonElement>;
  onAuthClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export const Nav = ({
  selectedPage,
  onHomeClick,
  onRecentClick,
  onHotClick,
  onCreateClick,
  onAuthClick,
}: NavProps) => {
  // Context
  const { data: signInCheckResult } = useSigninCheck();

  // Helpers
  const getFillColour = (page: Page) => page === selectedPage ? selectedColour : unselectedColour;

  return (
    <>
      <nav className={styles.nav}>
        <div>
          <button className={styles.button} onClick={onHomeClick}>
            <HouseSVG
              height={24}
              width={24}
              alt="house"
              fill={getFillColour(Page.Home)}
            />
          </button>
          <button className={styles.button} onClick={onRecentClick}>
            <ClockSVG
              height={24}
              width={24}
              alt="clock"
              fill={getFillColour(Page.Recent)}
            />
          </button>
          <button className={styles.button} onClick={onHotClick}>
            <FireSVG
              height={24}
              width={24}
              alt="fire"
              fill={getFillColour(Page.Hot)}
            />
          </button>
        </div>
        <div>
          {signInCheckResult?.signedIn && (
            <button className={styles.button} onClick={onCreateClick}>
              <PlusSVG
                height={24}
                width={24}
                alt="plus"
                fill={getFillColour(Page.Create)}
              />
            </button>
          )}
          <button className={styles.button} onClick={onAuthClick}>
            {signInCheckResult?.signedIn ? (
              <UserSolidSVG
                height={24}
                width={24}
                alt="user"
                fill={getFillColour(Page.Auth)}
              />
            ) : (
              <UserRegularSVG
                height={24}
                width={24}
                alt="no user"
                fill={getFillColour(Page.Auth)}
              />
            )}
          </button>
        </div>
      </nav>
      <div className={styles.after} />
    </>
  )
}
