import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const Landing = ()=>{
  return(
    <div>
        <Header></Header>
        <Outlet></Outlet>
    </div>
  )
}
export default Landing;

// const  = ()=>{
//     return(
//       <div>
//         <h1>Arafat</h1>
//       </div>
//     )
//   }
//   export default ;