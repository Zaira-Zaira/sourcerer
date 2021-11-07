import { useQuery, gql } from "@apollo/client";
import '../style/main.css';
import Overview from './Overview';
import Languages from './Languages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Repositories from './Repositories';
import FunFacts from './FunFacts';
import { faShareAlt, faSortDown } from '@fortawesome/free-solid-svg-icons'
import QueryData from '../Data/queryData';




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



function GetNumberOfCommits({ repositories }) {
  const reducer = (previous, current) => {
    return (
      previous.node.defaultBranchRef.target.additions - previous.node.defaultBranchRef.target.deletions +
      current.node.defaultBranchRef.target.additions - current.node.defaultBranchRef.target.deletions
    )
  }
  const total = repositories.edges.reduce(reducer);
  return <p className="text">{total}</p>
}



function GetNumberLinesOfCodes({ repositories }) {
  const reducer = (previous, current) => {
    return (
      previous.node.defaultBranchRef.target.history.totalCount + current.node.defaultBranchRef.target.history.totalCount
    )
  }
  const total = repositories.edges.reduce(reducer);
  return <p className="text">{total}</p>
}


function DisplayNavBar() {

  const { loading, error, data } = useQuery(DATA);
  const { query } = useQuery(QueryData());
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
            <a href="data:image/jpeg;base64,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">get HTML</a>
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

        <section className="containerGeneralInfo">
          <div className="avatarContainer">
            <img src={data.viewer.avatarUrl} alt="avatar" className="avatarPhoto" />
          </div>
          <div className="commitsReposLinesCodeBox">
            <p className="text">
              Commits
            </p>
            <GetNumberLinesOfCodes repositories={data.viewer.repositories} />
          </div>
          <div className="commitsReposLinesCodeBox">
            <p className="text">
              Repos
            </p>
            <p className="text">
              {data.viewer.repositories.totalCount}
            </p>
          </div>
          <div className="commitsReposLinesCodeBox">
            <p className="text">
              Lines of codes
            </p>
            <GetNumberOfCommits repositories={data.viewer.repositories} />
          </div>
          <div className="followInfo">
            <p className="text">
              Followers
            </p>
            <div className="descFollowers">
              <div>
                <p className="text">
                  {data.viewer.followers.totalCount}
                </p>
              </div>
              <div>
                <FontAwesomeIcon icon={faShareAlt} />
              </div>
              <div>
              </div>
            </div>
          </div>
          <div className="followInfo">
            <p className="text">
              Following
            </p>
            <p className="text">
              {data.viewer.following.totalCount}
            </p>
          </div>
          <div className="refresh">
            <p className="text">
              Refresh
            </p>
            <div>
              <FontAwesomeIcon icon={faSortDown} className="tagIcon" />
            </div>
          </div>
        </section>
        <Overview data={data}/>
        <Languages />
        <Repositories />
        <FunFacts />
      </section>
    </section>
  )
}

export default DisplayNavBar;