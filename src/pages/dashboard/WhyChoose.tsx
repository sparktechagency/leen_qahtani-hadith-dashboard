import { Button, Flex, Table } from 'antd';
import { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';
import CreateWhyChooseModal from '../../components/modals/CreateWhyChooseModal';

type contentType = {
  id: string;
  contentTitle: string;
  contentImage: string;
  description: string;
}; 


const contentData:contentType[] = [
  {
    id: '01',
    contentTitle: 'Beauty & Fashion Masterclass',
    contentImage: '/car.svg',
    description: 'Learn the latest trends in beauty and fashion from industry professionals.',
  },
  {
    id: '02',
    contentTitle: 'Health & Fitness Bootcamp',
    contentImage: '/car.svg',
    description: 'Transform your lifestyle with this all-in-one health and fitness program.',
  },
  {
    id: '03',
    contentTitle: 'Travel & Adventure Guide',
    contentImage: '/car.svg',
    description: 'Explore the world with practical travel advice and thrilling adventures.',
  },
  {
    id: '04',
    contentTitle: 'Food & Beverage Academy',
    contentImage: '/car.svg',
    description: 'Cook, taste, and explore cuisines from around the world.',
  },
  {
    id: '05',
    contentTitle: 'Tech & Gadgets Workshop',
    contentImage: '/car.svg',
    description: 'Stay ahead with the latest in tech trends and gadgets.',
  },
  {
    id: '06',
    contentTitle: 'Lifestyle & Vlogging 101',
    contentImage: '/car.svg',
    description: 'Build your personal brand through lifestyle vlogging.',
  },
  {
    id: '07',
    contentTitle: 'Parenting & Family Life Course',
    contentImage: '/car.svg',
    description: 'Practical advice for raising children and nurturing family relationships.',
  },
  {
    id: '08',
    contentTitle: 'Entertainment & Gaming Zone',
    contentImage: '/car.svg',
    description: 'Dive into the world of entertainment content creation and gaming.',
  },
  {
    id: '09',
    contentTitle: 'Business & Finance Blueprint',
    contentImage: '/car.svg',
    description: 'Master your finances and build successful business strategies.',
  },
  {
    id: '10',
    contentTitle: 'Business & Finance Blueprint',
    contentImage: '/car.svg',
    description: 'Master your finances and build successful business strategies.',
  },
]; 

const WhyChoose = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState<contentType | null>(null);

    const columns = [
    {
    title: 'ID',
    dataIndex: 'id',
    key: 'id', 
    width: "100px"
  },
  {
    title: 'Title',
    dataIndex: 'contentTitle',
    key: 'contentTitle', 
     width: "370px"
  },
  {
    title: 'Image',
    dataIndex: 'contentImage',
    key: 'contentImage',
    render: (text:string) => <img src={text} alt="class" style={{  height: 50 , objectFit: "cover" }} />, 
     width: "300px"
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description', 
     ellipsis: true, 
  },
        {
            title: 'Action',
            key: 'action',
            width: "150px",
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <button onClick={() => { setIsOpen(true); setEditData(record) }}>
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
            <Flex className="my-2" vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <h1 className="text-2xl text-primary font-semibold">Manage Classes</h1>
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
                        Create new Content
                    </Button>
                </div>
            </Flex>

            <div>
                <Table columns={columns} dataSource={contentData} pagination={{ pageSize: 7 }} />
            </div>
            <CreateWhyChooseModal isOpen={isOpen} setIsOpen={setIsOpen} editData={editData} setEditData={setEditData} />
        </div>
    );
};

export default WhyChoose;
