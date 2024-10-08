import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';   
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginForm() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nipp: username, password }),
    });

    const data = await response.json();
    if (data.success) {
        localStorage.setItem('username', username);
        router.push('/lottery');
    } else {
        setError(data.message);
    }

    } catch (err) {
    setError('Something went wrong. Please try again.');
    }
};

return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100">
    <Card className="w-full max-w-md">
        <CardHeader className="flex items-center mb-12 mt-6">
        <Image src="/images/logo.svg" alt="logo" className="w-[175px] h-[70px]" width={175} height={70}/>
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
                className="w-full px-3 border rounded-md"
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