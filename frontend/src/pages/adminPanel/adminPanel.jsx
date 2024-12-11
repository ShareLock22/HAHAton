import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Card,
  Row,
  Col,
  Space,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

const AdminPanel = () => {
  const [locations, setLocations] = useState([
    { id: "1", name: "Сибкодинг", isAvailable: true },
    { id: "2", name: "Шишка", isAvailable: true },
  ]);

  const [items, setItems] = useState([
    {
      id: "1",
      name: "Забронировано Jane Smith",
      locationId: "1",
      startDate: moment("2023-12-10T10:00:00"),
      endDate: moment("2023-12-10T12:00:00"),
    },
    {
      id: "2",
      name: "Забронировано Bill Clinton",
      locationId: "1",
      startDate: moment("2023-12-11T14:00:00"),
      endDate: moment("2023-12-11T16:00:00"),
    },
    {
      id: "3",
      name: "Забронировано Andrei Chernenko",
      locationId: "2",
      startDate: moment("2023-12-10T10:00:00"),
      endDate: moment("2023-12-10T12:00:00"),
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const handleModifyBooking = (itemId) => {
    const itemToEdit = items.find((item) => item.id === itemId);
    setEditingItem(itemToEdit);
    form.setFieldsValue({
      name: itemToEdit.name,
      locationId: itemToEdit.locationId,
      dateRange: [itemToEdit.startDate, itemToEdit.endDate],
    });
    setIsModalVisible(true);
  };

  const handleCancelBooking = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleToggleAvailability = (locationId, isAvailable) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === locationId ? { ...location, isAvailable } : location
      )
    );
  };

  const handleDeleteLocation = (locationId) => {
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location.id !== locationId)
    );
  };

  const showModal = () => {
    setEditingItem(null);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newItem = {
        id: editingItem ? editingItem.id : (items.length + 1).toString(),
        name: values.name,
        locationId: values.locationId,
        startDate: values.dateRange[0],
        endDate: values.dateRange[1],
      };
      if (editingItem) {
        setItems((prevItems) =>
          prevItems.map((item) => (item.id === editingItem.id ? newItem : item))
        );
      } else {
        setItems([...items, newItem]);
      }
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Бронь",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Комната",
      dataIndex: "locationId",
      key: "locationId",
      render: (locationId) =>
        locations.find((loc) => loc.id === locationId)?.name,
    },
    {
      title: "Начало",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => date.format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Конец",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => date.format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleModifyBooking(record.id)}
          >
            Изменить
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleCancelBooking(record.id)}
          >
            Отменить
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{ textAlign: "center", marginBottom: "20px", fontSize: "30px" }}
      >
        Панель администратора
      </h1>

      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Card title="Управлять бронью" bordered={false}>
            <Table dataSource={items} columns={columns} rowKey="id" />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showModal}
              style={{ marginTop: "20px" }}
            >
              Добавить бронь
            </Button>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Изменить локацию" bordered={false}>
            <Row gutter={[16, 16]}>
              {locations.map((location) => (
                <Col key={location.id} span={12}>
                  <Card
                    title={location.name}
                    extra={
                      <Space>
                        <Button
                          icon={
                            location.isAvailable ? (
                              <CloseOutlined />
                            ) : (
                              <CheckOutlined />
                            )
                          }
                          onClick={() =>
                            handleToggleAvailability(
                              location.id,
                              !location.isAvailable
                            )
                          }
                        >
                          {location.isAvailable
                            ? "Отметить недоступной"
                            : "Отметить доступной"}
                        </Button>
                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteLocation(location.id)}
                        >
                          Удалить
                        </Button>
                      </Space>
                    }
                  >
                    <p>
                      Статус: {location.isAvailable ? "Доступна" : "Недоступна"}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
      <Modal
        title={editingItem ? "Изменить бронь" : "Добавить бронь"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Пожалуйста, введите имя!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="locationId"
            label="Location"
            rules={[
              { required: true, message: "Пожалуйста, выберите комнату!" },
            ]}
          >
            <Select>
              {locations.map((location) => (
                <Option key={location.id} value={location.id}>
                  {location.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dateRange"
            label="Date Range"
            rules={[
              { required: true, message: "Пожалуйста, выберите период!" },
            ]}
          >
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPanel;
