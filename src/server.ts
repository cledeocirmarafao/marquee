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
    const existingMovie = await prisma.movies.findFirst({
      where: { title: { equals: title, mode: "insensitive" } },
    });

    if (existingMovie) {
      return res
        .status(409)
        .json({ message: "Esse título já está cadastrado" });
    }

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
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao tentar criar um filme." });
  }

  res.status(201).send();
});

app.put("/movies/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const movie = await prisma.movies.findUnique({
      where: {
        id,
      },
    });

    if (!movie) {
      return res.status(404).json("Filme não localizado no Banco de Dados");
    }

    const data = { ...req.body };
    data.release_date = data.release_date
      ? new Date(data.release_date)
      : undefined;

    await prisma.movies.update({
      where: {
        id,
      },
      data: data,
    });
  } catch (err) {
    return res.status(500).json("Falha ao atualizar o registro do filme");
  }

  res.status(200).send();
});

app.delete("/movies/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const movie = await prisma.movies.findUnique({ where: { id } });

    if (!movie) {
      return res.status(404).json("O filme não foi encontrado");
    }

    await prisma.movies.delete({ where: { id } });
  } catch (err) {
    return res.status(500).json("Ocorreu um erro ao realizar a solicitação");
  }

  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port} `);
});
