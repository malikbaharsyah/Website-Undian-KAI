import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';
import Image from 'next/image';
import useFetchAPI from './hooks/fetchAPI';
import { useAlert } from './hooks/useAlert';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const fetchAPI = useFetchAPI();

    const { showAlert } = useAlert();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            showAlert("loading", null);
            const response = await fetchAPI('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nipp: username, password }),
            });

            const data = response;
            console.log(data.success)
            if (data.success) {
                showAlert("success", "Login successful.");
                localStorage.setItem('username', username);
                window.location.href = "/undian";
            } else {
                setError(data.message || 'Login failed.');
                showAlert("error", "Invalid Credentials");
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            showAlert("error", 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="flex items-center mb-12 mt-6">
                    <Image src="/images/logo.svg" alt="logo" className="w-[175px] h-[70px]" width={175} height={70} />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                    <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
                        <div className="w-full max-w-[304px] space-y-2">
                            <Input
                                type="text"
                                placeholder="NIPP"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="w-full max-w-[304px] space-y-2">
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="w-full max-w-sm h-3">
                            <p className={`text-red-500 text-center transition-all duration-300 ${error ? 'opacity-100' : 'opacity-0'}`}>
                                {error}
                            </p>
                        </div>
                        <Button type="submit" className="w-full max-w-[304px] bg-[#000072] text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
