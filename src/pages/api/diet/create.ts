import openai from "@/utils/openai";
import { AuthOptions, getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import z from "zod";
import { dietSchema } from "@/utils/types";
import { list } from "postcss";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await getServerSession(req, res, authOptions as AuthOptions);

  const { dietName } = req.body;
  let diet = null;
  let strDiet = null;

  if (session) {
    for (let i = 0; i < 10; i++) {
      try {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `você é um renomado nutricionista, crie uma dieta para uma pessoa do gênero ${session?.user.input?.gender} com o objetivo de ${session?.user.input?.goal}, ${session?.user.input?.age} anos de idade, que pesa ${session?.user.input?.weigth}kg, tem ${session?.user.input?.heigth}cm de altura. Retorne o output nesse formato JSON {{breakfast: meal_content, amount_of_protein, amount_of_carbohydrate,  amount_of_fiber }, {second: meal_content, amount_of_protein, amount_of_carbohydrate, amount_of_fiber}, {lunch: meal_content, amount_of_protein, amount_of_carbohydrate, amount_of_fiber }, {fourth: meal_content, amount_of_protein, amount_of_carbohydrate, amount_of_fiber}, {dinner: meal_content, amount_of_protein, amount_of_carbohydrate, amount_of_fiber}, {sixth: meal_content, amount_of_protein, amount_of_carbohydrate, amount_of_fiber}, {comment: explain why this diet will help achieve the person's goal }}. Return only the JSON, nothing else, the content of the diet should be in portuguese.`,
            },
          ],
        });
        diet = JSON.parse(completion.data.choices[0].message.content);
        dietSchema.parse(diet);
        strDiet = JSON.stringify(diet);
        console.log(strDiet);
        break;
      } catch {}
    }
  } else return res.status(404).json({ ok: "false" });

  if (!diet) return res.status(500).json({ ok: "false" });

  await prisma.diet.create({
    data: {
      user: {
        connect: {
          id: session.user.id,
        },
      },
      diet: strDiet ?? "",
      name: dietName,
    },
  });

  res.status(200).json(diet);
}
