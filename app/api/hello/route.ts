import { NextRequest, NextResponse } from "next/server";

// This function will handle GET requests to /api/hello
export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page");

  const data = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
    { id: 4, col1: "Next.js", col2: "is Amazing" },
    { id: 5, col1: "React", col2: "is Amazing" },
    { id: 6, col1: "Vercel", col2: "is Amazing" },
    { id: 7, col1: "Tailwind", col2: "is Amazing" },
    { id: 8, col1: "TypeScript", col2: "is Amazing" },
    { id: 9, col1: "GraphQL", col2: "is Amazing" },
    { id: 10, col1: "Apollo", col2: "is Amazing" },
    { id: 11, col1: "Prisma", col2: "is Amazing" },
    { id: 12, col1: "PostgreSQL", col2: "is Amazing" },
    { id: 13, col1: "MongoDB", col2: "is Amazing" },
    { id: 14, col1: "Firebase", col2: "is Amazing" },
    { id: 15, col1: "Supabase", col2: "is Amazing" },
    { id: 16, col1: "Hasura", col2: "is Amazing" },
    { id: 17, col1: "Netlify", col2: "is Amazing" },
    { id: 18, col1: "AWS", col2: "is Amazing" },
    { id: 19, col1: "Azure", col2: "is Amazing" },
    { id: 20, col1: "Google Cloud", col2: "is Amazing" },
  ];

  if (page) {
    const perPage = 5;
    const start = (parseInt(page) - 1) * perPage;
    const end = start + perPage;
    return new NextResponse(
      JSON.stringify({
        data: data.slice(start, end),
        totalPages: Math.ceil(data.length / perPage),
      }),
      { status: 200 }
    );
  }

  return new NextResponse(
    JSON.stringify({ data, totalPages: data?.length || 0 }),
    { status: 200 }
  );
}

// This function will handle POST requests to /api/hello
export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ message: `Hello, ${body.name}!` });
}
