import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useAuth } from "./AuthContext";

export default function Login({ onSwitch }) {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!form.email || !form.password) {
            return setError("All fields are required");
        }

        setError("");
        setLoading(true);

        try {
            const res = await loginUser({
                email: form.email.trim().toLowerCase(),
                password: form.password,
            });
            login(res);
        } catch (err) {
            setError(err.error || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Login</h2>

            <input
                placeholder="Email"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                onClick={submit}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center">
                No account?{" "}
                <button onClick={onSwitch} className="text-blue-600">
                    Register
                </button>
            </p>
        </div>
    );
}
