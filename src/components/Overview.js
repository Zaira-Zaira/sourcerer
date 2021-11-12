import React from "react";
import '../style/main.css';
import { Bar } from 'react-chartjs-2';




function Overview({data}) {

  let languages = data.viewer.repositories.edges
    .map(({ node }) => node.languages.edges)
    .flat()
    .map(({ node }) => node.name);
  languages = languages.filter((item, index) => languages.indexOf(item) === index);



  let languagesColor = data.viewer.repositories.edges
    .map(({ node }) => node.languages.edges)
    .flat()
    .map(({ node }) => node.color);
  languagesColor = languagesColor.filter((item, index) => languagesColor.indexOf(item) === index);



  return (
    <section className="overviewContainer">
      <div className="bioContainer">
        <h1 className="viewerName">
          Overview
        </h1>
        <div className="overviewheader">
          <p className="text">
            {data.viewer.repositories.totalCount} repos
          </p>
          <p className="text">
            Last updated: {data.viewer.updatedAt.replace(/[A-Z]/g, " ")}
          </p>
        </div>
      </div>
      <div>
        <Bar
          data={{
            labels: languages.map(lang => lang),
            datasets: [
              {
                label: '',
                data: data.viewer.repositories.edges.map(edge => edge.node.defaultBranchRef.target.history.totalCount),
                backgroundColor: languagesColor.map(color => color),
                borderWidth: 1,
              },
            ],
          }}
          options={{
            title: {
              display: true,
              text: 'Average commits per language',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </div>
    </section>
  )
}


export default Overview;
