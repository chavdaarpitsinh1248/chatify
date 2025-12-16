import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useAuth } from "./AuthContext";

export default function Register() {
    const { login } = useAuth();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const submit = async () => {
        const data = await registerUser(form);
        if (data.token) login(data);
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="p-6 border rounded-lg w-80 space-y-3">
                <h2 className="text-xl font-semibold">Create Account</h2>

                <input
                    placeholder="Useername"
                    className="input"
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <input
                    placeholder="Email"
                    className="input"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button onClick={submit} className="btn-primary w-full">
                    Register
                </button>
            </div>
        </div>
    );
}