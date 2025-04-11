"use client"
import { Button, Card, CardBody,Table,Text } from "@chakra-ui/react";
import Banner from "components/Dashboard/upcoming.dashboard";
import ProfileCard from "components/members/profile/profile.card";
import TableContainer from "components/members/table/tabel.container";
import TableCard from "components/members/table/member.list.table";
import React from 'react'
import MemberList from "components/members/table/member.list.table";
import Sidebar from "components/Sidebar/Sidebar";
import NotificationBell from "components/DashboardLayout/NotificationBell";

export default function Home() {
  const handleApplyFilters = (filters: any) => {
    console.log('Filters:', filters)
  }
  return (
      <div>hello</div>
  );
}
