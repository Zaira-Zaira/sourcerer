import { useQuery, gql } from "@apollo/client";
import '../style/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import QueryData from '../Data/queryData';
import { faShareAlt, faSortDown } from '@fortawesome/free-solid-svg-icons'


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



function GeneralInfos(){

    const { loading, error, data } = useQuery(QueryData());

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    return(
       <section>
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
       </section> 
    )
}

export default GeneralInfos;