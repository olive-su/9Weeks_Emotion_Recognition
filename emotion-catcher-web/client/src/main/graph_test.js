import { ResponsiveLine } from "@nivo/line";
import React from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const dataset = [
  {
    id: "japan",
    color: "hsl(215, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 168,
      },
      {
        x: "helicopter",
        y: 285,
      },
      {
        x: "boat",
        y: 74,
      },
      {
        x: "train",
        y: 256,
      },
      {
        x: "subway",
        y: 237,
      },
      {
        x: "bus",
        y: 17,
      },
      {
        x: "car",
        y: 170,
      },
      {
        x: "moto",
        y: 122,
      },
      {
        x: "bicycle",
        y: 273,
      },
      {
        x: "horse",
        y: 221,
      },
      {
        x: "skateboard",
        y: 203,
      },
      {
        x: "others",
        y: 50,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(99, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 208,
      },
      {
        x: "helicopter",
        y: 113,
      },
      {
        x: "boat",
        y: 173,
      },
      {
        x: "train",
        y: 274,
      },
      {
        x: "subway",
        y: 122,
      },
      {
        x: "bus",
        y: 146,
      },
      {
        x: "car",
        y: 126,
      },
      {
        x: "moto",
        y: 174,
      },
      {
        x: "bicycle",
        y: 85,
      },
      {
        x: "horse",
        y: 130,
      },
      {
        x: "skateboard",
        y: 130,
      },
      {
        x: "others",
        y: 252,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(358, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 188,
      },
      {
        x: "helicopter",
        y: 197,
      },
      {
        x: "boat",
        y: 91,
      },
      {
        x: "train",
        y: 147,
      },
      {
        x: "subway",
        y: 136,
      },
      {
        x: "bus",
        y: 130,
      },
      {
        x: "car",
        y: 248,
      },
      {
        x: "moto",
        y: 82,
      },
      {
        x: "bicycle",
        y: 199,
      },
      {
        x: "horse",
        y: 163,
      },
      {
        x: "skateboard",
        y: 78,
      },
      {
        x: "others",
        y: 27,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(191, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 131,
      },
      {
        x: "helicopter",
        y: 216,
      },
      {
        x: "boat",
        y: 24,
      },
      {
        x: "train",
        y: 207,
      },
      {
        x: "subway",
        y: 132,
      },
      {
        x: "bus",
        y: 235,
      },
      {
        x: "car",
        y: 115,
      },
      {
        x: "moto",
        y: 165,
      },
      {
        x: "bicycle",
        y: 264,
      },
      {
        x: "horse",
        y: 68,
      },
      {
        x: "skateboard",
        y: 137,
      },
      {
        x: "others",
        y: 220,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(103, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 222,
      },
      {
        x: "helicopter",
        y: 272,
      },
      {
        x: "boat",
        y: 200,
      },
      {
        x: "train",
        y: 297,
      },
      {
        x: "subway",
        y: 197,
      },
      {
        x: "bus",
        y: 35,
      },
      {
        x: "car",
        y: 239,
      },
      {
        x: "moto",
        y: 257,
      },
      {
        x: "bicycle",
        y: 277,
      },
      {
        x: "horse",
        y: 66,
      },
      {
        x: "skateboard",
        y: 207,
      },
      {
        x: "others",
        y: 144,
      },
    ],
  },
];

const MyResponsiveLine = ({ dataset }) => (
  <ResponsiveLine
    data={dataset}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "transportation",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsiveLine;
