import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';

type CalsProgressProps = {
    value: number;
    sx?: any;
}

export const CalsProgress = (props: CalsProgressProps) => {
  const { value, sx } = props;

  return (
    <Card sx={sx} style={{backgroundColor: "#F2A0FF"}}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              <b>Today Goal (kcal)</b>
            </Typography>
            <Typography variant="h4">
              {value}%
            </Typography>
          </Stack>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress
            value={value}
            variant="determinate"
            sx={{
							minHeight: "1vh",
							borderRadius: "20px",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

CalsProgress.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};