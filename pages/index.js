import { AddTodo } from "../components/AddTodo";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-[#000428] to-[#004e92] min-h-screen">
      <AddTodo />
    </div>
  );
}
