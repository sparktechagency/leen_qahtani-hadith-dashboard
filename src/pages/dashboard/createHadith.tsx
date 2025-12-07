import { Button, Table, Form, Input, Select, Modal } from "antd";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type HadithData = {
  id: string;
  title: string;
  referenced?: string;
  Category?: string;
  description: string;
};

const AllHadith = () => {
  const [hadithList, setHadithList] = useState<HadithData[]>([
    {
      id: "01",
      title: "الجمال والموضة",
      referenced: "Omor ibn khattab",
      Category: "sleeping",
      description: "تعلم آخر صيحات الموضة والجمال من خبراء الصناعة.",
    },
    {
      id: "02",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
      Category: "Category2",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "03",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
      Category: "friend",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "04",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
      Category: "home",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "05",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
      Category: "school",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "06",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
      Category: "aqidah",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "07",
      title: "الصحة واللياقة البدنية",
        referenced: "abbas ibn masud",
        Category: "sunnah",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "08",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
        Category: "sunnah",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "09",
      title: "الصحة واللياقة البدنية",
        referenced: "abbas ibn masud",
        Category: "sunnah",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "10",
      title: "الصحة واللياقة البدنية",
        referenced: "abbas ibn masud",
        Category: "sunnah",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
    {
      id: "11",
      title: "الصحة واللياقة البدنية",
      referenced: "abbas ibn masud",
      Category: "sunnah",
      description: "غيّر نمط حياتك مع هذا البرنامج المتكامل للصحة واللياقة.",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");

  // Submit handler
  const handleAddHadith = (values: any) => {
    const newHadith: HadithData = {
      id: (hadithList.length + 1).toString(),
      title: values.title,
      referenced: values.referenced,
      Category: values.Category,
      description,
    };
    setHadithList([newHadith, ...hadithList]);
    form.resetFields();
    setDescription("");
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "80px",
    },
    {
      title: "Hadith Name",
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <span style={{ direction: "rtl", textAlign: "right", display: "block" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text: string) => (
        <span style={{ direction: "rtl", textAlign: "right", display: "block" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "referencedCategory",
      key: "referencedCategory",
    },
    {
      title: "Action",
      key: "action",
      width: "120px",
      render: (_: any, record: HadithData) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              // edit functionality (optional)
              form.setFieldsValue({
                title: record.title,
                referenced: record.referenced,
                Category: record.Category,
              });
              setDescription(record.description);
              setIsModalOpen(true);
            }}
          >
            <AiOutlineEdit className="text-xl text-primary" />
          </button>
          <button
            onClick={() => {
              setHadithList((prev) => prev.filter((h) => h.id !== record.id));
            }}
          >
            <IoTrashOutline className="text-xl text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Manage Hadith</h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Hadith
        </Button>
      </div>

      <Table dataSource={hadithList} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />

      {/* Modal for adding Hadith */}
      <Modal
        title="Add Hadith"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setDescription("");
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddHadith}>
          <Form.Item label="Hadith Title" name="title" rules={[{ required: true }]}>
            <Input placeholder="Enter hadith title" />
          </Form.Item>
          <Form.Item label="Referenced" name="referenced" rules={[{ required: true }]}>
            <Input placeholder="Enter referenced" />
          </Form.Item>
          <Form.Item label="Category" name="Category" rules={[{ required: true }]}>
            <Select placeholder="Select category" allowClear>
              <Select.Option value="Islamic Knowledge">صحيح البخاري</Select.Option>
              <Select.Option value="">سنن أبي داود</Select.Option>
              <Select.Option value="Fiqh">مسند أحمد</Select.Option>
              <Select.Option value="Fiqh">سنن النسائي</Select.Option>
              <Select.Option value="Fiqh">سنن ابن ماجه</Select.Option>
            </Select>
          </Form.Item>

          <label>Description</label>
          <ReactQuill value={description} onChange={setDescription} style={{ height: 400,width: "100%" ,marginBottom:15 }} />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AllHadith;
