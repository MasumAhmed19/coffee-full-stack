import { useLoaderData } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
    const coffee = useLoaderData();
    const { _id, name, details, photo, quantity, supplier, taste, category } = coffee;

    const handleUpdateCoffee = (event)=>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;
        
        const updatedCoffee = {name, quantity, supplier, taste, category, details, photo}
        console.log(updatedCoffee)

        //send data to the server
        fetch(`http://localhost:5000/coffee/${_id}`, {
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(updatedCoffee)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.modifiedCount > 0){
                Swal.fire({
                    title: "Successfully",
                    text: "Coffee updated",
                    icon: "success"
                  });
            }
            
        })
    }

    return (
        <section className="bg-[#f4f3f0] min-h-screen">
            <Navbar/>
            <div className="container mx-auto py-8 "> 
                <h4 className="text-3xl text-center uppercase font-semibold">Update Coffee: {name} </h4><br />

                {/* form */}

                <form onSubmit={handleUpdateCoffee} action="" className="flex flex-col gap-5 md:px-[20vw] py-[10vh] p-5">
                    <div className="flex flex-col lg:flex-row gap-5">
                        <input type="text" required placeholder="Enter coffee name" defaultValue={name} name='name' className="input input-bordered w-full " />
                        <input type="text" placeholder="Enter coffee quantity" defaultValue={quantity}  name='quantity' className="input input-bordered w-full " />
                    </div>
                    <div className="flex flex-col lg:flex-row  gap-5">
                        <input type="text" placeholder="Enter coffee supplier" defaultValue={supplier}  name='supplier' className="input input-bordered w-full " />
                        <input type="text" placeholder="Enter coffee taste" defaultValue={taste}  name='taste' className="input input-bordered w-full " />
                    </div>
                    <div className="flex flex-col lg:flex-row  gap-5">
                        <input type="text" placeholder="Enter coffee category" name='category' defaultValue={category}  className="input input-bordered w-full " />
                        <input type="text" placeholder="Enter coffee details" name='details' defaultValue={details}  className="input input-bordered w-full " />
                    </div>
                    <div className="flex gap-5">
                        <input type="text" placeholder="Enter photo URL" defaultValue={photo}  name='photo' className="input input-bordered w-full " />
                    </div>

                    <div className="flex gap-5">
                        <button className="input input-bordered w-full uppercase" >Update coffee</button>
                    </div>
                </form>

            </div>
        </section>
    );
};

export default UpdateCoffee;