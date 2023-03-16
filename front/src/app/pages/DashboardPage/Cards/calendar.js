import { Card, CardContent, CardHeader } from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';

export const Calendar = (props) => {
  const { sx } = props;
  return (
    <Card sx={sx} style={{backgroundColor: "#68A592"}}>
        <CardHeader title="Calendar" />
        <CardContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <StaticDatePicker defaultValue={dayjs(new Date())} />

            </LocalizationProvider>
        </CardContent>
    </Card>
    );
}