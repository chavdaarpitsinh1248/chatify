import { useState } from "react";
import { registerUser } from "../api/authApi";

export default function Register({ onSwitch }) {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!form.username || !form.email || !form.password) {
            return setError("All fields are required");
        }

        setError("");
        setLoading(true);

        try {
            await registerUser({
                username: form.username.trim(),
                email: form.email.trim().toLowerCase(),
                password: form.password,
            });

            onSwitch(); // go to Login on success
        } catch (err) {
            setError(err.error || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Register</h2>

            <input
                placeholder="Username"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

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
                className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
            >
                {loading ? "Creating account..." : "Register"}
            </button>

            <p className="text-sm text-center">
                Already have an account?{" "}
                <button onClick={onSwitch} className="text-blue-600">
                    Login
                </button>
            </p>
        </div>
    );
}
