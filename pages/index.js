import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getFromCacheOrApi } from "Base"

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>     
    </div>
  )
}

export async function getServerSideProps(context) {
    
  const data = await getFromCacheOrApi("/v1/01925c4c-b71b-46f5-ba9a-522071071374")

    return {
        props: {
            ...data,
        },
    }
}