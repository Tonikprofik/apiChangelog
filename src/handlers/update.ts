import prisma from "../db";

// get all updates
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      id: req.body.productId,
    },
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      Product: { connect: { id: product.id } },
    },
  });
  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = product.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    res.json({ message: "Update not found" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = product.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    res.json({ message: "Update not found" });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: deleted });
};
