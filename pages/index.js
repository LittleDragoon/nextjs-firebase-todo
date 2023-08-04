import { AddTodo } from "../components/AddTodo";
import { Auth } from "../components/Auth";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-[#000428] to-[#004e92] min-h-screen">
      <div className="font-semibold text-4xl py-4 font-bold text-gray-200">
        Welcome to your TO DO list
      </div>
      <Auth />
      <AddTodo />
    </div>
  );
}
