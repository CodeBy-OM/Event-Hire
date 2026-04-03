const mongoose = require("mongoose");

// ─── Event Basics (Step 1) ───────────────────────────────────────────────────
const eventBasicsSchema = new mongoose.Schema({
  eventName: { type: String, required: true, trim: true },
  eventType: {
    type: String,
    required: true,
    enum: ["Wedding", "Corporate", "Birthday", "Concert", "Festival", "Conference", "Other"],
  },
  dateType: { type: String, enum: ["single", "range"], default: "single" },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  location: { type: String, required: true, trim: true },
  venue: { type: String, trim: true },
  hiringFor: {
    type: String,
    required: true,
    enum: ["planner", "performer", "crew"],
  },
});

// ─── Planner Fields (Steps 2 & 3) ───────────────────────────────────────────
const plannerSchema = new mongoose.Schema({
  plannerType: {
    type: String,
    enum: ["Full-Service", "Day-Of", "Partial", "Destination"],
  },
  guestCount: { type: Number },
  budget: { type: String },
  servicesNeeded: [{ type: String }],
  experienceRequired: { type: String },
  additionalNotes: { type: String },
  urgency: { type: String, enum: ["Flexible", "Within 1 week", "ASAP"] },
  preferredContactMethod: { type: String, enum: ["Email", "Phone", "WhatsApp"] },
});

// ─── Performer Fields (Steps 2 & 3) ─────────────────────────────────────────
const performerSchema = new mongoose.Schema({
  performerType: {
    type: String,
    enum: ["Band", "DJ", "Solo Artist", "Dancer", "Comedian", "Magician", "Speaker", "Other"],
  },
  genre: { type: String },
  performanceDuration: { type: String },
  numberOfPerformers: { type: Number },
  equipmentProvided: { type: Boolean, default: false },
  budgetRange: { type: String },
  specialRequirements: { type: String },
  previousExperience: { type: String },
  preferredStyle: { type: String },
});

// ─── Crew Fields (Steps 2 & 3) ───────────────────────────────────────────────
const crewSchema = new mongoose.Schema({
  crewType: {
    type: String,
    enum: ["AV Technician", "Stage Manager", "Lighting", "Sound", "Photography", "Videography", "Security", "Catering", "Usher", "Other"],
  },
  numberOfCrewNeeded: { type: Number },
  shiftDuration: { type: String },
  experienceLevel: { type: String, enum: ["Entry", "Mid", "Senior", "Expert"] },
  certificationsRequired: [{ type: String }],
  equipmentFamiliarity: { type: String },
  budgetPerPerson: { type: String },
  uniformRequired: { type: Boolean, default: false },
  briefingTime: { type: String },
});

// ─── Top-level Requirement ───────────────────────────────────────────────────
const requirementSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["planner", "performer", "crew"],
      index: true,
    },
    status: {
      type: String,
      enum: ["draft", "active", "closed"],
      default: "active",
    },
    eventBasics: { type: eventBasicsSchema, required: true },
    plannerDetails: { type: plannerSchema },
    performerDetails: { type: performerSchema },
    crewDetails: { type: crewSchema },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Requirement", requirementSchema);
