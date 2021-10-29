import React from "react";
import {useQuery, gql } from "@apollo/client";
import '../style/main.css';
import { selectionSetMatchesResult } from "@apollo/client/cache/inmemory/helpers";

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


const Languages = () => {
    const { loading, error, data } = useQuery(DATA);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return(
        <section>
            <h1>Languages</h1>
            <section className="languages">
            {data.viewer.repositories.edges.map((edge) => (
                edge.node.languages.edges.map((lang) => (
                    <div className="langItem">
                        <div>
                        <p className="langName">
                            {lang.node.name}
                        </p>
                        </div>
                        <div className="commitsPerLang">
                            <p className="text">Commits :</p>
                            <p>2</p>
                        </div>
                        <div className="locPerLang">
                            <p className="text">LOC</p>
                            <p>318</p>
                        </div>
                    </div>
                ))
            ))}
           </section>
        </section>
    )
}

export default Languages;