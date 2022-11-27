import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/UseContext";

const BookingModal = ({ booking, setBooking }) => {
  const { title, _id, resellerPrice } = booking;
  const { user } = useContext(AuthContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const price = form.price.value;
    const phone = form.phone.value;
    const location = form.location.value;

    const booking = {
      productID: _id,
      product: title,
      buyerName: name,
      email,
      price,
      phone,
      location,
    };

    fetch(`${process.env.REACT_APP_API_URL}/booking`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.acknowledged) {
          setBooking(null);
          toast.success("Booking confirmed");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">{title}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10">
            <input
              type="text"
              placeholder="Product name"
              defaultValue={title}
              className="input w-full input-bordered "
              disabled
            />
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              defaultValue={user?.displayName}
              className="input w-full input-bordered"
              disabled
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              defaultValue={user?.email}
              className="input w-full input-bordered"
              disabled
            />
            <input
              name="price"
              type="text"
              placeholder="price"
              className="input w-full input-bordered"
              defaultValue={resellerPrice}
              disabled
            />
            <input
              name="phone"
              type="number"
              placeholder="Enter Phone Number"
              className="input w-full input-bordered"
              required
            />
            <input
              name="location"
              type="text"
              placeholder="your Location"
              className="input w-full input-bordered"
              required
            />
            <br />
            <input
              className="btn btn-primary w-full"
              type="submit"
              value="Book Now"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
