import express from "express";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const port = 3000;
const app = express();

app.use(express.json());

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

app.post("/movies", async (req, res) => {
  const { title, genre_id, language_id, oscar_count, release_date } = req.body;

  try {
    await prisma.movies.create({
      data: {
        title,
        genre_id,
        language_id,
        oscar_count,
        release_date: new Date(release_date),
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Ocorreu um erro ao tentar criar um filme." });
  }

  res.status(201).send();
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port} `);
});
