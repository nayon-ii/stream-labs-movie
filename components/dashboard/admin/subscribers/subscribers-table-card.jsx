"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAdminSubscribersQuery } from "@/redux/store/api/adminApi";
import { useEffect, useState } from "react";
import SearchWithOptions from "../../search-with-options";
import RenderSubscribersTable from "./render-subscribers-table";

export default function SubscribersTableCard() {
  const [filter, setFilter] = useState({ searchValue: "" });
  
  const { data: subscribersResponse, isLoading, error } = useGetAdminSubscribersQuery({
    search: filter.searchValue || undefined,
  });
  
  const subscribers = subscribersResponse?.subscribers || [];
  const totalSubscribers = subscribersResponse?.total_subscriber || 0;

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  if (error) {
    console.error("Error fetching subscribers:", error);
  }

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Total Subscribers — {totalSubscribers}</CardTitle>
        <CardDescription>View and manage subscribers.</CardDescription>
      </CardHeader>
      <CardContent>
        <SearchWithOptions
          placeholder="Search Subscriber"
          onChange={(data) => setFilter(data)}
        />
        <RenderSubscribersTable 
          subscribers={subscribers} 
          isLoading={isLoading} 
        />
      </CardContent>
    </Card>
  );
}
