import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
   <div className="flex flex-col justify-center items-center gap-10 h-screen">


    <h1>Work tracker application of tracking all the works </h1>

  <Link to ="/todo"><Button>Work</Button></Link>
 <Link to ="/Dashboard" ><Button>Dashboard</Button></Link>
</div>

    </>
  )
}



