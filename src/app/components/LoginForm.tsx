import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoginForm() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-[436px]">
        <CardHeader className="flex justify-center items-center mb-12">
          <img
            src="images/logo.svg"
            alt="logo"
            className="w-[175px] h-[70px]"
          />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <Button className="w-full bg-[#000072] text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
