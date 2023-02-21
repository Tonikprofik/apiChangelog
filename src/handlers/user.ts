import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.create({
      data: {
        username,
        password: await hashPassword(password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await comparePassword(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = createJWT(user);
  res.json({ token });
};
