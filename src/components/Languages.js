import React from "react";
import '../style/main.css';
import { Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'




function GetCommitsNbPerLanguage({ data, lang }) {
  let count = 0;
  let ExtensionsArray = data.viewer.repositories.edges
    .map(({ node }) => node.defaultBranchRef.target.tree.entries)
    .flat()
    .map(({ extension }) => extension);
  let ExtensionsArrayOnTree = data.viewer.repositories.edges
    .map(({ node }) => node.defaultBranchRef.target.tree.entries)
    .flat()
    .map(({ object }) => object);
  
  for (let i = 0; i < ExtensionsArray.length; i++) {
    if (ExtensionsArray[i].includes(lang.toLowerCase()) || ExtensionsArray[i].includes("js")) {
      count += 1
    }
  }

  ExtensionsArrayOnTree.map((item) => (
    item != null ?
      item.entries != null ?
        item.entries.map((entrie) => (
          entrie.extension.includes(lang.toLowerCase())  ?
            count += 1
            :
            entrie.extension.includes("js") ? 
            count += 1
            :
            count += 0
        )) :
        null
      :
      null
  ));
  return count;
}




//fonction what give size in bytes per language

function GetLinesOfCodesPerCommit({ data, lang }) {
  let count = 0;
    let ExtensionsArray = data.viewer.repositories.edges
    .map(({ node }) => node.languages.edges)

    ExtensionsArray.map((item) => (
         item.map((language) => (
          language.node.name == lang ? 
           count = count + language.size
          :
          count += 0
         ))
    ));

         return <p>{count}</p>
}


function Languages({data}){


  let languages = data.viewer.repositories.edges
    .map(({ node }) => node.languages.edges)
    .flat()
    .map(({ node }) => node.name + node.color);
  languages = languages.filter((item, index) => languages.indexOf(item) === index);



  return (
    <section className="containerLanguages">
      <div className="languagesHeader">
        <h1 className="viewerName">
          Languages
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
      <section className="pieLangCont">
        <section className="languages">
          {languages.map((lang) => (
            <div className="langItem">
              <div className="langTagCont">
                <p className="langName">
                  {lang.replace(/#[\s\S]*$/, "")}
                </p>
                <div className="tagIconLang">
                  <FontAwesomeIcon style={{ color: lang.replace(/^((.*?))#/, "#") }} icon={faCircle} className="repoTagIcon" />
                </div>
              </div>
              <div className="commitsPerLang">
                <p className="text">
                  Commits :
                </p>
                <p>
                  <GetCommitsNbPerLanguage data={data} lang={lang.replace(/#[\s\S]*$/, "")} />
                </p>
              </div>
              <div className="locPerLang">
                <p className="text">
                  LOC
                </p>
                <p>
                  <GetLinesOfCodesPerCommit data={data} lang={lang.replace(/#[\s\S]*$/, "")} />
                </p>
              </div>
            </div>
          ))
          }
        </section>
        <div className="pieContainer">
          <div className="pie">
            <Pie
              data={{
                labels: languages.map(lang => lang.replace(/#[\s\S]*$/, "")),
                datasets: [
                  {
                    label: '',
                    data: data.viewer.repositories.edges.map(edge => edge.node.defaultBranchRef.target.history.totalCount),
                    backgroundColor: languages.map(lang => lang.replace(/^((.*?))#/, "#")),
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
      </section>
    </section>
  )
}

export default Languages;