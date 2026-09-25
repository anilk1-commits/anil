import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const hash = searchParams.get("hash");

        console.log("-> API İstegi Gelen Hash:", hash);

        if (!hash) {
            return NextResponse.json({ error: "Hash bulunamadı" }, { status: 400 });
        }

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "u656783676_uniquemanifest",
        });

        console.log("-> Veritabanına bağlandı, sorgu çalıştırılıyor...");

        const [rows]: any = await connection.execute(
            "SELECT name, intention FROM Seal WHERE hashOutput = ?",
            [hash]
        );

        await connection.end();

        console.log("-> Sorgu sonucu:", rows);

        if (!rows || rows.length === 0) {
            return NextResponse.json({ error: "Kayıt bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({
            name: rows[0].name,
            intention: rows[0].intention,
        });
    } catch (err: any) {
        console.error("-> KRİTİK VERİTABANI HATASI:", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}