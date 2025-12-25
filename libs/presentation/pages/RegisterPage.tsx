import RegisterForm from "@/libs/presentation/pages/views/RegisterForm";

export default async function RegisterPage() {
    return (
        <main className="mx-auto max-w-md p-6">
            <h1 className="text-2xl font-semibold">Create account</h1>
            <RegisterForm/>
        </main>
    );
}
