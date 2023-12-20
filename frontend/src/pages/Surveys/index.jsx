import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
function Surveys() {
  const [surveys, setsurveys] = useState("");
  async function getSurveys() {
    try {
      const surveys = await axios.get("http://127.0.0.1:8000/survey/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setsurveys(surveys.data.surveys);
      console.log(surveys.data.surveys);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSurveys();
  }, []);
  return (
    <div className="surveys">
      {surveys && (
        <>
          {surveys.map((survey) => {
            return (
              <div className="survey-single" key={survey.id}>
                <p className="survey-title">{survey.title}</p>
                <div className="survey-info">
                  <span className="survey-info-field">
                    Number of questions:
                  </span>
                  <span className="survey-info-value">10</span>
                </div>
                <div className="survey-info">
                  <span className="survey-info-field">Category:</span>
                  <span className="survey-info-value">{survey.category}</span>
                </div>
                <div className="survey-info">
                  <span className="survey-info-field">Created by:</span>
                  <span className="survey-info-value">
                    {survey.belongs_to.name}
                  </span>
                </div>
                <button className="solve">Solve</button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Surveys;
