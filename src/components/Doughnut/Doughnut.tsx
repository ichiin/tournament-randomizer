import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

import { Doughnut as ChartDonut } from 'react-chartjs-2';
import { PlayerType } from 'utils/types';
import { colors } from 'utils/colors';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const getPlayerGroupsSize = (data: PlayerType[]) => {
  const nbRegulars = data.filter((player) => !player.isSeeded).length;
  const nbSeeded = data.length - nbRegulars;
  return [nbSeeded, nbRegulars];
};

const convertPlayerData = (data: PlayerType[]) => {
  return {
    datasets: [
      {
        label: 'Regular',
        data: getPlayerGroupsSize(data),
        backgroundColor: [colors.cornYellow, colors.dustyRed],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
};

interface DoughnutProps {
  data: PlayerType[];
}

/** TODO 
interface PluginType {
  id: string;
  beforeDraw: (chart: any) => void;
}
*/

const Doughnut = ({ data }: DoughnutProps) => {
  const chartData = useMemo(() => convertPlayerData(data), [data]);
  /* TODO: fix this part to print the number in the center
  const plugin = {
    id: 'custom_number_center',
    beforeDraw: function (chart: any) {
      var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
      ctx.restore();
      var fontSize = (height / 160).toFixed(2);
      ctx.fillStyle = colors.lilyWhite;
      ctx.font = fontSize + 'em sans-serif';
      ctx.textBaseline = 'top';
      var text = `40`,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };*/

  return <ChartDonut data={chartData} options={{ responsive: true }} />;
};

export default Doughnut;
