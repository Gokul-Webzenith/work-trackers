import { createFileRoute, Link } from '@tanstack/react-router'
import { useTodoStore } from '@/Store/Todostore'
export const Route = createFileRoute('/Dashboard')({
  component: RouteComponent,
})


function RouteComponent() {

 const { todos} = useTodoStore();
 return(
  <header className='bg-black h-12'>
    <nav className='flex justify-end'>
      <ul className='mt-4 text-white flex justify-start gap-5'>
     <li> <Link to ="/todo">work</Link></li>
     <li><Link to ="/Dashboard">Dashboard</Link>   </li>  
     <li><Link to ="/">Home</Link></li>


    
      </ul>


    </nav>
<h1></h1>
<h1 className='flex justify-center items-center h-screen'>`Total works:{todos.length ?todos.length :0}`</h1>
     
  </header>
 )
}
