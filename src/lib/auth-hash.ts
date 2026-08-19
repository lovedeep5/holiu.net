/**
 * Supabase's admin.generateLink() always produces implicit-flow links
 * (tokens in the URL hash), but this project's browser client
 * (@supabase/ssr's createBrowserClient) is hardcoded to flowType: "pkce",
 * which refuses to parse implicit-flow hashes on its own. Pages that land
 * from one of our emailed auth links must pull the tokens out of the hash
 * themselves and hand them to supabase.auth.setSession() directly.
 */
export function extractHashTokens(): { access_token: string; refresh_token: string } | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : window.location.hash;
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const access_token = params.get("access_token");
  const refresh_token = params.get("refresh_token");
  if (!access_token || !refresh_token) return null;
  return { access_token, refresh_token };
}
