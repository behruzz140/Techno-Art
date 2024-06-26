import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import useBrandStore from "../../../store/brand";
import { postData } from "../../../service/brand";

const blueStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#e3f2fd", 
  color: "#0d47a1", 
};

interface propsData {
  title: string;
  id?: number;
  data?: any;
}

export default function BlueModal({ title, id, data }: propsData) {
  const { postBrand, updateBrand } = useBrandStore();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    brand_name: Yup.string().required("Name is required"),
    brand_description: Yup.string().required("Description is required"),
    position: Yup.number()
      .min(0, "must be at least greater than 0")
      .required("Position is required"),
    image: Yup.string().required("Image is required"),
  });

  const initialValues: postData = {
    brand_name: data?.brand_name || "",
    brand_description: data?.brand_description || "",
    position: data?.position || "",
    image: data?.image || "",
  };

  const handelSubmit = async (value: postData) => {
    if (!id) {
      const status = await postBrand(value);
      if (status === 201) {
        toast.success("Success");
        handleClose();
      } else {
        toast.error("Error: " + status);
        handleClose();
      }
    } else {
      const updateData = { id: id, putData: value };
      const status = await updateBrand(updateData);
      if (status === 200) {
        toast.success("Update successful");
        handleClose();
      } else {
        toast.error("Error: " + status);
        handleClose();
      }
    }
  };

  return (
    <div>
      {title === "post" ? (
        <button
          onClick={handleOpen}
          className="py-2 px-6 mt-[16px] text-white font-semibold bg-[#2196f3] hover:bg-[#1976d2] active:bg-[#1565c0] duration-200 rounded-lg"
        >
          ADD BRAND
        </button>
      ) : (
        <Button
          color="inherit"
          onClick={handleOpen}
          sx={{
            color: "#767676",
          }}
        >
          <EditIcon />
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={blueStyle}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handelSubmit}
          >
            <Form className="max-w-[600px] w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold" style={{ color: "#0d47a1" }}>
                {title === "post" ? "Add a brand" : "Edit a brand"}
              </h1>
              <Field
                as={TextField}
                label="Brand name"
                sx={{ "& input": { color: "#0d47a1", fontSize: "20px" } }}
                type="text"
                name="brand_name"
                className="w-[100%] mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="brand_name"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                }
              />
              <Field
                as={TextField}
                label="Brand description"
                sx={{ "& input": { color: "#0d47a1", fontSize: "20px" } }}
                type="text"
                name="brand_description"
                className="w-[100%] mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="brand_description"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                }
              />

              <Field
                as={TextField}
                label="Position"
                sx={{ "& input": { color: "#0d47a1", fontSize: "20px" } }}
                type="number"
                name="position"
                className="w-[100%] mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="position"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                }
              />

              <Field
                as={TextField}
                label="Image URL"
                sx={{ "& input": { color: "#0d47a1", fontSize: "20px" } }}
                type="text"
                name="image"
                className="w-[100%] mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="image"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                }
              />

              <Button
                sx={{ fontSize: "16px", fontWeight: "600", backgroundColor: "#2196f3", "&:hover": { backgroundColor: "#1976d2" } }}
                variant="contained"
                type="submit"
                className="w-[100%] py-3"
              >
                {title === "post" ? "Add Brand" : "Edit Brand"}
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
