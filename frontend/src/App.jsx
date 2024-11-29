import { useLoaderData } from "react-router-dom";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { useState } from "react";

function App() {
  const loadedCoffees = useLoaderData() ; 
  const [coffees, setCoffees] = useState(loadedCoffees)

  return (
    <>
      <Navbar />
      <section className="bg-[#f4f3f0] min-h-screen">
        <div className="container mx-auto py-8">
          <h4 className="text-3xl text-center uppercase font-semibold">
            Coffee Shop: {coffees.length}
          </h4>
          <br />
          {coffees.length > 0 ? (
            <div className="grid grid-cols-2 gap-5">
              {coffees.map((coffee) => (
                <Card key={coffee._id} coffee={coffee} coffees={coffees} setCoffees={setCoffees}/>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No coffees available at the moment.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
