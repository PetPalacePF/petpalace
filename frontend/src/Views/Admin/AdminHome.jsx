import React from "react";

import { FaUser } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";

const AdminHome = () => {
  return (
    <section class="relative pt-16 bg-blueGray-50">
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center">
          <div class="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
            <div
              class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg overflow-hidden bg-violetamain"
            >
              <img
                alt="Background"
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=700&amp;q=80"
                class="w-full align-middle rounded-t-lg"
              />
              <blockquote class="relative p-8 mb-4">
                <svg
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 583 95"
                  class="absolute left-0 w-full block h-95-px -top-94-px"
                ></svg>
                <h4 class="text-xl font-bold text-white">
                  Welcome to your Dashboard
                </h4>
                <p class="text-md font-light mt-2 text-white">
                  This is the control center for managing your online store.
                  From here, you can perform various tasks to ensure smooth
                  operation and administration of your store.
                </p>
              </blockquote>
            </div>
          </div>

          <div class="w-full md:w-6/12 px-4">
            <div class="flex flex-wrap">
              <div class="w-full md:w-6/12 px-4">
                <div class="relative flex flex-col mt-4">
                  <div class="px-4 py-5 flex-auto">
                    <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <FaProductHunt />
                    </div>
                    <h6 class="text-xl mb-1 font-semibold">
                      Product Management
                    </h6>
                    <p class="mb-4 text-blueGray-500">
                      Manage your product inventory with ease. Update stock
                      levels, add or remove products, and categorize items for
                      better organization.
                    </p>
                  </div>
                </div>
                <div class="relative flex flex-col min-w-0">
                  <div class="px-4 py-5 flex-auto">
                    <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <FaUser />
                    </div>
                    <h6 class="text-xl mb-1 font-semibold">User Management</h6>
                    <p class="mb-4 text-blueGray-500">
                      Effortlessly manage user accounts and permissions,
                      including viewing and editing user details, as well as
                      suspending or deleting user accounts.
                    </p>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-6/12 px-4">
                <div class="relative flex flex-col min-w-0 mt-4">
                  <div class="px-4 py-5 flex-auto">
                    <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <MdOutlinePayments />
                    </div>
                    <h6 class="text-xl mb-1 font-semibold">Order Management</h6>
                    <p class="mb-4 text-blueGray-500">
                      Easily manage incoming orders, track order status and
                      history, and generate comprehensive reports on sales and
                      revenue.
                    </p>
                  </div>
                </div>
                <div class="relative flex flex-col min-w-0">
                  <div class="px-4 py-5 flex-auto">
                    <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                      <BiSolidCategory />
                    </div>
                    <h6 class="text-xl mb-1 font-semibold">
                      Category Management
                    </h6>
                    <p class="mb-4 text-blueGray-500">
                      Seamlessly add, edit, or delete product categories, and
                      efficiently assign categories to products.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminHome;
