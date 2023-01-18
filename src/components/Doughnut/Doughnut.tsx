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

const Doughnut = ({ data }: DoughnutProps) => {
  const chartData = useMemo(() => convertPlayerData(data), [data]);

  return <ChartDonut data={chartData} options={{ responsive: true }} />;
};

export default Doughnut;
