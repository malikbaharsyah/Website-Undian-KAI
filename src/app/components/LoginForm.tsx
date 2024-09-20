import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "password123") {
      console.log("Login successful");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center mb-12">
          <img src="/images/logo.svg" alt="logo" className="w-[175px] h-[70px]" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
            <div className="w-full max-w-[304px] space-y-2">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="w-full max-w-[304px] space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full px-3 border rounded-md"
              />
            </div>
            <div className="w-full max-w-sm h-3">
              <p
                className={`text-red-500 text-center transition-all duration-300 ${error ? "opacity-100" : "opacity-0"}`}
              >
                {error}
              </p>
            </div>

            <Button
              type="submit"
              className="w-full max-w-[304px] bg-[#000072] text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
