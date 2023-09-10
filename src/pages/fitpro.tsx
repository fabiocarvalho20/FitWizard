import Header from "@/components/Header";
import React from "react";
import { User } from "@prisma/client";
import AuthenticatedPage from "@/components/page-helpers/AuthenticatedPage";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

export default function fitproWrapper() {
  type FitProProps = {
    user: User;
  };

  return (
    <AuthenticatedPage>
      {({ user }) => <FitPro user={user} />}
    </AuthenticatedPage>
  );
  function FitPro({ user }: FitProProps) {
    const tiers = [
      {
        title: "Pro",
        price: "15",
        description: [
          "1 consulta com nutricionista por mês",
          "ficha de treino personalizada",
          "desconto de 10% em produtos FitWizard",
        ],
        buttonText: "Começar!",
        buttonVariant: "contained",
      },
      {
        title: "Premium",
        price: "30",
        description: [
          "2 consultas com nutricionista por mês",
          "consultoria mensal com personal",
          "desconto de 15% em produtos FitWizard",
        ],
        buttonText: "Começar!",
        buttonVariant: "contained",
      },
    ];
    return (
      <>
        <Header user={user} />
        <div className="content">
          <Box sx={{ pt: 8, pb: 6 }}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Planos
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              component="p"
            >
              Turbine os seus resuldados com o acompanhamento de perto de
              especialistas renomados!
            </Typography>
          </Box>
          {/* End hero unit */}
          <Box>
            <Grid container spacing={5} alignItems="flex-end">
              {tiers.map((tier) => (
                <Grid item key={tier.title}>
                  <Card sx={{ width: 275, height: 375 }}>
                    <CardHeader
                      title={tier.title}
                      titleTypographyProps={{ align: "center" }}
                      subheaderTypographyProps={{
                        align: "center",
                      }}
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.3);",
                      }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "baseline",
                          mb: 2,
                        }}
                      >
                        <Typography
                          component="h2"
                          variant="h3"
                          color="text.primary"
                        >
                          ${tier.price}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          /mês
                        </Typography>
                      </Box>
                      <ul>
                        {tier.description.map((line) => (
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={line}
                          >
                            {line}
                          </Typography>
                        ))}
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        variant={tier.buttonVariant as "outlined" | "contained"}
                        style={{
                          backgroundColor: "mediumseagreen",
                        }}
                      >
                        {tier.buttonText}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </>
    );
  }
}
