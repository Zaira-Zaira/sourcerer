import { selectionSetMatchesResult } from "@apollo/client/cache/inmemory/helpers";
import React, { useState, useEffect } from "react";
import {useQuery, gql } from "@apollo/client";
import '../style/main.css';
import Overview from './Overview';
import Languages from './Languages';

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

function DisplayNavBar()  {
    const { loading, error, data } = useQuery(DATA);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
     return(
         <section className="container">
             <div className="bioContainer">
             <h1 className="viewerName">{data.viewer.name}</h1>
          <div className="bio">
          <p>{data.viewer.bio} at {data.viewer.company}</p>
          <p>{data.viewer.location}</p>
          </div>
          </div>

          <section className="containerGeneralInfo">
            <img src={data.viewer.avatarUrl} alt="avatar"/>
            <div className="commitsReposLinesCodeBox">
                <p>Commits</p>
                <p>4</p>
            </div>
            <div className="commitsReposLinesCodeBox">
                <p>Repos</p>
                <p>{data.viewer.repositories.totalCount}</p>
            </div>
            <div className="commitsReposLinesCodeBox">
                <p>Lines of codes</p>
                <p>4</p>
            </div>
            <div className="followInfo">
                <p>Followers</p>
                <p>{data.viewer.followers.totalCount}</p>
            </div>
            <div className="followInfo">
                <p>Following</p>
                <p>{data.viewer.following.totalCount}</p>
            </div>
            <div className="refresh">
                <p>Refresh</p>
            </div>
        </section>
        <Overview/>
        <Languages/>
         </section>
     )
}

export default DisplayNavBar;