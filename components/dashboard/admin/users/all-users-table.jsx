"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersTable from "../users-table";
import SearchWithOptions from "../../search-with-options";
import { useGetAdminUsersQuery } from "@/redux/store/api/adminApi";
import { useEffect, useState } from "react";
export default function AllUsersTable() {
  const [filter, setFilter] = useState({ searchValue: "" });
  
  const { data: usersResponse, isLoading, error } = useGetAdminUsersQuery({
    search: filter.searchValue || undefined,
  });
  
  const users = usersResponse?.users || [];
  const totalUsers = usersResponse?.total_users || 0;

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  if (isLoading) {
    return (
      <Card className="my-5">
        <CardHeader>
          <CardTitle>Loading Users...</CardTitle>
          <CardDescription>Fetching user data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-muted animate-pulse rounded h-12"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Total Users — {totalUsers}</CardTitle>
        <CardDescription>View and manage registered users.</CardDescription>
      </CardHeader>
      <CardContent>
        <SearchWithOptions
          placeholder="Search User"
          onChange={(data) => setFilter(data)}
        />
        <UsersTable users={users.map(user => ({
          id: user.id,
          name: user.full_name,
          email: user.email,
          joiningDate: user.date_joined,
        }))} />
      </CardContent>
    </Card>
  );
}
