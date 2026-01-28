import { useTodoStore } from "@/Store/Todostore";
import { createFileRoute } from '@tanstack/react-router'
import { useInputStore } from "@/Store/Input";
import { Link } from "@tanstack/react-router";

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

  


    <div  className='flex flex-col gap-6 items-center justify-center h-screen '> <div>
        <h1 className=" text-4xl text-fuchsia-800 mb-9"> Enter your work for today:</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="enter any task"
      className="flex-1 px-4 py-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <button
        onClick={() => {
        add(input);
        clearInput()
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        
      >
        Add
      </button>
    </div>
      <div className="w-full max-w-md space-y-4">
       {todos.map((t) => (
        <div key={t.id} className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-md  hover:bg-gray-900 hover:text-white transition">
                <input
                  type="checkbox"
                  placeholder="enter any task"
                  checked={t.done}
                  onChange={() => toggle(t.id)}
                  className="w-6 h-6 cursor-pointer"
                />
          <h1 className={`text-lg font-semibold ${t.done? "line-through" : "no-underline"}`}>
          {t.text}
          </h1>
          <button onClick={() => del(t.id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition">❌</button>
        </div>
      ))}
    </div>



    </div>
    </>
    )
   
}
