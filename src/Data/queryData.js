import React from 'react';
import {
  gql
} from "@apollo/client";





const QueryData =  function(){
         const DATA = gql`
         query user{
           viewer{
             name, 
             updatedAt
             avatarUrl
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
             contributionsCollection{
              contributionCalendar{
                weeks{
                  contributionDays{
                    contributionCount
                    date
                    weekday
                  }
                }
              }
             }
             repositories(first: 2){
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
                  primaryLanguage{
                    name
                    color
                  }
                   owner{
                     avatarUrl
                   }
                   resourcePath,
                   description,
                   updatedAt,
                   name,
                   owner{
                     login
                     avatarUrl
                   },
                   collaborators{
                     totalCount
                   }
                   updatedAt,
                   languages(first: 20){
                     edges{
                       size
                       node{
                         name, 
                         color
                       }
                     }
                   },
                   isEmpty
                   defaultBranchRef{
                     target{
                       ... on Tree{
                        entries{
                          extension
                          name
                        }
                       }
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
                            object{
                              ... on Blob{
                                byteSize
                                text
                              }
                              ... on Tree{
                                entries{
                                  extension
                                }
                              }
                            }
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
       return DATA;
}


export default QueryData;

