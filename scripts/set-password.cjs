const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// Read .env.local manually
const envRaw = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
const env = Object.fromEntries(
  envRaw
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .map((l) => l.split("=", 2).map((s) => s.trim()))
);

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

(async () => {
  const { data: list, error: listErr } = await supabase.auth.admin.listUsers();
  if (listErr) { console.error("List error:", listErr.message); return; }
  const user = list.users.find((u) => u.email === "lovedeep5.abh@gmail.com");
  if (!user) { console.error("User not found"); return; }
  const { error } = await supabase.auth.admin.updateUserById(user.id, {
    password: "Automation@99",
  });
  if (error) console.error("Error:", error.message);
  else console.log("Password updated for", user.email);
})();