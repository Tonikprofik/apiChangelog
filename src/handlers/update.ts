import prisma from "../db";

// get all updates
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
        belongsToId: req.user.id,
      },
      include: {
          updates: true,
      }
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

        }
    })
    res.json({data: update})
};

export const createUpdate = async (req, res) => {};

export const updateUpdate = async (req, res) => {
  const updated = await prisma.update.update({
    where: {
      id: req.params.id,
      status: req.params.status,
    },
    data: {
      status: req.body.status,
    },
  });
  res.json({ data: updated });
};

export const deleteUpdate = async (req, res) => { }
