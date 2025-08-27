const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export async function api<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(opts.headers || {}),
  };
  const res = await fetch(`${API_URL}${path}`, { ...opts, headers });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || res.statusText);
  }
  return (await res.json()) as T;
}

// ======================
// Workshops API
// ======================

export async function getWorkshops() {
  return api<
    {
      id: number;
      title: string;
      description: string;
      capacity: number;
      availableSlots: number;
    }[]
  >("/workshops");
}
