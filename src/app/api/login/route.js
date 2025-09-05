// app/api/login/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();

    const res = await fetch("https://backend-checklist-system-manufactur.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
