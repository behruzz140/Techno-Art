import {
  Table,
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableSortLabel,
  Paper,
  Skeleton,
} from "@mui/material";

import { Props } from "../../../types/globol-interface";
import { ModalDelete, ModalBrand, ModalCategory } from "../../modals";

function indec({ heders, body, skelatonLoader }: Props) {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHead>
                <TableRow>
                  {heders?.map((heder, index) => {
                    return (
                      <TableCell key={index}>
                        <TableSortLabel>{heder.title}</TableSortLabel>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {skelatonLoader
                  ? Array.from(new Array(5)).map((_, index) => {
                      return (
                        <TableRow key={index}>
                          {heders?.map((_, index2) => {
                            return (
                              <TableCell key={index2}>
                                <Skeleton />
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                  : body?.map((body, index) => {
                      return (
                        <TableRow key={index}>
                          {heders?.map((heder, index2) => {
                            return (
                              <TableCell key={index2}>
                                {heder.value == "action" ? (
                                  <div className="flex items-center gap-2">
                                    <button className=" text-gray-500">
                                      <ModalDelete
                                        id={body?.id}
                                        title="brand"
                                      />
                                    </button>
                                    <ModalBrand
                                      title="put"
                                      id={body?.id}
                                      data={body}
                                    />
                                  </div>
                                ) : heder.value == "action2" ? (
                                  <div className="flex items-center gap-2">
                                    <button className=" text-gray-500">
                                      <ModalDelete
                                        id={body?.id}
                                        title="category"
                                      />
                                    </button>
                                    <ModalCategory
                                      title="put"
                                      id={body?.id}
                                      data={body}
                                    />
                                  </div>
                                ) : heder.value == "t/r" ? (
                                  <p>{index + 1}</p>
                                ) : (
                                  body[heder.value]
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}

export default indec;
