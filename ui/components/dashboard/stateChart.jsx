import Chart from "../misc/chart";
import React from "react";
import useRandomColor from "../../hooks/useRandomColor";
import _Empty from "../misc/empty";

export default function StateChart({data}) {
  let stateColors = []
  let dataByState = data && data.length ? data.map(d => {
    return {label: d._id, value: d.total}
  }) : []
  for (let i = 0; i < dataByState.length; i++) {
    stateColors.push(useRandomColor())
  }
  if (!data || !data.length)
    return <_Empty description={'No data for states'}/>
  return <Chart colors={stateColors} data={dataByState} type={'doughnut'} options={{
    title: {
      display: true,
      text: 'States',
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