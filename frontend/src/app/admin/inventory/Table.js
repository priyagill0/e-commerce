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
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

export default function AdminTable({ columns, rows, onEdit }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [editing, setEditing] = React.useState(null); // row id
  const [editValue, setEditValue] = React.useState("");

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Editing quantity handlers
  const startEdit = (row, field) => {
    setEditing({ id: row.variant_id, field });
    setEditValue(row[field]);
  };

  const saveEdit = () => {
    onEdit(editing.id, editing.field, editValue);
    setEditing(null);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden",   border: "1.5px solid #1976d2", borderRadius: "8px" }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader >
          {/* Header */}
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell
                  key={c.id}
                  align={c.align || "left"}
                  style={{ minWidth: c.minWidth,  borderBottom: "1px solid #1976d2",  }}
                >
                  {c.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Rows */}
           <TableBody>
  {rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, rowIndex) => (
      <TableRow hover key={`${row.variant_id}-${rowIndex}`}>
        {columns.map((c, colIndex) => {
          const value = row[c.id];

          // Editable cell logic
          if (c.id === "update") {
            return (
              <TableCell key={`${row.variant_id}-${c.id}-${colIndex}`}>
                <IconButton onClick={() => startEdit(row, "quantity")}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            );
          }

          // Render editable cell
          if (c.editable && editing?.id === row.variant_id && editing?.field === c.id) {
            return (
              <TableCell key={`${row.variant_id}-${c.id}-${colIndex}`}>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <TextField
                    size="small"
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    sx={{ width: "80px" }}
                  />
                  <IconButton onClick={saveEdit}>
                    <CheckIcon />
                  </IconButton>
                </div>
              </TableCell>
            );
          }

          return (
            <TableCell key={`${row.variant_id}-${c.id}-${colIndex}`}>
                {c.render ? c.render(row) : (c.format ? c.format(Number(value)) : value)}
            </TableCell>
          );
        })}
      </TableRow>
    ))} 

          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        rowsPerPageOptions={[6, 10, 100]}
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
