import Main from "../../../components/each-profile/Main"
import * as queries from '../../../src/graphql/queries'
import { API,withSSRContext } from "aws-amplify";
import { useRouter } from 'next/router'
import services from "../../../utils/services";
function ViewPhotography({posts}){
  const data = posts
    return(
 <>
    <Main data={data} service={services.photography}/>
 </>
    )
}

export async function getStaticProps({params}) {
  console.log(params); 

    const res =  await API.graphql({
      query: queries.getPhotography,
      variables: { id: params.slug },
      authMode: 'API_KEY',
      
    });
    const posts = await res?.data?.getPhotography
  console.log(posts)
    return {
      props: {
        posts,
      },
      revalidate: 10, // In seconds
    }
  }

export async function getStaticPaths() {
  const SSR = withSSRContext();
  let filter = {
    status: { eq: "Accepted" } 
};
  const res = await SSR.API.graphql({
    query: queries.listPhotographies,
    authMode: 'API_KEY',
    variables: { filter: filter}
  });

    const photographer = await res?.data?.listPhotographies?.items
    console.log(photographer)
    const paths = photographer.map((e) => ({
      params: { slug: e.id },
    }))

    return { paths, fallback: 'blocking' }
  }

export default ViewPhotography