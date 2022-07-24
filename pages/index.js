import Head from "next/head";
import HowWeWork from "../components/How_We_Work";
import BestSellers from "../components/Bestsellers";
import CataLog from "../components/Catalog";
import SpecialOffer from "../components/Special_Offer";
import OurFarms from "../components/Our_Farms";

export default function Home() {
  return (
    <div>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="/Montserrat.ttf" />
      </Head>
      <BestSellers />
      <CataLog name={"Catalog"} />
      <HowWeWork />
      <SpecialOffer />
      <OurFarms />
    </div>
  );
}