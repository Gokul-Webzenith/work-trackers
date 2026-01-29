import { createFileRoute } from '@tanstack/react-router'
import {ChartBar} from '@/components/ui/ChartBar'
export const Route = createFileRoute('/Dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
   <>
<ChartBar>

</ChartBar>
</>
  )
}
