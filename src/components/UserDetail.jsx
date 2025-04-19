import { Descriptions, Card } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { companyMapping, roleMapping } from "../constants";
import s from "../styles/detail.module.scss"; // import style riêng

export default function UserDetail() {
  const [userDetail, setUserDetail] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchUserDetail = async () => {
    const res = await fetch(`http://localhost:8080/users/${id}`);
    const data = await res.json();
    setUserDetail(data);
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return (
    <div className={s.container}>
      <Card
        title={
          <div className={s.card_title_with_icon}>
            <div className={s.back_button} onClick={() => navigate(-1)} />
            <span>Personal information</span>
          </div>
        }
      >
        {userDetail && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Username">
              {userDetail.username}
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              {roleMapping(userDetail.role)}
            </Descriptions.Item>
            <Descriptions.Item label="Company">
              {companyMapping(userDetail.company)}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {userDetail.address}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>
    </div>
  );  
}
