import { hashSync } from "bcrypt-ts-edge/node";

async function main() {
  console.log(hashSync("12345", 10));
}

main();
