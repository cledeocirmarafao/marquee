import express from "express";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const port = 3000;
const app = express();

app.get("/movies", async (_req, res) => {
  const movies = await prisma.movies.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      genre: true,
      language: true,
    },
  });
  res.json(movies);
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port} `);
});
