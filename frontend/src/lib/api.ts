import axios from "axios";
import type { FormData, HiringCategory } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

export async function submitRequirement(data: FormData & { category: HiringCategory }) {
  const response = await api.post("/requirements", data);
  return response.data;
}

export async function getRequirements(category?: HiringCategory) {
  const params = category ? { category } : {};
  const response = await api.get("/requirements", { params });
  return response.data;
}

export default api;
