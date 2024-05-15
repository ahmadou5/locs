import { DashboardView } from "@/components/Dashboard";
import { NewUserCard } from "@/components/Dashboard/Updated";
import { UserCard } from "@/components/Dashboard/UserCard";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:text-white/90 text-white/85">
      <Navbar />
      {/**<UserCard />**/}
      <NewUserCard />
      <DashboardView />
    </main>
  );
}
