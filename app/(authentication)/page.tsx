import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="bg-tertiary flex min-h-full flex-col justify-center sm:py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <AuthForm />
      </div>
    </div>
  );
}
