import React from "react";
import {useQuery, gql } from "@apollo/client";
import '../style/main.css';

const DATA = gql`
  query user{
    viewer{
      name, 
      bio, 
      location,
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

const Overview  = () => {
    const { loading, error, data } = useQuery(DATA);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
   return(
       <section className="overviewContainer">
           <div className="bioContainer">
           <h1 className="viewerName">Overview</h1>
           <div className="bio">
               <p>{data.viewer.repositories.totalCount} repos</p>
               <p>Last updated : 2019/ 04 /16</p>
           </div>
           </div>
           <section className="containerLanguage">
            {data.viewer.repositories.edges.map((edge) => (
                edge.node.languages.edges.map((lang) => (
                    <div className="languageItem">
                        <p>
                            {lang.node.name}
                        </p>
                    </div>
                ))
            ))}
           </section>
       </section>
   )
}


export default Overview;
