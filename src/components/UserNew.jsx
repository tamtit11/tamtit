import { Form, Input, Select, Button, message, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "../styles/user-new.module.scss";

const { Option } = Select;

export default function UserNew() {
  const [form] = Form.useForm();
  const [userDetail, setUserDetail] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const provinces = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh",
    "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau",
    "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai",
    "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương",
    "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang",
    "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định",
    "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình",
    "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La",
    "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang",
    "TP. Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
  ];

  const fetchUserDetail = async () => {
    const res = await fetch(`http://localhost:8080/users/${id}`);
    const data = await res.json();
    setUserDetail(data);
    form.setFieldsValue(data);
  };

  const onSubmit = async (values) => {
    if (!values.username || !values.address) {
      message.error("Please fill required fields!");
      return;
    }

    const method = userDetail ? "PATCH" : "POST";
    const url = userDetail
      ? `http://localhost:8080/users/${id}`
      : "http://localhost:8080/users";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    message.success(userDetail ? "User updated successfully!" : "User created successfully!");
    setTimeout(() => navigate("/"), 1000);
  };

  useEffect(() => {
    if (id) {
      fetchUserDetail();
    }
  }, []);

  return (
    <div className={s.container}>
      <Card
        title={id ? "Edit User" : "Create User"}
        className={s.card}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item label="Address" name="address" rules={[{ required: true }]}>
            <Select placeholder="Select province">
              {provinces.map((p) => (
                <Option key={p} value={p}>{p}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Role" name="role">
            <Select>
              <Option value="dev">Developer</Option>
              <Option value="ba">Business Analyst</Option>
              <Option value="pm">Project Manager</Option>
              <Option value="tester">Tester</Option>
              <Option value="designer">Designer</Option>
              <Option value="trainer">Trainer</Option>
              <Option value="auditor">Auditor</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Company" name="company">
            <Select>
              <Option value="vti">VTI Group</Option>
              <Option value="fsoft">FPT Software</Option>
              <Option value="cmc">CMC Global</Option>
              <Option value="viettel">Viettel</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {id ? "Update" : "Create"}
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => navigate("/")}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
