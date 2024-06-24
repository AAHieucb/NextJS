'use client'; // phiên bản next 13 thì thêm cái này vào fix lỗi Client Component

// # Style
// Next cũng hỗ trợ sẵn styled-components

import Link from 'next/link'
import CustomImage from './components/CustomImage';
import styles from './page.module.css'
import { Tab, TabBody, TabContainer, TabHead } from './StyleComponent';

export default function Home() {

  return (
    <main className={styles.main}>
      <TabContainer>
        <TabHead>
          <Tab>
            <Link href={{ pathname: "/" }}>
              Tab 1
            </Link>
          </Tab>
          <Tab>
            <Link href={{ pathname: "/" }}>
              Tab 2
            </Link>
          </Tab>
        </TabHead>
        <TabBody />
      </TabContainer>
      
      <CustomImage/>
    </main>
  )
}
