import React, {useEffect, useRef, useState} from "react";
import Chartjs from 'chart.js';

export default function Chart({type, options, data, width, height, colors}) {
  let canvasRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const newChartInstance = new Chartjs(canvasRef.current, {
        type: type ? type : 'bar',
        options: {
          ...options,
          maintainAspectRatio: false
        },
        data: {
          labels: data.map(d => d.label),
          datasets: [{
            data: data.map(d => d.value),
            backgroundColor: colors
          }]
        }
      })
      setChartInstance(newChartInstance);
    }
  }, [canvasRef])

  return <canvas ref={canvasRef} width={width ? width : '500'}
                 height={height ? height : '500'}/>;
}