import React from "react";
import {useQuery, gql } from "@apollo/client";
import '../style/main.css';
import { Doughnut, Pie } from 'react-chartjs-2';
import { useEffect, useState } from "react";


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
            languages(first: 6){
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
        <section className="containerLanguages">
            <h1 className="langTitle">Languages</h1>
           <section className="pieLangCont">
            <section className="languages">
            {languages.map((lang) => (
                    <div className="langItem">
                        <div>
                        <p className="langName">
                            {lang}
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
            }
           </section>
           <div className="pieContainer">
             <div className="pie">
           <Pie
           data = {{
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
              text:'Languages per repo',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        /> 
        </div>
        </div>
        </section>
        </section>
    )
}

export default Languages;