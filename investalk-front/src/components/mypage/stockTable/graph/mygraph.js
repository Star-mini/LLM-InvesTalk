import { AreaPlot, lineElementClasses } from "@mui/x-charts/LineChart";
import { areaElementClasses } from "@mui/x-charts/LineChart";
import { useYScale, useDrawingArea } from "@mui/x-charts/hooks";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";

const MyGraph = ({ data }) => {
  // 그래프 데이터의 y값을 기반으로 x값을 자동으로 생성합니다.
  const dataset = data.map((y, index) => ({ x: index, y }));

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
        color: "#D2A5FF",
      },
    ],
    width: 50,
    height: 50,
    margin: { top: 0, bottom: 30, left: 0, right: 0 },
    sx: {
      [`& .${areaElementClasses.root}`]: {
        fill: "url(#swich-color-id-1)",
      },
      [`& .${lineElementClasses.root}`]: {
        strokeWidth: 1,
      },
    },
  };

  function ColorSwich({ threshold, color1, color2, id }) {
    const { top, height, bottom } = useDrawingArea();
    const svgHeight = top + bottom + height;

    const scale = useYScale();
    const y0 = scale(threshold);
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
      <AreaPlot />
      <ChartsReferenceLine y={0} />
      <ColorSwich
        color1="rgb(225, 247, 255)"
        color2="rgb(247, 239, 255)"
        threshold={0}
        id="swich-color-id-1"
      />
    </ResponsiveChartContainer>
  );
};

export default MyGraph;
