import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const endpt = "localhost:8000";
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const length = searchParams.get("length");
  try {
    const res = await fetch(
      `http://${endpt}/search?query=${query}&length=${length}`
    );
    if (res.ok) {
      const json_response = await res.json();
      const data = json_response.result;
      return NextResponse.json({ data });
    }
    return NextResponse.json({ error: "Failed to fetch" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
