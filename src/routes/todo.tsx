import { useTodoStore } from "@/Store/Todostore";
import { createFileRoute } from '@tanstack/react-router'
import { useInputStore } from "@/Store/Input";
import { Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute('/todo')({
  component: RouteComponent,
})

function RouteComponent() {
 const { todos,add,del,toggle} = useTodoStore();
const {input,setInput,clearInput}=useInputStore();
    return (

    
    <>
    <div className="bg-black h-12">
      <nav className='flex justify-end'>
          <ul className='mt-4 text-white flex justify-start gap-5'>
         <li> <Link to ="/todo">work</Link></li>
         <li><Link to ="/Dashboard">Dashboard</Link>   </li>  
         <li><Link to ="/">Home</Link></li>
          </ul>
        </nav>
   </div>

  

<div className="min-h-screen bg-gray-100 flex justify-center items-center">
  <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10">

    
    <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
      Enter your work for today
    </h1>

    <div className="flex gap-3 mb-8">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter any task"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      />

      <button
        onClick={() => {
          add(input);
          clearInput();
        }}
        className="px-6 py-3 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition font-semibold"
      >
        Add
      </button>
    </div>

    {/* Todo List */}
    <div className="space-y-4">
      {todos.map((t) => (
        <div
          key={t.id}
          className="flex items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl shadow-sm hover:bg-gray-900 hover:text-white transition"
        >
          <input
          placeholder="enter your work"
            type="checkbox"
            checked={t.done}
            onChange={() => toggle(t.id)}
            className="w-5 h-5 cursor-pointer accent-fuchsia-600"
          />

          <h1 className={`flex-1 text-lg font-medium ${t.done ? "line-through opacity-60" : ""}`}>
            {t.text}
          </h1>

          <button
            onClick={() => del(t.id)}
            aria-label="delete the task"
            className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <Trash2 />
          </button>
        </div>
      ))}
    </div>

  </div>
</div>

    </>
    )
   
}
