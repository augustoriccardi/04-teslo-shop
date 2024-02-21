export const revalidate = 0;

import { getPaginatedUsers } from "@/actions";
// https://tailwindcomponents.com/component/hoverable-table

import { Pagination, Title } from "@/components";

import { redirect } from "next/navigation";

import { UsersTable } from "./ui/UsersTable";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function AdminUsersPage({ searchParams }: Props) {
  // const page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
        <Pagination totalPages={1} />
      </div>
    </>
  );
}
