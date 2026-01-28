import { createFileRoute, Link } from '@tanstack/react-router'
import { useTodoStore } from '@/Store/Todostore'
export const Route = createFileRoute('/Dashboard')({
  component: RouteComponent,
})


function RouteComponent() {

 const { todos} = useTodoStore();
 return(
  <>
<header className='bg-black h-12'>
  <nav className='flex justify-end'>
    <ul className='mt-4 text-white flex justify-start gap-5'>
      <li><Link to="/todo">work</Link></li>
      <li><Link to="/Dashboard">Dashboard</Link></li>  
      <li><Link to="/">Home</Link></li>
    </ul>
  </nav>
</header>



<h1></h1>

<div className="w-full flex justify-center mt-12">
  <div className="bg-orange-600 border border-orange-800 rounded-xl shadow-lg px-12 py-6 flex items-center justify-center">
    <p className="text-3xl font-semibold tracking-wide text-white">
      Dashboard
    </p>
  </div>
</div>

<div className="flex justify-center items-center min-h-screen">
  <div className="bg-white rounded-2xl shadow-xl px-12 py-10 flex flex-col items-center gap-4 border">
    
    <p className="text-gray-500 text-sm uppercase tracking-wider">
      Total Tasks
    </p>

    <h1 className="text-5xl font-bold text-orange-600">
      {todos.length}
    </h1>

    <p className="text-gray-400 text-sm">
      Active works in your dashboard
    </p>

  
    <button className="bg-orange-600 text-white px-6 py-3 rounded-xl shadow-md">
      Click to the task
    </button>

  </div>
</div>

    <div>
    

      </div>



  </>
 )
}
