import React from "react";
import { useUSAState } from '../assets/StateContext';
import { useCountry } from '../assets/CountryContext';
import ListItem from "./ListItem";

function List(props) {
  const {USAStates} = useUSAState();
  const {countries} = useCountry();

  return (
    <div className='mt-[4rem] mb-[2rem] overflow-scroll rounded-lg'>
      {props.page === 'usa' ? (
      <>
      <h1 className='py-[0.5rem] px-[1rem] bg-blue text-white font-semibold'>States List</h1>
      {USAStates.features.map((s) => {
        return (
          <div onMouseEnter={() => {props.setHoverD(s)}}>
          <ListItem key={s.id} name={s.properties.NAME} num={s.properties.NUM_ABORT_RES.toLocaleString()}/>
          </div>
        );
      })}
      </>
      ) : (
        <>
        <h1 className='py-[0.5rem] px-[1rem] bg-blue text-white font-semibold'>Countries List</h1>
        {countries.features.map((s) => {
          return (
            <div onMouseEnter={() => {props.setHoverD(s)}}>
            <ListItem key={s.id} name={s.properties.ADMIN} num={s.properties.NUM_ABORT.toLocaleString()}/>
            </div>
          );
        })}
        </>
      )}

    </div>
  )
}

export default List;