/**
 * Copies the Prisma query engine binary from the custom output path
 * into node_modules/.prisma/client/ so Vercel's Lambda bundler includes it.
 *
 * Prisma with a custom `output` path generates the native binary outside
 * node_modules. Vercel does not automatically bundle files outside node_modules,
 * so this script copies the binary to the standard fallback location that
 * Prisma always searches and that Vercel always includes in Lambda bundles.
 */
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "lib", "generated", "prisma");
const dst = path.join(__dirname, "..", "node_modules", ".prisma", "client");

fs.mkdirSync(dst, { recursive: true });

const engines = fs
  .readdirSync(src)
  .filter((f) => f.endsWith(".node") || f.endsWith(".so.node"));

if (engines.length === 0) {
  console.log("No Prisma engine binaries found in", src);
} else {
  for (const file of engines) {
    fs.copyFileSync(path.join(src, file), path.join(dst, file));
    console.log(`Copied Prisma engine: ${file} → node_modules/.prisma/client/`);
  }
}
