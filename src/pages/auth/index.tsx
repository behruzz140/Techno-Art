import { Button, TextField } from "@mui/material";
import { loginSchema } from "../../validations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useAuthStore from "../../store";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { signin } = useAuthStore();
  const navigate = useNavigate();

  interface Login {
    email: string;
    password: string;
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (value: Login) => {
    const res = await signin(value);
    if (res && res.status === 201) {
      navigate("/home");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center p-5 bg-blue-100">
      <div className="bg-white flex gap-6 flex-col justify-center items-center max-w-md w-full max-h-[500px] h-full shadow-lg p-10 rounded-lg">
        <h1 className="text-5xl font-extrabold text-blue-600">Login</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-6 w-full">
              <Field
                type="email"
                name="email"
                as={TextField}
                label="Email"
                placeholder="Email"
                size="small"
                className="w-full border-blue-200"
                InputLabelProps={{
                  style: { color: "#3b82f6" },
                }}
                inputProps={{
                  style: { borderColor: "#a5b4fc" },
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <Field
                type="password"
                name="password"
                as={TextField}
                label="Password"
                placeholder="Password"
                size="small"
                className="w-full border-blue-200"
                InputLabelProps={{
                  style: { color: "#3b82f6" },
                }}
                inputProps={{
                  style: { borderColor: "#a5b4fc" },
                }}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  borderRadius: "25px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        {/* <span className="text-blue-700 cursor-pointer" onClick={()=>(navigate("/signup"))}>Add new admin</span> */}
      </div>
    </div>
  );
}
