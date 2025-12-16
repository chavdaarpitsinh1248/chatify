import { useState } from "react";
import { registerUser } from "../api/authApi";

export default function Register({ onSwitch }) {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const submit = async () => {
        await registerUser(form);
        onSwitch();
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

            <button onClick={submit} className="w-full bg-green-600 text-white py-2 rounded">
                Register
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
