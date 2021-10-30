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
      repositories(first: 13){
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
            languages(first: 13){
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



function Overview(){

    const { loading, error, data } = useQuery(DATA);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

      let languages = data.viewer.repositories.edges
      .map(({ node }) => node.languages.edges)
      .flat()
      .map(({ node }) => node.name);

      languages =  languages.filter((item, index) => languages.indexOf(item) === index);

      let languagesColor = data.viewer.repositories.edges
      .map(({ node }) => node.languages.edges)
      .flat()
      .map(({ node }) => node.color);

      languagesColor =  languagesColor.filter((item, index) => languagesColor.indexOf(item) === index);




      
   return(
       <section className="overviewContainer">
           <div className="bioContainer">
           <h1 className="viewerName">Overview</h1>
           <div className="overviewheader">
               <p>{data.viewer.repositories.totalCount} repos</p>
               <p>Last updated: {data.viewer.updatedAt}</p>
           </div>
           </div>
           <div>
             <Bar
            data={{
            labels: languages.map(lang => lang),
            datasets: [
              {
                label: '# of Votes',
                data: data.viewer.repositories.edges.map(edge => edge.node.defaultBranchRef.target.history.totalCount),
                backgroundColor: languagesColor.map(color => color),
                borderWidth: 1,
              },
            ],
          }}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
             </div>
           <section className="containerLanguage">
            {languages.map((lang) => (
                    <div className="languageItem">
                        <p>
                            {lang}
                        </p>
                    </div>
                ))}
           </section>
       </section>
   )
}


export default Overview;
