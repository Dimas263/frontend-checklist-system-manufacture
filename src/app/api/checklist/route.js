import { NextResponse } from "next/server";

const BACKEND_URL = "https://backend-checklist-system-manufactur.vercel.app";

export async function GET(request) {
    try {
        const res = await fetch(`${BACKEND_URL}/checklist`);
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("GET Checklist Error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const res = await fetch(`${BACKEND_URL}/checklist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("POST Checklist Error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const res = await fetch(`${BACKEND_URL}/checklist`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("PUT Checklist Error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        const res = await fetch(`${BACKEND_URL}/checklist?id=${id}`, {
            method: "DELETE",
        });
        return NextResponse.json({}, { status: res.status });
    } catch (err) {
        console.error("DELETE Checklist Error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
