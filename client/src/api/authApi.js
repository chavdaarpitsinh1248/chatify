const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

export async function registerUser(data) {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw result;

    return result;
}

export async function loginUser(data) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw result;

    return result;
}
