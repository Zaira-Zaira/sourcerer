import { useQuery, gql } from "@apollo/client";
import '../style/main.css';
import Overview from './Overview';
import Languages from './Languages';
import Repositories from './Repositories';
import FunFacts from './FunFacts';
import GeneralInfos from "./GeneralInfos";




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
    repositories(first: 13){
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





function DisplaySourcerer() {

  const { loading, error, data } = useQuery(DATA);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <section>
      <div className="grayBar"></div>
      <div className="popInfo">
        <p>
          Did you know ? You can add statistics from your private repos to your profile
        </p>
      </div>
      <section className="container">
        <div className="shareProfile">
          <p>
            Share your profile on :
          </p>
          <ul className="shareList">
            <li>
              <a href="https://www.linkedin.com/">LinkedIn</a>
            </li>
            <li>
            <a href="https://twitter.com/">Twitter</a>
            </li>
            <li>
            <a href="https://fr-fr.facebook.com/">Facebook</a>
            </li>
            <li>
            <a href="../html.jpg">get HTML</a>
            </li>
          </ul>
        </div>
        <div className="bioContainer">
          <h1 className="viewerName">
            {data.viewer.name}
          </h1>
          <div className="bio">
            <div className="bioAndLocation">
              <p>
                {data.viewer.bio} at {data.viewer.company}
              </p>
              <p>
                {data.viewer.location}
              </p>
            </div>
          </div>
        </div>
        <GeneralInfos/>
        <Overview data={data}/>
        <Languages data={data}/>
        <Repositories data={data}/>
        <FunFacts data={data}/>
      </section>
    </section>
  )
}

export default DisplaySourcerer;