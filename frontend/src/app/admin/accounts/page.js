"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";

export default function AccountManagement() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("http://localhost:8080/api/customers", {
          credentials: "include",
        });
        if (!res.ok) throw new Error();
        setUsers(await res.json());
      } catch {
        setError("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    }
    fetchUsers();
  }, []);

  const loadOrders = async (userId) => {
    setSelectedUser(userId);
    setLoadingOrders(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/order/user/${userId}`,
        { credentials: "include" }
      );
      setOrders(await res.json());
    } finally {
      setLoadingOrders(false);
    }
  };

  if (loadingUsers) {
    return (
      <div style={{ marginTop: "5rem", textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading accounts...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 5, textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Account Management
      </Typography>

      {/* USERS TABLE */}
      <TableContainer component={Paper} sx={{ mb: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>User ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.userId}>
                <TableCell>{u.userId}</TableCell>
                <TableCell>{`${u.firstName} ${u.lastName}`}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() => loadOrders(u.userId)}
                  >
                    View Orders
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() =>
                      router.push(`/admin/accounts/${u.userId}`)
                    }
                  >
                    Edit User
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ORDERS TABLE (READ-ONLY) */}
      {selectedUser && (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Orders for User {selectedUser}
          </Typography>

          {loadingOrders ? (
            <CircularProgress />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Order ID</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Total</b></TableCell>
                    <TableCell><b>Placed At</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.orderId}>
                      <TableCell>{o.orderId}</TableCell>
                      <TableCell>{o.status}</TableCell>
                      <TableCell>${o.total}</TableCell>
                      <TableCell>
                        {new Date(o.placedAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </div>
  );
}
