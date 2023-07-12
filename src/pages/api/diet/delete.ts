import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { dietId } = req.body;

  await prisma.diet.delete({
    where: {
      id: dietId,
    },
  });

  res.status(200).json("deleted");
}
