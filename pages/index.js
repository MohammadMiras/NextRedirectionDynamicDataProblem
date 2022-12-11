import { getFromCacheOrApi } from "Base"

export default function Home() {
  return <div>Home page</div>
}

export async function getServerSideProps(context) {
    
  const data = await getFromCacheOrApi("/v1/01925c4c-b71b-46f5-ba9a-522071071374")

    return {
        props: {
            ...data,
        },
    }
}
