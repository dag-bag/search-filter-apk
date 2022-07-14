import Link from "next/link";
import React, { useState } from "react";

function Table({ columns, data, setData, Loading, setLoading }) {
  const [Query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const [Select, setSelect] = useState();
  const [SeachIn, setSeachIn] = useState("c");

  const sorting = async (e) => {
    setSelect(e.target.value);
    setLoading(true);
    const resp = await fetch(`/api/data`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sort: e.target.value }),
    });
    const respData = await resp.json();
    setLoading(false);
    setData(respData.data);
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const resp = await fetch(`/api/data`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: Query, SeachIn }),
    });
    const respData = await resp.json();
    setLoading(false);
    setData(respData.data);
  };
  let rates = [
    { name: "NSE" },
    { name: "BSE" },
    { name: "MCX" },
    { name: "NCDEX" },
    { name: "CSE" },
    { name: "ICE" },
  ];
  let fields = [{ name: "c" }, { name: "e" }, { name: "s" }];
  return (
    <>
      <div>
        <div className="sm:px-6 w-full">
          <div className="px-4 md:px-10 py-4 md:py-7">
            <div className="flex items-center justify-between">
              <Link href={"/?page=4"}>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                  Trading Data
                </p>
              </Link>
              <div>
                <form
                  onSubmit={HandleSubmit}
                  className={"flex justify-center items-center"}
                >
                  <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                    <p>Search in:</p>

                    <select
                      className="focus:outline-none bg-transparent ml-1"
                      value={SeachIn}
                      onChange={(e) => {
                        setSeachIn(e.target.value);
                      }}
                    >
                      {fields.map((i) => {
                        return (
                          <option
                            key={i.name}
                            className="text-sm text-indigo-800"
                            value={i.name}
                          >
                            {i.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <input
                    type="text"
                    value={Query}
                    onChange={handleChange}
                    placeholder="Search Data"
                    className={
                      "shadow-md rounded-md py-3 px-2 border border-gray-500"
                    }
                  />
                </form>
              </div>
              <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                <p>Sort By:</p>

                <select
                  className="focus:outline-none bg-transparent ml-1"
                  value={Select}
                  onChange={sorting}
                >
                  {rates.map((i) => {
                    return (
                      <option
                        key={i.name}
                        className="text-sm text-indigo-800"
                        value={i.name}
                      >
                        {i.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div className="sm:flex items-center justify-between ">
              {columns.map((i) => {
                return (
                  <div key={i.dataField} className="flex items-center ">
                    <a>
                      <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                        <p>{i.Text}</p>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="mt-7 overflow-x-auto">
              <table className="w-[100vw] whitespace-nowrap">
                <tbody>
                  {Loading && (
                    <div className="h-[50vh] flex justify-center items-center">
                      {" "}
                      <h1 className="text-center text-4xl">Loading.....</h1>
                    </div>
                  )}
                  {!Loading &&
                    data &&
                    data.map((i) => {
                      return (
                        <tr
                          key={i._id}
                          className="h-16 border border-gray-100 rounded flex justify-between items-center text-center w-[90vw]"
                        >
                          <td className="block w-14">
                            <p>{i.c}</p>
                          </td>
                          <td className="block w-14">
                            <p>{i.e}</p>
                          </td>
                          <td className="block w-14">
                            <p>{i.s}</p>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <style>
          {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
        </style>
      </div>
    </>
  );
}

export default Table;
