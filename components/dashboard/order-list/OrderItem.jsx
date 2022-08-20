import React ,{useState}from "react";
import  toast from "react-hot-toast";
const OrderItem = ({ data,getData }) => {
	const [modalRejectIsOpen, setRejectIsOpen] = React.useState(false);
	let obj = JSON.parse(data.package);
  const [load, setload] = useState(false)
console.log(data)
	return (
		<>
			<div className="orderItems">
				<h3>{data.name}</h3>
				<h4>{data.packageName}</h4>

				<ul className=" order-items-list">
					<li>
						<span className="order-items-name">Event location</span>
						{": "}
						<span>{data?.city + "," + data.address}</span>
					</li>

					<li>
						<span className="order-items-name">Total Price</span>
						{": "}
						<span>{data?.totalPayment}</span>
					</li>

					<li>
						<span className="order-items-name">Advance Payment</span>
						{": "}
						<span className="text-[#EF0D0D]">{data?.initialPayment} BDT</span>
					</li>

					<li>
						<span className="order-items-name">Due Payment</span>
						{": "}
						<span className="text-[#FF8310]">{data?.duePayment} BDT</span>
					</li>
				</ul>

				<div className="flex mt-4">
{
  data?.status ==="Pending" ? 					<div className="ml-auto flex flex-wrap gap-4">
						<button
							className="border border-red-500 text-red-700 orderBtn"
							onClick={() => setRejectIsOpen(true)}
						>
							Reject
						</button>
						<button
							className="bg-[#14A333] orderBtn"
							onClick={async () => {
								await fetch(
									"https://n3jdb5fd75hu57uzed3mop7vca0dhlse.lambda-url.ap-southeast-1.on.aws/",
									{
										method: "POST",
										mode: "no-cors",
										headers: {
											Accept: "application/json",
											"Content-Type": "application/json",
										},
										body: JSON.stringify({
											orderID: data?.id,
											statusOrder: "pendingPayment",
										}),
									}
								);
                toast.success("Order Status Changed")
                  getData()
							}}
            
						>
							Accept
						</button>
					</div>: <div></div>

}
				</div>
			</div>

			{modalRejectIsOpen && (
				<div className="modal-cover flex-center ">
					<div className="max-w-[800px] mx-auto bg-white p-8">
						<h2 className="color4  font-18 sm:font-20">
							Are you sure you want Reject?
						</h2>
						<button
							className="border border-red-500 text-red-700 orderBtn ml-auto block mt-5"
							onClick={async() => {
								await fetch(
									"https://n3jdb5fd75hu57uzed3mop7vca0dhlse.lambda-url.ap-southeast-1.on.aws/",
									{
										method: "POST",
										mode: "no-cors",
										headers: {
											Accept: "application/json",
											"Content-Type": "application/json",
										},
										body: JSON.stringify({
											orderID: data?.id,
											statusOrder: "Rejected",
										}),
									}
								);
                toast.success("Order Status Changed")
                  getData()
								setRejectIsOpen(false)
							}}
						>
							Yes
						</button>
					</div>

					<button
						onClick={() => setRejectIsOpen(false)}
						className="text-white bgcolor1 btn-hover px-4 py-1 font-20 rounded-[4px] font-light absolute top-5 right-5"
					>
						close
					</button>
				</div>
			)}
		</>
	);
};

export default OrderItem;
