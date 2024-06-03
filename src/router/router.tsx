import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "../App";
import { Auth, Arror } from "../pages";
import { HomeLayout } from "@layut";
import Category from "../pages/category";
import Brand from "../pages/brand";
import Create from "../pages/create"
const index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Auth />} />
        <Route path="/signup" element={<Create/>}/>
        <Route path="/home/*" element={<HomeLayout />}>
          <Route index element={<Category />} />
          <Route path="brands" element={<Brand />} />
          
          {/* <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductId />} />
              <Route path="workers" element={<Users />} /> */}
        </Route>
        <Route path="*" element={<Arror />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default index;
