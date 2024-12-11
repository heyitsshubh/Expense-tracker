import React from 'react'
import WeeklyPieChart from './WeeklyPieChart'
import WeeklyLineChart from './WeeklyLineChart';
import DailyAnalysisChart1 from "./DailyAnalysisChart1"; 
import DailyPieChart from './DailyPieChart';
import '../Styles/Statistics.css'

function Statistics() {
  return (
    <>

<div className="statistics-container">
    <div className="graph1">
      <WeeklyLineChart/>
    </div>
    
<div className="pie">
  <WeeklyPieChart/>
</div>

<div className="graph2">
  <DailyAnalysisChart1/>
</div>

<div className="pie2">
<DailyPieChart/>
</div>
</div>



    </>
  )
}

export default Statistics;




















