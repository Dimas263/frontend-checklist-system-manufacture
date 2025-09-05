import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">
                Checklist System
            </h1>
            <div className="mb-6 text-gray-700 text-center">
                Selamat datang di sistem checklist manufaktur <br />
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {[
                        { label: "Machine", color: "bg-gray-300" },
                        { label: "Produksi", color: "bg-gray-300" },
                        { label: "Engineering", color: "bg-gray-300" },
                        { label: "Quality", color: "bg-gray-300" },
                        { label: "Environment", color: "bg-gray-300" },
                        { label: "Safety", color: "bg-gray-300" },
                    ].map((cat, i) => (
                        <span
                            key={i}
                            className={`${cat.color} text-gray-600 px-3 py-1 rounded-full text-sm`}
                            style={{fontSize: "12px" }}
                        >
        {cat.label}
      </span>
                    ))}
                </div>
                <br />
                Silakan pilih menu di bawah ini:
            </div>


            <div className="grid gap-4 w-full max-w-sm">
                <Link
                    href="/checklist"
                    className="rounded-lg bg-white shadow p-4 hover:bg-blue-100 text-center"
                >
                    📋 Manage Checklist (CRUD)
                </Link>
                <Link
                    href="/login"
                    className="rounded-lg bg-white shadow p-4 hover:bg-green-100 text-center"
                >
                    🔑 Login (Authentication)
                </Link>
            </div>
        </main>
    );
}
