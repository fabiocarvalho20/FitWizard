import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const diets = await prisma.diet.findMany();
  const formattedDiets = diets.map((d) => {
    const parsedDiet = JSON.parse(d.diet as string);
    return { ...d, ...parsedDiet, diet: undefined };
  });

  return res.status(200).json(formattedDiets);
}
