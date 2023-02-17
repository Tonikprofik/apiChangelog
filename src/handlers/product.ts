import prisma from '../db'


//get all products
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }, include: {
            product: true
        }
    })
    res.json({data: user.product })
}

//get one by id
export const getProduct = async (req, res) => { 
    const product = await prisma.product.findFirst({
        where: {
            id: req.params.id,
            belongsToId: req.user.id
        }
    })
    res.json({ data: product})
}

// create product
export const createProduct = async (req, res) => { 
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id
        }
    })
    res.json({ data: product})
}

// update product
export const updateProduct = async (req, res) => { 
    const updated = await prisma.product.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name
        }
    })
    res.json({data: updated})
}

// delete product
export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    })
    res.json({data: deleted})
}