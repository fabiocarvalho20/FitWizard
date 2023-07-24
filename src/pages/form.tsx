import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import { User, UserInput } from "@prisma/client";

export default function FormPageWrapper() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/sign-in");
    }
  }, [status]);

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <CircularProgress className="!w-1/12" />
      </div>
    );
  }

  return <FormPage user={session.user} />;
}

type FormData = Omit<UserInput, "id" | "userId" | "createdAt" | "updatedAt">;

type FormPageProps = {
  user: User & { input: UserInput | null };
};

function FormPage({ user }: FormPageProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    goal: user.input?.goal ?? "",
    age: user.input?.age ?? "",
    fatMass: user.input?.fatMass ?? "",
    gender: user.input?.gender ?? "",
    heigth: user.input?.heigth ?? "",
    muscleMass: user.input?.muscleMass ?? "",
    tmb: user.input?.tmb ?? "",
    visceralFat: user.input?.visceralFat ?? "",
    weigth: user.input?.weigth ?? "",
  });

  const handleChange =
    (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((formData) => ({
        ...formData,
        [key]: e.target.value,
      }));
    };

  const handleCreateForm = async () => {
    const response = await fetch("/api/form/create", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });
    setFormData;
    if (response.ok) {
      redirect("/");
    }
  };

  return (
    <>
      <Header user={user} />
      <div className="content">
        <div>
          <Button onClick={() => setOpen(true)}>saiba mais</Button>
          <Modal
            keepMounted
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                minWidth: 325,
                maxWidth: 600,
                bgcolor: "background.paper",
                border: "2px solid navy",
                borderRadius: "10px",
                boxShadow: 24,
                p: 4,
              }}
            >
              Com base nas informações fornecidas no formulário, criaremos uma
              dieta e uma rotina de treino personalizadas para te ajudar a
              alcançar seus objetivos. Embora apenas os campos com um asterisco
              ao lado sejam obrigatórios, quanto mais informações fornecidas,
              mais preciso será o programa desenvolvido para você. Para obter
              dados mais detalhados, recomendamos realizar um exame de
              bioimpedância, que está amplamente disponível em farmácias e
              academias de rede.
            </Box>
          </Modal>
        </div>
        <Box
          sx={{
            maxWidth: 900,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            id="outlined-multiline-flexible"
            value={formData.goal}
            onChange={handleChange("goal")}
            label="seu objetivo *"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />{" "}
          <TextField
            label="idade *"
            value={formData.age}
            onChange={handleChange("age")}
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
          <TextField
            label="gênero biológico *"
            value={formData.gender}
            onChange={handleChange("gender")}
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
          <TextField
            label="altura *"
            value={formData.heigth}
            onChange={handleChange("heigth")}
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
          />
          <TextField
            label="peso *"
            value={formData.weigth}
            onChange={handleChange("weigth")}
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
          />
          <TextField
            label="taxa de metabolismo basal"
            value={formData.tmb}
            onChange={handleChange("tmb")}
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">kcal</InputAdornment>
              ),
            }}
          />
          <TextField
            label="massa gorda"
            value={formData.fatMass}
            onChange={handleChange("fatMass")}
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
          />
          <TextField
            label="massa muscular"
            value={formData.muscleMass}
            onChange={handleChange("muscleMass")}
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
          />
          <TextField
            label="hidratação"
            value={formData.visceralFat}
            onChange={handleChange("visceralFat")}
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          onClick={handleCreateForm}
          sx={{ margin: 2 }}
          variant="outlined"
        >
          Enviar
        </Button>
      </div>
    </>
  );
}
