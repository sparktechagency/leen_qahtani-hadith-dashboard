import { Button, Flex } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import AddServicesModal from "../../components/modals/categoryModel";


type CategoryLocal = {
    id: number;
    name: string;
    description: string;
    image: string;
    status: "active" | "deleted";
    adults_price: number;
    kids_price: number;
    category_price?: number;
    price_per_km?: number;
    price_per_hour?: number;
    taxs?: number;
    fixed_price?: number;
};

const categoryData: CategoryLocal[] = [

  {
      id: 1, name: "صحيح البخاري",
      description: "أصح كتب الحديث بعد القرآن الكريم.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },
  {
      id: 2, name: "صحيح مسلم", description: "من أصح كتب السنة بعد صحيح البخاري.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },
  {
      id: 3, name: "سنن أبي داود", description: "أحد الكتب الستة في الحديث النبوي.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },
  {
      id: 4, name: "سنن الترمذي", description: "كتاب جامع يحتوي على الحديث والفقه.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },
  {
      id: 5, name: "سنن النسائي", description: "أحد أهم كتب الحديث الستة.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },
  {
      id: 6, name: "سنن ابن ماجه", description: "آخر الكتب الستة في الحديث النبوي.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },
  {
      id: 7, name: "موطأ الإمام مالك", description: "من أقدم كتب الحديث والفقه.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },
  {
      id: 8, name: "مسند الإمام أحمد بن حنبل", description: "أكبر مجموعات الحديث المسند.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },
  {
      id: 9, name: "سنن الدارمي", description: "من كتب الحديث المهمة عند أهل السنة.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },
  {
      id: 10, name: "مصنف ابن أبي شيبة", description: "من أهم كتب الحديث والآثار.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },

  // Extra Added
  {
      id: 11, name: "مصنف عبد الرزاق", description: "من أقدم كتب الحديث الموثوقة.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },
  {
      id: 12, name: "سنن البيهقي الكبرى", description: "مرجع مهم في الفقه والحديث.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },
  {
      id: 13, name: "المستدرك على الصحيحين", description: "جمع الأحاديث على شرط البخاري ومسلم.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },
  {
      id: 14, name: "صحيح ابن خزيمة", description: "من كتب الحديث الصحيحة المعتبرة.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  },
  {
      id: 15, name: "صحيح ابن حبان", description: "من كتب الحديث التي اعتمد عليها العلماء.", image: "/car.svg", status: "active",
      adults_price: 0,
      kids_price: 0
  }

];
const categorys = () => {
    const [allCategories] = useState<CategoryLocal[]>(categoryData);
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState<CategoryLocal | null>(null);
    const categoryColumns: ColumnsType<CategoryLocal> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },

        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text) => <img src={text} alt="category" style={{  height: 45, borderRadius: 8, objectFit: "cover" }} />,
        },

        // {
        //     title: 'Action',
        //     key: 'action',
        //     width: "150px",
        //     render: (_: any, record: any, index: number) => (
        //         <div key={index} className="flex items-center gap-3">
        //             <button onClick={() => { setIsOpen(true); setEditData(record) }}>
        //                 <AiOutlineEdit className="text-xl text-primary" />
        //             </button>
        //             <button>
        //                 <IoTrashOutline className="text-xl text-red-500" />
        //             </button>
        //         </div>
        //     ),
        // },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <button onClick={() => { setIsOpen(true); setEditData(record); }}>
                        <AiOutlineEdit className="text-xl text-primary" />
                    </button>
                    <button>
                        <IoTrashOutline className="text-xl text-red-500" />
                    </button>
                </div>
            ),
        },
    ]; 

    return (
        <div>
            <div>
                <Flex className="my-2" vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <h1 className="text-2xl text-primary font-semibold">Manage categories</h1>
                </div>

                <div
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Button
                        onClick={() => setIsOpen(true)}
                        style={{
                            height: 40,
                        }}
                        type="primary"
                    >
                        Add categorys
                    </Button>
                </div>
            </Flex> 
                <Table
                    columns={categoryColumns}
                    dataSource={categoryData}
                    pagination={{ pageSize: 8}}
                />
            </div> 
<AddServicesModal
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  editData={editData}
  setEditData={(data) => setEditData(data as CategoryLocal)}

  
/>
        </div>
    );
};

export default categorys;