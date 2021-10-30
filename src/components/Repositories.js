import React, { useEffect, useState } from "react";
import {useQuery, gql } from "@apollo/client";
import '../style/main.css';
import { Bar } from 'react-chartjs-2';


const DATA = gql`
  query user{
    viewer{
      name, 
      updatedAt
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
      repositories(first: 7){
        nodes{
          id
          name
          description, 
          resourcePath
          owner{
            login
          }
        }
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
            languages(first: 7){
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
                    signer{
                      login
                      avatarUrl
                    }
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


function  Repositories(){
    const { loading, error, data } = useQuery(DATA);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

   return(
       <section>
           <div className="repoHeader">
           <h1 className="viewerName">Repositories</h1>
             <div className="repoInfo">
              <p>{data.viewer.repositories.totalCount} repos</p>
               <p>Last updated: {data.viewer.updatedAt}</p>
              </div>
           </div>
       <div>    
         <div className="arrayContainer">
<table>
    <thead>
        <tr>
            <th>#</th>
            <th>Repository</th>
            <th>Commits</th>
            <th>Team</th>
            <th>Language</th>
            <th>Timeline</th>
        </tr>
    </thead>
    <tbody>
        {data.viewer.repositories.edges.map((repo) => (
          <tr>
            <td>1</td>
            <td>
            <div className="infoRepLine">
              <p>{repo.node.name} </p>
              <p>{repo.node.description}</p>
              <p>{repo.node.resourcePath}</p>
              <div className="languagesPerRepo">
                {repo.node.languages.edges.map((lang) => (
                  <div>
                    <p>{lang.node.name}</p>
                  </div>
                ))}
              </div>
              <div>
                {repo.node.defaultBranchRef.target.signature != null ? 
                <div>
                <p>Verified</p>
                <img src={repo.node.defaultBranchRef.target.signature.signer.avatarUrl} alt="signer avatar"/>
                <p>{repo.node.defaultBranchRef.target.signature.signer.login}</p>
                </div>
                :
                 null
                }
              </div>
            </div>
            </td>
            <td>{}</td>
            <td>{repo.node.collaborators.totalCount}</td>
            <td>C</td>
            <td>Time</td>
          </tr>
        ))}
    </tbody>
</table>
</div>
      </div>     
       </section>
   )
}


export default Repositories;


