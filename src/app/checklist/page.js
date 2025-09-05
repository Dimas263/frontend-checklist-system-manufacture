"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChecklistPage() {
    /*const API_URL = "http://localhost:9090";*/
    /*const API_URL = "https://backend-checklist-system-manufactur.vercel.app";*/
    const [checklists, setChecklists] = useState([]);
    const [category, setCategory] = useState("machine");
    const [task, setTask] = useState("");
    const [token, setToken] = useState(null);

    const router = useRouter();

    // Suggestions untuk tiap kategori
    const taskSuggestions = {
        machine: [
            "Periksa level oli mesin",
            "Cek kebocoran pipa",
            "Bersihkan filter udara",
            "Lumasi bantalan (bearing)",
            "Tes fungsi pompa",
            "Periksa tekanan hidrolik",
            "Cek kondisi belt dan rantai",
            "Kalibrasi sensor mesin",
            "Periksa suhu motor",
            "Catat jam operasi mesin"
        ],
        produksi: [
            "Pantau kecepatan produksi",
            "Cek ketersediaan bahan baku",
            "Periksa hasil cetakan produk",
            "Pastikan line produksi bersih",
            "Cek setting mesin produksi",
            "Hitung output per shift",
            "Identifikasi downtime",
            "Verifikasi label produk",
            "Lakukan uji visual kualitas produk",
            "Pastikan proses sesuai SOP"
        ],
        engineering: [
            "Lakukan preventive maintenance",
            "Update dokumentasi mesin",
            "Periksa panel kontrol listrik",
            "Tes sensor otomatisasi",
            "Pantau sistem PLC, DCS, SCADA, PI System, MES",
            "Cek jaringan kabel",
            "Evaluasi desain alat",
            "Analisa konsumsi energi"
        ],
        quality: [
            "Periksa dimensi produk",
            "Cek kemasan dan label",
            "Uji kekuatan sampel",
            "Verifikasi barcode",
            "Lakukan inspeksi visual",
            "Tes warna produk",
            "Cek kelembaban produk",
            "Uji konsistensi berat",
            "Pastikan standar ISO terpenuhi",
            "Audit dokumentasi kualitas"
        ],
        environment: [
            "Periksa pembuangan limbah cair",
            "Cek filter udara pabrik",
            "Pastikan area kerja bersih",
            "Pantau konsumsi air",
            "Cek kebisingan lingkungan",
            "Hitung emisi karbon",
            "Verifikasi penggunaan energi",
            "Inspeksi area penghijauan",
            "Cek sistem daur ulang",
            "Audit kepatuhan lingkungan"
        ],
        safety: [
            "Periksa APD (Alat Pelindung Diri)",
            "Cek alat pemadam kebakaran",
            "Uji alarm darurat",
            "Pastikan jalur evakuasi bebas",
            "Cek tanda peringatan keselamatan",
            "Inspeksi tangga dan railing",
            "Uji sistem deteksi gas",
            "Simulasi prosedur evakuasi",
            "Cek pencahayaan area kerja",
            "Audit kepatuhan K3"
        ],
    };

    const [username, setUsername] = useState("");

    // Cek login token
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUsername = localStorage.getItem("username");
        if (!savedToken) {
            router.push("/login"); // redirect kalau belum login
        } else {
            setToken(savedToken);
            if (savedUsername) setUsername(savedUsername);
            fetchChecklists(savedToken);
        }
    }, [router]);

    // Fetch checklist dari backend
    const fetchChecklists = async (authToken) => {
        const res = await fetch(
            /*`${API_URL}/checklist`, */
            `/api/checklist`,
            {headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.ok) {
            const data = await res.json();
            setChecklists(data);
        }
    };

    // Tambah checklist
    const addChecklist = async (e) => {
        e.preventDefault();
        const res = await fetch(
            /*`${API_URL}/checklist`,*/
            `/api/checklist`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ category, task, status: "pending" }),
        });
        const newItem = await res.json();
        setChecklists([...checklists, newItem]);
        setTask("");
    };

    // Update status checklist
    const toggleStatus = async (id, currentStatus) => {
        const updatedStatus = currentStatus === "done" ? "pending" : "done";
        const item = checklists.find((c) => c.id === id);

        const res = await fetch(
            /*`${API_URL}/checklist`, */
            `/api/checklist`,
            {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...item, status: updatedStatus }),
            }
        );

        const updatedItem = await res.json();
        setChecklists(checklists.map((c) => (c.id === id ? updatedItem : c)));
    };

    // Hapus checklist
    const deleteChecklist = async (id) => {
        await fetch(
            /*`${API_URL}/checklist?id=${id}`, */
            `/api/checklist?id=${id}`,
            {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        setChecklists(checklists.filter((c) => c.id !== id));
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        /*router.push("/login");*/
        router.push("/");
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                    Checklist Management
                    {username && (
                        <span className="ml-3 text-sm text-gray-600">({username})</span>
                    )}
                </h1>
                <button
                    onClick={handleLogout}
                    className="bg-gray-300 text-black px-3 py-1 rounded"
                >
                    Logout
                </button>
            </div>

            {/* Form tambah checklist */}
            <form onSubmit={addChecklist} className="flex gap-2 mb-4" style={{ marginTop: "2.5rem" }}>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="machine">Machine</option>
                    <option value="produksi">Produksi</option>
                    <option value="engineering">Engineering</option>
                    <option value="quality">Quality</option>
                    <option value="environment">Environment</option>
                    <option value="safety">Safety</option>
                </select>

                <select
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="border p-2 rounded flex-1"
                >
                    <option value="">-- Pilih Task --</option>
                    {taskSuggestions[category].map((t, i) => (
                        <option key={i} value={t}>
                            {t}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-green-300 text-black p-2 rounded"
                    disabled={!task}
                >
                    ➕ Tambah
                </button>
            </form>

            {/* List checklist */}
            <ul className="space-y-2">
                {checklists.map((c) => (
                    <li
                        key={c.id}
                        className="flex justify-between items-center border p-2 rounded"
                    >
                        <span>
                          <strong>[{c.category}]</strong> {c.task} -{" "}
                            <em>{c.status}</em>
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleStatus(c.id, c.status)}
                                className={`px-2 py-1 rounded text-white ${
                                    c.status === "done" ? "bg-yellow-500" : "bg-teal-500"
                                }`}
                            >
                                {c.status === "done" ? "Mark as Pending" : "Mark as Done"}
                            </button>
                            <button
                                onClick={() => deleteChecklist(c.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Hapus
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
