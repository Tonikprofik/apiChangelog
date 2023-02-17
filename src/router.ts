import { Router } from "express";
import { body, oneOf, validationResult } from 'express-validator'
import { handleInputErrors } from "./modules/middleware";

const router = Router();

// product
router.get("/product", (req, res) => {
    res.status(200);
    res.json({ message: "helyo /product bro" });
});
router.get("/product/:id", () => { });
router.put("/product/:id", body('name').isString(), (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
});

router.post("/product", (req, res) => { });
router.delete("/product/:id", () => { });

// update
router.get("/update", () => { });
router.get("/update/:id", () => { });
router.put("/update/:id",
    body('title').optional(),
    body('body').optional(), body('status').isIn(['IN_PROGRESS',
    'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(), handleInputErrors, (req, res) => {
    
 });
router.post("/update",
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
 () => { });
router.delete("/update/:id", () => { });

// update point
router.get("/update-point", () => { });
router.get("/update-point/:id",
    
     handleInputErrors, (req, res) => { });
router.put("/update-point/:id",
    body('name').optional().isString(),
    body('description').optional().isString(), () => { });
router.post("/update-point",
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(), () => { });
router.delete("/update-point/:id", () => { });

export default router;