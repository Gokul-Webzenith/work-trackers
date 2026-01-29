import { createFileRoute } from '@tanstack/react-router'
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute('/_Dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <>
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">

    
        <h1 className="text-4xl font-bold">Work Tracker</h1>

        <p className="text-gray-500 text-lg">
          This is a work tracker
        </p>

        
        <div className="flex justify-center gap-4 pt-4">
          <Link to="/work">
            <Button>Work</Button>
          </Link>

          <Link to="/dash">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>

      </div>
    </div>
    
  

    </>

  );
  
}
