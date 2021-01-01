import Chart from "../misc/chart";
import React from "react";
import useRandomColor from "../../hooks/useRandomColor";
import _Empty from "../misc/empty";

export default function CoursesChart({data}) {
  let courseColors = []
  let dataByCourse = data && data.length ? data.map(d => {
    return {label: d._id, value: d.total}
  }) : []
  for (let i = 0; i < dataByCourse.length; i++) {
    courseColors.push(useRandomColor())
  }
  if (!data || !data.length)
    return <_Empty description={'No data for courses'}/>
  return <Chart colors={courseColors} data={dataByCourse} type={'doughnut'} options={{
    title: {
      display: true,
      text: 'Courses',
      position: 'bottom',
      fontStyle: 'bold',
      fontSize: 16
    },
    legend: {
      display: false,
      position: 'bottom',
      align: 'center'
    }
  }}/>
}