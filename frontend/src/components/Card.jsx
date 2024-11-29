import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Card = ({ coffee, coffees, setCoffees }) => {
  const { _id, name, details, photo, quantity, supplier, taste, category } = coffee;

  const handleDelete = (id)=>{
    console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(`http://localhost:5000/coffee/${id}`, {
          method:'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          if(data.deletedCount>0){
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });

              const remaining = coffees.filter(el => el._id !== _id)
              setCoffees(remaining)
          }
        })
        console.log("delete confirmed")
      }
    });
  }

  return (
    <div className="p-4 border-b border-gray-300 flex flex-col lg:flex-row items-start gap-4">
      <figure className="w-40 h-40 flex-shrink-0">
        <img
          src={photo}
          alt={name}
          className="rounded-lg w-full h-full object-cover"
        />
      </figure>
      <div className="flex-1">
        <h2 className="text-2xl font-bold">{name || "Unnamed Coffee"}</h2>
        <p className="text-sm mt-2">{details || "Details not available"}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <p>
            <span className="font-semibold">Category:</span> {category || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Taste:</span> {taste || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Supplier:</span> {supplier || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span> {quantity || "N/A"}
          </p>
        </div>
        <div className="mt-6 flex space-x-4">
          <button className="px-4 py-2 text-sm font-semibold border border-black rounded hover:bg-black hover:text-white transition">
            View
          </button>
          <Link to={`/updateCoffee/${_id}`}>
            <button className="px-4 py-2 text-sm font-semibold border border-black rounded hover:bg-black hover:text-white transition">
              update
            </button>
          </Link>
          <button onClick={()=>handleDelete(_id)} className="px-4 py-2 text-sm font-semibold border border-black rounded hover:bg-black hover:text-white transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
