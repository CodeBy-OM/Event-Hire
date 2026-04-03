const express = require("express");
const router = express.Router();
const Requirement = require("../models/Requirement");

// POST /api/requirements — Create a new requirement
router.post("/", async (req, res) => {
  try {
    const { category, eventBasics, plannerDetails, performerDetails, crewDetails } = req.body;

    if (!category || !eventBasics) {
      return res.status(400).json({ error: "category and eventBasics are required" });
    }

    // Validate that the category-specific details are present
    if (category === "planner" && !plannerDetails) {
      return res.status(400).json({ error: "plannerDetails required for category 'planner'" });
    }
    if (category === "performer" && !performerDetails) {
      return res.status(400).json({ error: "performerDetails required for category 'performer'" });
    }
    if (category === "crew" && !crewDetails) {
      return res.status(400).json({ error: "crewDetails required for category 'crew'" });
    }

    const requirement = new Requirement({
      category,
      eventBasics,
      plannerDetails: category === "planner" ? plannerDetails : undefined,
      performerDetails: category === "performer" ? performerDetails : undefined,
      crewDetails: category === "crew" ? crewDetails : undefined,
    });

    await requirement.save();

    res.status(201).json({
      success: true,
      message: "Requirement posted successfully",
      data: requirement,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/requirements — List all requirements (optionally filter by category)
router.get("/", async (req, res) => {
  try {
    const { category, status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const total = await Requirement.countDocuments(filter);
    const requirements = await Requirement.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: requirements,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/requirements/:id — Get single requirement
router.get("/:id", async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);
    if (!requirement) return res.status(404).json({ error: "Not found" });
    res.json({ success: true, data: requirement });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/requirements/:id
router.delete("/:id", async (req, res) => {
  try {
    await Requirement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
