import { Button, Table, Space, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { companyMapping, roleMapping } from "../constants";
import s from "../styles/user-listing.module.scss"; 

export default function UserListing() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8080/users");
    const data = await res.json();
    setUsers(data);
  };

  const onRemove = async (id) => {
    await fetch(`http://localhost:8080/users/${id}`, { method: "DELETE" });
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => roleMapping(role),
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (company) => companyMapping(company),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className={s.action_icons}>
          <button
            className={s.icon_view}
            onClick={() => navigate(`user/${record.id}`)}
            title="View"
          />
          <button
            className={s.icon_edit}
            onClick={() => navigate(`user/edit/${record.id}`)}
            title="Edit"
          />
          <button
            className={s.icon_delete}
            onClick={() => onRemove(record.id)}
            title="Delete"
          />
        </div>
      ),
    },    
  ];

  const currentUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <>
      <div className={s.container}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#333",
            margin: "0",
          }}
        >
          User List
        </h2>
        <Button
          type="primary"
          onClick={() => navigate("/create-new-user")}
          className={s.addButton}
        >
          Add User
        </Button>
      </div>
      <div className={s.tableWrapper}>
        <Table
          dataSource={currentUsers}
          columns={columns}
          rowKey="id"
          pagination={false}
          className={s.table}
        />
      </div>
      <Pagination
        className={s.pagination}
        current={currentPage}
        pageSize={usersPerPage}
        total={users.length}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
      />
    </>
  );
}
