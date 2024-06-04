import type { APIRoute } from "astro";

export interface Env {
  DB: D1Database;
}
type payload = {
      firstName: string,
      lastName: string,
      tel: string
    }
export const POST: APIRoute = async (context) => {
  const contentType = context.request.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    
    const data = await context.request.json<payload>();
    const dbCall = (await context.locals.runtime.env.DB
      .prepare('INSERT INTO Interests (first_name, last_name, moblie) VALUES (?1, ?2, ?3)')
      .bind( data.firstName, data.lastName, data.tel ).run()).meta;
    //locals.runtime.env.DB
    return new Response(JSON.stringify({
        test: dbCall
      })
    )
  } else {
    return new Response(null, { status: 400 });
  }
}