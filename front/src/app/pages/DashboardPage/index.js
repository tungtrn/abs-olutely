import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from './Layout/layout';
import { DailyCal } from './Cards/daily-cal';
import { ShoppingList } from './Cards/shopping-list';
import { MonthlyCal } from './Cards/monthly-cal';
import { CalsProgress } from './Cards/cal-goal-tracking';
import { DailySpend } from './Cards/daily-spend';
import { SpendProgress } from './Cards/spend-goal-tracking';
import { ComponentDistribution } from './Cards/component-dist';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        Dashboard
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <DailyCal
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="2400"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <DailySpend
              difference={20}
              positive={false}
              sx={{ height: '100%' }}
              value="$150"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CalsProgress
              sx={{ height: '100%' }}
              value={100*(2500/3200)}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <SpendProgress
              sx={{ height: '100%' }}
              value={100*(280/400)}
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <MonthlyCal
              chartSeries={[
                {
                  name: 'This week',
                  data: [1800, 1600, 1400, 1700, 1900, 1800, 2000]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <ComponentDistribution
              chartSeries={[63, 15, 22, 30]}
              labels={['Micro', 'Macro', 'Carb', 'Protein']}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <ShoppingList
              orders={[
                {
                  id: 'abcd',
                  spend: 30.5,
                  store: {
                    name: 'Amazon Fresh'
                  },
                  status: 'shipping'
                },
                {
                  id: 'xyz',
                  spend: 25.1,
                  store: {
                    name: 'Old Nelson'
                  },
                  status: 'delivered'
                },
                {
                  id: 'ghi',
                  spend: 10.99,
                  store: {
                    name: 'Amazon'
                  },
                  status: 'refunded'
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;