import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import useCategoryStore from "../../../store/store-category";
import { postCategory } from "../../../service/category";

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
  backgroundColor: "#e3f2fd", // light blue background
  color: "#0d47a1", // dark blue text
};

interface propsData {
  title: string;
  id?: number;
  data?: any;
}

export default function BlueModal({ title, id, data }: propsData) {
  const { postDatacategory, updateDataCategory } = useCategoryStore();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    category_name: Yup.string().required("Name is required"),
  });

  const initialValues: postCategory = {
    category_name: data?.category_name || "",
  };

  const handelSubmit = async (value: postCategory) => {
    const postValue = {
      category_name: value.category_name,
      parent_category_id: null,
      positon: null,
    };
    if (!id) {
      const status = await postDatacategory(postValue);
      if (status === 201) {
        toast.success("Successfully created");
        handleClose();
      } else {
        toast.error("Error :" + status);
        handleClose();
      }
    } else {
      const updateData = { id: id, updateData: postValue };
      const status = await updateDataCategory(updateData);
      if (status === 200) {
        toast.success("Update successfully");
        handleClose();
      } else {
        toast.error("Error :" + status);
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
          ADD CATEGORY
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
              <h1
                className="text-center mb-2 text-[26px] font-bold"
                style={{ color: "#0d47a1" }}
              >
                {title === "post" ? "Add a category" : "Edit a category"}
              </h1>
              <Field
                as={TextField}
                label="Category name"
                sx={{ "& input": { color: "#0d47a1", fontSize: "20px" } }}
                type="text"
                name="category_name"
                className="w-[100%] mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="category_name"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                }
              />

              <Button
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  backgroundColor: "#2196f3",
                  "&:hover": { backgroundColor: "#1976d2" },
                }}
                variant="contained"
                type="submit"
                className="w-[100%] py-3"
              >
                {title === "post" ? "ADD CATEGORY" : "EDIT CATEGORY"}
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
