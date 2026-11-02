import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  if (!token) {
    return null;
  }

  // Verify token with your auth provider
  // const user = await verifyToken(token.value);
  // return user;

  return { token: token.value };
}

export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}