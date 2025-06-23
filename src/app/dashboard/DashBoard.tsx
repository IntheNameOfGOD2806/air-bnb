"use client";
import * as React from "react";
import type { Metadata } from "next";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";

import { config } from "@/config";
import { Budget } from "@/components/dashboard/overview/budget";
import { LatestOrders } from "@/components/dashboard/overview/latest-orders";
import { LatestProducts } from "@/components/dashboard/overview/latest-products";
import { BookingsThisWeek, Sales } from "@/components/dashboard/overview/sales";
import { TasksProgress } from "@/components/dashboard/overview/tasks-progress";
import { TotalCustomers } from "@/components/dashboard/overview/total-customers";
import { TotalProfit } from "@/components/dashboard/overview/total-profit";
import { Traffic } from "@/components/dashboard/overview/traffic";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import GlobalStyles from "@mui/material/GlobalStyles";
import { UserProvider } from "@/context/user-context";
import { LocalizationProvider } from "@/components/core/localization-provider";
import { ThemeProvider } from "@/components/core/theme-provider/theme-provider";
import { AuthGuard } from "@/components/auth/auth-guard";
import { MainNav } from "@/components/dashboard/layout/main-nav";
import { SideNav } from "@/components/dashboard/layout/side-nav";
import AppWrapper from "../wrapper";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <AppWrapper>
      <LocalizationProvider>
        {/* <UserProvider> */}
        <ThemeProvider>
          {/* <AuthGuard> */}
          <GlobalStyles
            styles={{
              body: {
                "--MainNav-height": "56px",
                "--MainNav-zIndex": 1000,
                "--SideNav-width": "280px",
                "--SideNav-zIndex": 1100,
                "--MobileNav-width": "320px",
                "--MobileNav-zIndex": 1100,
              },
            }}
          />
          <Box
            sx={{
              bgcolor: "var(--mui-palette-background-default)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              minHeight: "100%",
            }}
          >
            {/* <SideNav /> */}
            <Box
              sx={{
                display: "flex",
                flex: "1 1 auto",
                flexDirection: "column",
                pl: { lg: "" },
              }}
            >
              {/* <MainNav /> */}
              <main>
                <Container maxWidth="xl" sx={{ py: "64px" }}>
                  {children}
                </Container>
              </main>
            </Box>
          </Box>
          {/* </AuthGuard> */}
        </ThemeProvider>
        {/* </UserProvider> */}
      </LocalizationProvider>
    </AppWrapper>
  );
}

export default function DashBoard(): React.JSX.Element {
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid
          size={{
            lg: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <Budget diff={12} trend="up" sx={{ height: "100%" }} value="797" />
        </Grid>
        <Grid
          size={{
            lg: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <TotalCustomers
            diff={16}
            trend="down"
            sx={{ height: "100%" }}
            value="65"
          />
        </Grid>
        <Grid
          size={{
            lg: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <TasksProgress
            sx={{ height: "100%" }}
            value="20"
            trend="up"
            diff={16}
          />
        </Grid>
        <Grid
          size={{
            lg: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <TotalProfit sx={{ height: "100%" }} value="50" />
        </Grid>
        <Grid
          size={{
            lg: 8,
            xs: 12,
          }}
        >
          {/* <Sales
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        /> */}
          <BookingsThisWeek
            chartSeries={[
              {
                name: "Bookings",
                data: [0, 0, 0, 0, 0, 0, 0], // Thứ 2 -> Chủ nhật
              },
            ]}
          />
        </Grid>
        <Grid
          size={{
            lg: 4,
            md: 6,
            xs: 12,
          }}
        >
          <Traffic
            chartSeries={[502, 103, 175]}
            labels={["Desktop", "Tablet", "Phone"]}
            sx={{ height: "100%" }}
          />
        </Grid>
        <Grid
          size={{
            lg: 4,
            md: 6,
            xs: 12,
          }}
        >
          {/* <LatestProducts
          products={[
            {
              id: "PRD-005",
              name: "Soja & Co. Eucalyptus",
              image: "/assets/product-5.png",
              updatedAt: dayjs()
                .subtract(18, "minutes")
                .subtract(5, "hour")
                .toDate(),
            },
            {
              id: "PRD-004",
              name: "Necessaire Body Lotion",
              image: "/assets/product-4.png",
              updatedAt: dayjs()
                .subtract(41, "minutes")
                .subtract(3, "hour")
                .toDate(),
            },
            {
              id: "PRD-003",
              name: "Ritual of Sakura",
              image: "/assets/product-3.png",
              updatedAt: dayjs()
                .subtract(5, "minutes")
                .subtract(3, "hour")
                .toDate(),
            },
            {
              id: "PRD-002",
              name: "Lancome Rouge",
              image: "/assets/product-2.png",
              updatedAt: dayjs()
                .subtract(23, "minutes")
                .subtract(2, "hour")
                .toDate(),
            },
            {
              id: "PRD-001",
              name: "Erbology Aloe Vera",
              image: "/assets/product-1.png",
              updatedAt: dayjs().subtract(10, "minutes").toDate(),
            },
          ]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid
        size={{
          lg: 8,
          md: 12,
          xs: 12,
        }}
      >
        <LatestOrders
          orders={[
            {
              id: "ORD-007",
              customer: { name: "Ekaterina Tankova" },
              amount: 30.5,
              status: "pending",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-006",
              customer: { name: "Cao Yu" },
              amount: 25.1,
              status: "delivered",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-004",
              customer: { name: "Alexa Richardson" },
              amount: 10.99,
              status: "refunded",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-003",
              customer: { name: "Anje Keizer" },
              amount: 96.43,
              status: "pending",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-002",
              customer: { name: "Clarke Gillebert" },
              amount: 32.54,
              status: "delivered",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
            {
              id: "ORD-001",
              customer: { name: "Adam Denisov" },
              amount: 16.76,
              status: "delivered",
              createdAt: dayjs().subtract(10, "minutes").toDate(),
            },
          ]}
          sx={{ height: "100%" }}
        /> */}
        </Grid>
      </Grid>
    </Layout>
  );
}
