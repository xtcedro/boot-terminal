import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { send } from "https://deno.land/x/oak@v12.6.1/send.ts";


const router = new Router();


router.get("/", async (ctx) => {
  await send(ctx, "/public/pages/home/index.html", {
    root: Deno.cwd(),
    index: "index.html",
  });
});


console.log("\x1b[32m%s\x1b[0m", "\n✅ All API routes successfully registered.");
console.log("\x1b[33m%s\x1b[0m", "🚀 Your framework is modular, future-ready, and thriving.\n");


export default router;
