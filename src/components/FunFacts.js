import { useQuery, gql } from "@apollo/client";
import '../style/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Bar, Doughnut } from 'react-chartjs-2';
import { faShareAlt, faCircleNotch } from '@fortawesome/free-solid-svg-icons'




function GetWeekDayOfCommits({ data }) {

  if(data.viewer.contributionsCollection !== undefined ) {
    let weekDays = data.viewer.contributionsCollection.contributionCalendar.weeks
    .map(({ contributionDays }) => contributionDays)
    .flat()
    .map(({ weekday }) => weekday)
  }
  return <p>weekDay</p>;
}


function FunFacts({data}) {
  let languages = data.viewer.repositories.edges
    .map(({ node }) => node.languages.edges)
    .flat()
    .map(({ node }) => node.name + node.color);

  languages = languages.filter((item, index) => languages.indexOf(item) === index);


  return (
    <section className="funfactsContainer">
      <div className="funfactsHeader">
        <h1 className="viewerName">
          Fun facts
        </h1>
        <div className="repoInfo">
          <p className="text">
            {data.viewer.repositories.totalCount} repos
          </p>
          <p className="text">
            Last updated: {data.viewer.updatedAt.replace(/[A-Z]/g, " ")}
          </p>
        </div>
      </div>
      <div className="factsItemCont">
        <div className="productiveTimeContainer">
          <div className="factsHeader">
            <p className="textFacts">
              I'm most productive during
            </p>
            <FontAwesomeIcon icon={faShareAlt} className="funfactsIcons" />
          </div>
          <div className="titleCont">
            <h3 className="title">
              Night Time
            </h3>
            <div className="usersProd">
              <p className="textUsersProd">
                6% of users
              </p>
              <FontAwesomeIcon icon={faCircleNotch} className="funfactsIcons" />
            </div>
          </div>
          <div>
            <Bar
              data={{
                labels: ['Night', 'Morning', 'Daytime', 'Evening'],
                datasets: [
                  {
                    label: 'time',
                    data: data.viewer.repositories.edges.map(edge => edge.node.defaultBranchRef.target.history.totalCount),
                    backgroundColor: [],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: 'Average commits per time',
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'right'
                }
              }}
            />
          </div>
        </div>
        <div className="mostProductiveDay">
          <div className="factsHeader">
            <p className="textFacts">
              I'm most productive on
            </p>
            <FontAwesomeIcon icon={faShareAlt} className="funfactsIcons" />
          </div>
          <div className="titleCont">
            <h3 className="title">
              <GetWeekDayOfCommits data={data} />
            </h3>
            <div className="usersProd">
              <p className="textUsersProd">
                11% of users
              </p>
              <FontAwesomeIcon icon={faCircleNotch} className="funfactsIcons" />
            </div>
          </div>
          <div className="graphCont">
            <Bar
              data={{
                labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                datasets: [
                  {
                    label: 'day',
                    data: data.viewer.repositories.edges.map(edge => edge.node.defaultBranchRef.target.history.totalCount),
                    backgroundColor: [],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: 'Average commits per day',
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'right'
                }
              }}
            />
          </div>
        </div>
        <div className="preferencesContainer">
          <div className="preferSpacesCont">
            <div className="factsHeader">
              <p className="textFacts">
                I prefer
              </p>
              <FontAwesomeIcon icon={faShareAlt} className="funfactsIcons" />
            </div>
            <h3 className="title">
              Spaces
            </h3>
            <div>
              <p>
                for indentation
              </p>
            </div>
            <div>
              <Doughnut
                data={{
                  labels: [],
                  datasets: [
                    {
                      label: '',
                      data: data.viewer.repositories.edges.map(edge => edge.node.defaultBranchRef.target.history.totalCount),
                      // backgroundColor: languagesColor.map(color => color),
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
          <div className="preferCamelCaseCont">
            <div className="factsHeader">
              <p className="textFacts">
                I prefer
              </p>
              <FontAwesomeIcon icon={faShareAlt} className="funfactsIcons" />
            </div>
            <h3 className="title">
              CamelCase
            </h3>
            <div>
              <p>
                for naming variables
              </p>
            </div>
            <div>
              <Doughnut
                data={{
                  labels: [],
                  datasets: [
                    {
                      label: '',
                      data: data.viewer.repositories.edges.map(edge => edge.node.defaultBranchRef.target.history.totalCount),
                      // backgroundColor: languagesColor.map(color => color),
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}


export default FunFacts;

