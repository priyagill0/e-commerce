"use client";

import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function AdminTable({ columns, rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", border: "1.5px solid #1976d2", borderRadius: "8px" }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell
                  key={c.id}
                  align={c.align || "left"}
                  style={{ minWidth: c.minWidth, borderBottom: "1px solid #1976d2" }}
                >
                  {c.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
    <TableRow hover key={`${row.id}-${rowIndex}`}>
      {columns.map((c, colIndex) => {
        const value = row[c.id];
        return (
          <TableCell key={`${row.id}-${c.id}-${colIndex}`}>
            {c.render ? c.render(row) : c.format ? c.format(value) : value}
          </TableCell>
        );
      })}
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[6, 10, 25, 50]}
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
