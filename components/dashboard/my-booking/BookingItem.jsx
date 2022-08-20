import React from "react";
import GiveReview from "./GiveReview";
import { useState, useEffect } from "react";
import * as mutations from "../../../src/graphql/mutations";
import {useRouter} from "next/router"
import * as queries from "../../../src/graphql/queries";
const BookingItem = ({ data }) => {
  const router = useRouter()
	const [modalReviewIsOpen, setReviewIsOpen] = React.useState(false);
	let obj = JSON.parse(data.package);
	let service = obj.service;
	let id = obj.vendorID;
	const [rev, setrev] = useState(false);
	const [pay, setpay] = useState(false);
	const [number, setnumber] = useState(true);
  console.log(obj)
	function check1() {
		if (data?.reviewID !== null) {
			setrev(true);
		}
	}
	function check2() {
		if (data?.status !== "pending") {
			setrev(true);
		}
	}
	function check3() {
		if (data?.status !== "pendingPayment") {
			setpay(true);
		}
	}
	useEffect(() => {
		check1();
		check2();
		check3();
	}, []);

	return (
		<>
			<div className="orderItems">
				<h3>{data?.title}</h3>
				<h4>{data?.packageName}</h4>

				<ul className="order-items-list">
					<li>
						<span className="order-items-name">Name</span>
						{": "}
						<span>{data?.name}</span>
					</li>

					<li>
						<span className="order-items-name">Mobile</span>
						{": "}
						<span>
							{number === true
								? data?.phoneNumberUser
								: "Not available right now"}
						</span>
					</li>

					<li>
						<span className="order-items-name">Event location</span>
						{": "}
						<span>{data?.city + "," + data.address}</span>
					</li>

					<li>
						<span className="order-items-name">Event time</span>
						{": "}
						<span>
							{" "}
							{data.bookedDay === null
								? data.start + "-" + data?.end
								: data?.bookedDay + "," + data.start + "-" + data?.end}
						</span>
					</li>
					<li>
						<span className="order-items-name">Total time</span>
						{": "}
						<span> {data?.total}</span>
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
<div>
<h3 className="order-items-name">Notes</h3>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nemo!</p>

</div>

				{console.log(data?.status)}
				<div className="flex mt-4">
					<div className="ml-auto flex flex-wrap gap-4">
						{rev ? (
							<div></div>
						) : (
							<button
								className="bgcolor2 orderBtn"
								onClick={() => setReviewIsOpen(true)}
							>
								Review
							</button>
						)}
						{pay ? (
							<div></div>
						) : (
							<button className="bg-[#14A333] orderBtn "
              onClick={()=>router.push({
                pathname : "/checkout",
                query: { id: data.id }
              })}
              >Pay</button>
						)}
					</div>
				</div>
			</div>

			{modalReviewIsOpen && (
				<div className="modal-cover flex-center ">
					<div className="max-w-[800px] mx-auto">
						<GiveReview service={service} id={id} />
					</div>
					<button
						onClick={() => setReviewIsOpen(false)}
						className="text-white bgcolor1 btn-hover px-4 py-1 font-20 rounded-[4px] font-light absolute top-5 right-5"
					>
						close
					</button>
				</div>
			)}
		</>
	);
};

export default BookingItem;
