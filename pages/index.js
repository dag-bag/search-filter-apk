import { useRouter } from "next/router";
import Table from "../components/Table";
import mongoose, { mongo } from "mongoose";
import Trading from "../model/Trading";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
export default function Home({ data }) {
  const router = useRouter();
  const [Data, setData] = useState([]);
  const [Page, setPage] = useState(1);
  const [PageCount, setPageCount] = useState(0);

  const handlePrev = () => {
    router.push(`/?page=${Page}`);
    setPage((p) => {
      if (p === 1) return 1;
      else {
        return p - 1;
      }
    });
  };
  const handleNext = () => {
    router.push(`/?page=${Page}`);
    setPage((p) => {
      if (p === PageCount) return p;
      else {
        return p + 1;
      }
    });
  };

  useEffect(() => {
    // const getData =async ()=>{
    //     const
    // }
    setData(data);
  }, [Page]);

  let columns = [
    {
      dataField: "c",
      Text: "C",
    },
    {
      dataField: "e",
      Text: "E",
    },
    {
      dataField: "s",
      Text: "S",
    },
  ];
  return (
    <div>
      <Table columns={columns} data={Data} setData={setData} />
      <Footer
        handleNext={handleNext}
        handlePrev={handlePrev}
        page={Page}
        PageCount={PageCount}
      />
    </div>
  );
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO);
  }
  let query = {};
  const count = await Trading.countDocuments(query);

  let page = context.query.page || 1;
  let dataPerPage = 20;
  let pageCount = count / dataPerPage;

  let products = await Trading.find()

    .skip((page - 1) * dataPerPage)
    .limit(dataPerPage * 1);

  // const resp = await fetch("http://localhost:3000/api/getproducts");
  // const products = await resp.json();
  return {
    props: { data: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}
