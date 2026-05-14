import { Welcome } from "../welcome/welcome";

export function meta() {
  return [
    { title: "shopping list" },
    { name: "description", content: "Manage your shopping list" },
  ];
}

export default function Home() {
  return <Welcome />;
}
