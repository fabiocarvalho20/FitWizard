import { AuthOptions, getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import { use } from "react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions as AuthOptions);

  if (!session?.user) {
    return res.status(401).json({ ok: false });
  }

  const {
    goal,
    age,
    gender,
    heigth,
    weigth,
    tmb,
    fatMass,
    muscleMass,
    visceralFat,
  } = req.body;

  if (!goal || !age || !gender || !heigth || !weigth) {
    return res.status(400).json({ ok: false, message: "Invalid request body" });
  }

  if (!session.user.input) {
    await prisma.userInput.create({
      data: {
        age,
        gender,
        goal,
        heigth,
        weigth,
        fatMass,
        muscleMass,
        visceralFat,
        tmb,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } else {
    await prisma.userInput.update({
      where: {
        userId: session.user.id,
      },
      data: {
        age,
        gender,
        goal,
        heigth,
        weigth,
        fatMass,
        muscleMass,
        visceralFat,
        tmb,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  }

  res.status(200).json({ ok: true });
}
