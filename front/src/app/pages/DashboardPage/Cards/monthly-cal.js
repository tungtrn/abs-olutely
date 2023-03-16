import PropTypes from 'prop-types';
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowDownCircleIcon';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  SvgIcon
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => null
  });
  
const Chart = styled(ApexChart)``;

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: '#4F3881',
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value} kcal` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const MonthlyCal = (props) => {
  const { chartSeries, sx } = props;
  const chartOptions = useChartOptions();

  return (
    <Card sx={sx} style={{backgroundColor: "#A4DACA"}}>
      <CardHeader
        action={(
          <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowDownCircleIcon />
              </SvgIcon>
            )}
          >
            Download
          </Button>
        )}
        title="Monthly Calories"
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};

MonthlyCal.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};