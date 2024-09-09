import { AreaPlot } from "@mui/x-charts/LineChart";
import { areaElementClasses } from "@mui/x-charts/LineChart";
import { useYScale, useDrawingArea } from "@mui/x-charts/hooks";
import { LinePlot } from "@mui/x-charts/LineChart";

import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";

const StockInfoChart = () => {
  const dataset = [
    { x: 1, y: 4000 },
    { x: 2, y: 3000 },
    { x: 3, y: 2000 },
    { x: 4, y: 2780 },
    { x: 5, y: -1890 },
    { x: 6, y: 3490 },
    { x: 8, y: -2000 },
    { x: 9, y: 2780 },
    { x: 10, y: 1890 },
    { x: 11, y: 3490 },
    { x: 12, y: 3490 },
  ];

  const config = {
    dataset: dataset,
    xAxis: [{ dataKey: "x" }],
    series: [
      {
        type: "line",
        curve: "natural",
        dataKey: "y",
        showMark: false,
        area: true,
      },
    ],
    width: 312,
    height: 62,
    margin: { top: 25, bottom: 5, left: 0, right: 30 },
    sx: {
      [`& .${areaElementClasses.root}`]: {
        fill: "url(#swich-color-id-1)",
      },
    },
  };

  function ColorSwich({ threshold, color1, color2, id }) {
    const { top, height, bottom } = useDrawingArea();
    const svgHeight = top + bottom + height;

    const scale = useYScale(); // You can provide the axis Id if you have multiple ones
    const y0 = scale(threshold); // The coordinate of of the origine
    const off = y0 !== undefined ? y0 / svgHeight : 0;

    return (
      <defs>
        <linearGradient
          id={id}
          x1="0"
          x2="0"
          y1="0"
          y2={`${svgHeight}px`}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={off} stopColor={color1} stopOpacity={1} />
          <stop offset={off} stopColor={color2} stopOpacity={1} />
        </linearGradient>
      </defs>
    );
  }

  return (
    <ResponsiveChartContainer {...config}>
      <LinePlot />
      {/* <AreaPlot /> */}
      <ChartsReferenceLine y={0} />
      <ColorSwich
        color1="#11B678" // green
        color2="#FF3143" // red
        threshold={0}
        id="swich-color-id-1"
      />
      {/* <ChartsXAxis /> */}
      {/* <ChartsYAxis /> */}
    </ResponsiveChartContainer>
  );
};

export default StockInfoChart;
