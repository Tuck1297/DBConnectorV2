"use client";

import CustomButton from "@/components/interaction/inputs/CustomButton";
import Table from "@/components/tables/Table";

const testData = [
  { name: "test1", age: 22, zipcode: 12345, button: <CustomButton actionWord="Submit"  onSubmit={() => {console.log("button 1 clicked...")}} /> },
  { name: "test2", age: 55, zipcode: 12345, button: <CustomButton actionWord="Delete"  onSubmit={() => {console.log("button 2 clicked...")}} /> },
  { name: "test3", age: 23, zipcode: 12345, button: <CustomButton actionWord="Update"  onSubmit={() => {console.log("button 3 clicked...")}} /> },
  { name: "test4", age: 2, zipcode: 12345, button: <CustomButton  actionWord="Fart" onSubmit={() => {console.log("button 4 clicked...")}} /> },
];

const TestPage = () => {
  return (
    <Table data={testData}/>
  );
};

export default TestPage;
