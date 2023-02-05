import { Router } from "express";

const router = Router();

// product
router.get("/product", () => {});
router.get("/product/:id", () => {});
router.put("/product/:id", () => {});
router.post("/product", () => {});
router.delete("/product/:id", () => {});

// update
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.delete("/update/:id", () => {});

// update point
router.get("/update-point", () => {});
router.get("/update-point/:id", () => {});
router.put("/update-point/:id", () => {});
router.post("/update-point", () => {});
router.delete("/update-point/:id", () => {});
