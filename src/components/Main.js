import {useQuery, gql } from "@apollo/client";
import '../style/main.css';
import Overview from './Overview';
import Languages from './Languages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Repositories from './Repositories';

const DATA = gql`
  query user{
    viewer{
      name, 
      bio, 
      location,
      avatarUrl,
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
       <section>
          <div className="popInfo">
            <p>Did you know ? You can add statistics from your private repos to your profile</p>
           </div>
         <section className="container">
           <div className="shareProfile">
             <p>Share your profile on :</p>
               <ul className="shareList">
                 <li>LinkedIn</li>
                 <li>Twitter</li>
                 <li>Facebook</li>
                 <li>get HTML</li>
               </ul>
           </div>
             <div className="bioContainer">
             <h1 className="viewerName">{data.viewer.name}</h1>
             <div className="bio">
          <div className="bioAndLocation">     
          <p>{data.viewer.bio} at {data.viewer.company}</p>
          <p>{data.viewer.location}</p>
          </div>
        </div>
          </div>

          <section className="containerGeneralInfo">
            <div className="avatarContainer">
            <img src={data.viewer.avatarUrl} alt="avatar" className="avatarPhoto"/>
           </div>
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
                <div className="descFollowers">
                <p>{data.viewer.followers.totalCount}</p>
                <div>
                <FontAwesomeIcon icon="share-alt" color="#222"/>
                </div>
                </div>
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
        <Repositories/>
         </section>
         </section>
     )
}

export default DisplayNavBar;