import { User } from "@prisma/client";
import AuthenticatedPage from "../components/page-helpers/AuthenticatedPage";
import Header from "@/components/Header";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import React, { useEffect, useMemo, useState } from "react";
import MealCard from "@/components/mealCard";
import { set, z } from "zod";
import { dietSchema } from "@/utils/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function DietWrapper() {
  return (
    <AuthenticatedPage>{({ user }) => <Diet user={user} />}</AuthenticatedPage>
  );
}

type DietProps = {
  user: User;
};

type Diet = {
  id: string;
  name: string;
} & z.infer<typeof dietSchema>;

function Diet({ user }: DietProps) {
  const [dietId, setDietId] = useState<string | null>(null);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [isDietLoading, setIsDietLoading] = useState(false);
  const [dietName, setDietName] = useState("minha dieta");
  const [openCreate, setOpenCreate] = useState(false);

  const diet = useMemo<Diet | undefined>(() => {
    return diets.find((d) => d.id === dietId);
  }, [dietId, diets]);

  useEffect(() => {
    if (!diet) setDietId(diets[0]?.id);
  }, [diet, diets]);

  useEffect(() => {
    fetchDiets();
  }, []);

  const handleCreateDiet = async () => {
    setIsDietLoading(true);
    const newDiet = await fetch("/api/diet/create", {
      method: "POST",
      body: JSON.stringify({
        dietName: dietName,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => response.json());
    await fetchDiets();
    setDietId(newDiet.id);
    setIsDietLoading(false);
  };

  const handleDeleteDiet = async (id: string, name: string) => {
    if (!window.confirm(`Certeza que deseja deletar ${name}`)) return;
    await fetch("/api/diet/delete", {
      method: "POST",
      body: JSON.stringify({
        dietId: id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    fetchDiets();
  };

  const fetchDiets = async () => {
    const res = await fetch("/api/diet/list", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    setDiets(data);
  };

  return (
    <>
      <Header user={user} />
      <div className="content">
        <div>
          <Modal
            keepMounted
            open={openCreate}
            onClose={() => setOpenCreate(false)}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                bgcolor: "background.paper",
                border: "2px solid navy",
                borderRadius: "10px",
                boxShadow: 24,
                p: 4,
              }}
            >
              <TextField
                id="outlined-multiline-flexible"
                value={dietName}
                onChange={(e) => setDietName(e.target.value)}
                label="nome da dieta"
                sx={{ m: 1, width: "25ch" }}
              />
              <Button
                variant="contained"
                style={{
                  backgroundColor: "mediumseagreen",
                }}
                onClick={handleCreateDiet}
                disabled={isDietLoading}
                startIcon={
                  isDietLoading ? <CircularProgress size={20} /> : undefined
                }
              >
                criar dieta
              </Button>
            </Box>
          </Modal>
        </div>
        <Box
          sx={{
            Maxwidth: 900,
            marginBottom: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {diets?.map((diet) => (
            <div>
              <Chip
                sx={{
                  marginRight: 1,
                  border: 2,
                  borderColor: dietId === diet.id ? "#132F4C;" : "lightgray",
                }}
                label={diet.name}
                variant={"outlined"}
                onClick={() => setDietId(diet.id)}
                onDelete={() => handleDeleteDiet(diet.id, diet.name)}
              />
            </div>
          ))}
          <Tooltip title="criar dieta">
            <IconButton>
              <AddCircleIcon
                onClick={() => {
                  setOpenCreate(true);
                }}
                sx={{ color: "#132F4C;", fontSize: 35 }}
              />
            </IconButton>
          </Tooltip>
        </Box>
        {diet && (
          <Box
            sx={{
              display: "flex",
              maxWidth: 800,
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              overflow: "visible",
            }}
          >
            <MealCard
              name="Café da manhã"
              content={diet?.breakfast?.meal_content ?? ""}
              macros={`(proteina: ${diet?.breakfast.amount_of_protein}, carboidrato: ${diet?.breakfast.amount_of_carbohydrate}, fibra: ${diet?.breakfast.amount_of_fiber})`}
              image="/breakfast.png"
            />
            <MealCard
              name="Lanche 1"
              content={diet?.second.meal_content ?? ""}
              macros={`(proteina: ${diet?.second.amount_of_protein}, carboidrato: ${diet?.second.amount_of_carbohydrate}, fibra: ${diet?.second.amount_of_fiber})`}
              image="/snak.png"
            />
            <MealCard
              name="Almoço"
              content={diet?.lunch.meal_content ?? ""}
              macros={`(proteina: ${diet?.lunch.amount_of_protein}, carboidrato: ${diet?.lunch.amount_of_carbohydrate}, fibra: ${diet?.lunch.amount_of_fiber})`}
              image="/lunch.png"
            />
            <MealCard
              name="Lanche 2"
              content={diet?.fourth.meal_content ?? ""}
              macros={`(proteina: ${diet?.fourth.amount_of_protein}, carboidrato: ${diet?.fourth.amount_of_carbohydrate}, fibra: ${diet?.fourth.amount_of_fiber})`}
              image="/snak.png"
            />
            <MealCard
              name="Jantar"
              content={diet?.dinner.meal_content ?? ""}
              macros={`(proteina: ${diet?.dinner.amount_of_protein}, carboidrato: ${diet?.dinner.amount_of_carbohydrate}, fibra: ${diet?.dinner.amount_of_fiber})`}
              image="/lunch.png"
            />
            <MealCard
              name="Lanche 3"
              content={diet?.sixth.meal_content ?? ""}
              macros={`(proteina: ${diet?.sixth.amount_of_protein}, carboidrato: ${diet?.sixth.amount_of_carbohydrate}, fibra: ${diet?.sixth.amount_of_fiber})`}
              image="/snak.png"
            />
            <Card
              sx={{
                minWidth: 250,
                heigh: 250,
                margin: 1,
                padding: 0.5,
                overflow: "scroll",
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {diet?.comment}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}{" "}
        {!diet && <h3>Comece sua jornada crianto uma dieta no botão acima</h3>}
      </div>
    </>
  );
}
