import LoginForm from "@/libs/presentation/pages/views/LoginForm";

export default async function LoginPage() {
    return (
        <main className="mx-auto max-w-md p-6">
            <h1 className="text-2xl font-semibold">Login</h1>
            <LoginForm/>
        </main>
    );
}
