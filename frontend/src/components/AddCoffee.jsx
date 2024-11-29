import Swal from "sweetalert2";
import Navbar from "./Navbar";


const AddCoffee = () => {
    const handleAddCoffee = (event)=>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;
        
        const newCoffee = {name, quantity, supplier, taste, category, details, photo}
        console.log(newCoffee)

        //send data to the server
        fetch('http://localhost:5000/coffee', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(newCoffee)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.insertedId){
                Swal.fire({
                    title: "Successfully",
                    text: "added the coffee",
                    icon: "success"
                  });
            }
            
        })
    }

    return (
        <section className="bg-[#f4f3f0] min-h-screen">
            <Navbar/>
            <div className="container mx-auto py-8 ">
                <h4 className="text-3xl text-center uppercase font-semibold">Add New Coffee </h4><br />

                {/* form */}

                <form onSubmit={handleAddCoffee} action="" className="flex flex-col gap-5 md:px-[20vw] py-[10vh] p-5">
                    <div className="flex flex-col lg:flex-row gap-5">
                        <input type="text" required placeholder="Enter coffee name" name='name' className="input input-bordered w-full " />
                        <input type="text" placeholder="Enter coffee quantity" name='quantity' className="input input-bordered w-full " />
                    </div>
                    <div className="flex flex-col lg:flex-row  gap-5">
                        <input type="text" placeholder="Enter coffee supplier" name='supplier' className="input input-bordered w-full " />
                        <input type="text" placeholder="Enter coffee taste" name='taste' className="input input-bordered w-full " />
                    </div>
                    <div className="flex flex-col lg:flex-row  gap-5">
                        <input type="text" placeholder="Enter coffee category" name='category' className="input input-bordered w-full " />
                        <input type="text" placeholder="Enter coffee details" name='details' className="input input-bordered w-full " />
                    </div>
                    <div className="flex gap-5">
                        <input type="text" placeholder="Enter photo URL" name='photo' className="input input-bordered w-full " />
                    </div>

                    <div className="flex gap-5">
                        <button className="input input-bordered w-full uppercase" >add coffee</button>
                    </div>
                </form>

            </div>
        </section>
    );
};

export default AddCoffee;