import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <section className="bg-[#F4F3F0]">
            <div className="container mx-auto flex gap-10 items-center justify-center py-5">
                <Link to='/'>Home</Link>
                <Link to='/addCoffee'>Add Coffee</Link>
                <Link to='/updateCoffee'>Update Coffee</Link>
            </div>
        </section>
    );
};

export default Navbar;