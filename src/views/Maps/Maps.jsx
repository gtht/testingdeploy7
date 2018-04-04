import React from "react";
import firebase from "firebase";
import { LessonList } from "components";

function Maps({ ...props }) {

  return (
    <div style= {{flex: 1, flexDirection: 'row'}}>
      <div><LessonList db={firebase} /></div>
    </div>
  );
}

export default Maps;
