import React from "react";
import ListItem from "./ListItem";

function List(props) {

  return (
    <div className='overflow-scroll rounded-lg'>
          <h1 className='py-[0.5rem] px-[1rem] bg-blue text-white font-semibold'>{props.title}</h1>
          {props.items.features.map((s) => {
            return (
              <div onMouseEnter={() => {props.setHoverD(s)}}>
                {props.title === "States List" ? (
                  <ListItem key={s.id} name={s.properties.NAME} num={s.properties.NUM_ABORT_RES.toLocaleString()}/>
                ) : (
                  <ListItem key={s.id} name={s.properties.ADMIN} num={s.properties.NUM_ABORT.toLocaleString()}/>
                )}
              </div>
            );
          })}

    </div>
  )
}

export default List;