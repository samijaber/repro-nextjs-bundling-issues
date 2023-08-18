// This also breaks:
// import { Content } from "@repo/lib";
import { Content } from "../dist/index.mjs";

export default async function Home() {
  return <Content />;
}
