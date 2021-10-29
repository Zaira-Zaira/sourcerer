import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  createHttpLink,
  gql
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';




const DATA = gql`
  query user{
    viewer{
      name, 
      bio, 
      company, 
      following{
        totalCount
      },
      followers{
        totalCount
      },
      updatedAt,
      repositories(first: 2){
        totalCount, 
        edges{
          node{
            resourcePath,
            description,
            updatedAt,
            name,
            owner{
              login
            },
            collaborators{
              totalCount
            }
            updatedAt,
            languages(first: 10){
              edges{
                node{
                  name, 
                  color
                }
              }
            },
            defaultBranchRef{
              target{
                ... on Commit{
                  signature{
                    isValid
                  }
                  tree{
                    entries{
                      extension,
                      name,
                    }
                  },
                  history{
                    totalCount,
                  },
                  additions,
                  deletions, 
                  history{
                    totalCount
                  }
                }
              }
            }
          }
        }
      },
    }
    }
`;


function GetData() {
  const { loading, error, data } = useQuery(DATA);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return(
    <div>
      <p>Nom : {data.viewer.name}</p>
      <p>{data.viewer.bio} at {data.viewer.company}</p>
      <p>{data.viewer.location}</p>

      <div>
      <p>Photo :{data.viewer.avatarUrl}</p>
      <img src={data.viewer.avatarUrl} alt="avatar"/>
      <p>Total Commits : </p>
      <p>Repos {data.viewer.repositories.totalCount}</p>
      <p>Followers : {data.viewer.followers.totalCount}</p>
      <p>Following: {data.viewer.following.totalCount}</p>
      </div>

      <div>
        <h2>Overview</h2>
        <p>{data.viewer.repositories.totalCount} repos</p>
        <p>{data.viewer.updatedAt}</p>
 
         <h2>Langages dans la partie Overview</h2>

       {data.viewer.repositories.edges.map((edge) => (
           <div>
             {edge.node.languages.edges.map((lang) => (
               <div>
                    <p>
                      {lang.node.name}
                    </p>
                    <p>{lang.node.color}</p>
              </div>
             ))}
          </div>
      ))}
      </div>

      <h2>LA partie Languages</h2>
      <div>
        <h3>Languages</h3>
        <p>{data.viewer.repositories.totalCount} repos</p>
        <p>{data.viewer.updatedAt}</p>



        {data.viewer.repositories.edges.map((edge) => (
           <div>
             {edge.node.languages.edges.map((lang) => (
               <div>
                    <p>
                      {lang.node.name} {lang.node.color}
                    </p>
                    <div> {data.viewer.repositories.edges.map((edge) => (
                      <div>
                         <p>Commits : {Number(edge.node.defaultBranchRef.target.additions) - Number(edge.node.defaultBranchRef.target.deletions)}</p>
                         </div>
                    ))}
                    </div>
              </div>
             ))}
          </div>
      ))}
        


      </div>
      <h2>
        Repositories
      </h2>
     
      {data.viewer.repositories.edges.map((edge) => (
         <div>
           <p>Nom de repo :  {edge.node.name}</p>
           <p>Description:  {edge.node.description}</p>
           <p>Path : {edge.node.resourcePath}</p>
           {/* <p>Commits for repo: {edge.node.defaultBranchRef.history.totalCount}</p> */}
           <p>Team : {edge.node.collaborators.totalCount}</p>
           <p>Language avec plus de lines de code</p>
           <p>{edge.node.updatedAt}</p>
           {/* <p>Signature vérified or not : {edge.node.defaultBranchRef.target.signature.isValid} </p> */}
           <p>Owner : {edge.node.owner.login}</p>
         </div>
      ))}


       <div>

      </div>
    </div>
  )
}

export default GetData;