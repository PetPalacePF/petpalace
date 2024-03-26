import { Card } from "./Card";

export default function Cards() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start my-5">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
