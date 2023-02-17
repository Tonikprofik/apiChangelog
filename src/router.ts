import { Router } from "express";
import { body, validationResult } from 'express-validator'
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
router.put("/update/:id", body('name'), body('updatesAt'),handleInputErrors, (req, res) => {
    
 });
router.post("/update", () => { });
router.delete("/update/:id", () => { });

// update point
router.get("/update-point", () => { });
router.get("/update-point/:id", body('name'), body('updatedAt'), handleInputErrors, (req, res) => { });
router.put("/update-point/:id", () => { });
router.post("/update-point", () => { });
router.delete("/update-point/:id", () => { });

export default router;