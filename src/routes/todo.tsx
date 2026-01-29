import { createFileRoute, } from '@tanstack/react-router'
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button';
import { useTodoStore } from "@/Store/Todostore"; 
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";



type FormData = {
  status: "progress" | "done";
  text: string;
  date: string;
};

export const Route = createFileRoute('/todo')({
  component: RouteComponent,
})

function RouteComponent() {

const {items,updateStatus,addItem}=useTodoStore();

const progressItems = items.filter(item => item.status === "progress");
const doneItems = items.filter(item => item.status === "done");

  const { register, handleSubmit, reset } = useForm<FormData>();


const onDragStart = (e: React.DragEvent, id: number) => {
  e.dataTransfer.setData("taskId", String(id));
};

const onDrop = (e: React.DragEvent, status: "progress" | "done") => {
  const id = Number(e.dataTransfer.getData("taskId"));
  updateStatus(id, status);
};

const allowDrop = (e: React.DragEvent) => {
  e.preventDefault(); 
};

 const onSubmit = (data: FormData) => {
    const res = addItem(data);   

    if (!res.success) {
      console.error(res.error);
      return;
    }

    reset();
  };

 return(
  <>
  <div className='flex justify-end'>
<Sheet >
  <SheetTrigger asChild>
    <Button>Open Form</Button>
  </SheetTrigger>

  <SheetContent side="right" className="w-[400px]">
    <SheetHeader>
      <SheetTitle>Add Entry</SheetTitle>
    </SheetHeader>

   
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          {...register("status")}
          required
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="">Select status</option>
          <option value="progress">Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Text</label>
        <input
          type="text"
          {...register("text", { required: true })}
          placeholder="Enter text"
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          {...register("date", { required: true })}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>

    </form>
  </SheetContent>
</Sheet>

    </div>

       
        

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">

  <div
    onDragOver={allowDrop}
    onDrop={(e) => onDrop(e, "progress")}
    className="bg-white p-6 rounded-lg border min-h-[300px]"
  >
    <h3 className="text-lg font-medium mb-4 text-yellow-700">In Progress</h3>

   

    <div className="space-y-2">
      {progressItems.map(item => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => onDragStart(e, item.id)}
          className="border rounded-md p-3 text-sm bg-white cursor-move"
        >
          <div className="font-medium">{item.text}</div>
          <div className="text-xs text-gray-600">
            ID: {item.id} 
            Date: {item.date}
          </div>
        </div>
      ))}
    </div>
  </div>


  <div
    onDragOver={allowDrop}
    onDrop={(e) => onDrop(e, "done")}
    className="bg-white p-6 rounded-lg border min-h-[300px]"
  >
    <h3 className="text-lg font-medium mb-4 text-green-700">Done</h3>


    <div className="space-y-2">
      {doneItems.map(item => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => onDragStart(e, item.id)}
          className="border rounded-md p-3 text-sm bg-white cursor-move"
        >
          <div className="font-medium">{item.text}</div>
          <div className="text-xs text-gray-600">
            ID: {item.id} 
            Date: {item.date}
          </div>
        </div>
      ))}
    </div>
  </div>

</div>




  


  </>
 )
}
