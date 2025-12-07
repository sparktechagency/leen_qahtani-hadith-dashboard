import { Button, Flex } from 'antd';
import { useState } from 'react';
import CustomModal from '../../components/shared/CustomModal';
import AddFaqForm from '../../components/modals/AddFaqForm';
import EditFaqForm from '../../components/modals/EditFaqForm';

import { GoQuestion } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';

const faqData = [
    {
        question: 'What is the recommended age for using your baby products?',
        answer: 'Our baby products are designed for newborns up to 3 years old. However, each product comes with specific guidelines for the recommended age range.',
    },
    {
        question: 'Are your products safe for sensitive skin?',
        answer: 'Yes, our products are dermatologically tested and safe for babies with sensitive skin. We use hypoallergenic and non-toxic ingredients.',
    },
    {
        question: 'How can I track my order?',
        answer: 'Once your order is shipped, we will send you a tracking number via email. You can use this number to track your package on our website or through the carrier’s site.',
    },
    {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy on all products. Items must be unused and in their original packaging. Please contact our support team to initiate a return.',
    },
]; 

const FAQs = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setEditModal] = useState(false);

    const handleAddFaq = (values: any) => {
        console.log('Form Submitted', values);
        setOpenModal(false);
    };

    const handleEdit = (index: number) => {
        // Logic for editing the FAQ
        console.log(`Edit FAQ at index: ${index}`);
    };


    return (
        <div className=' pt-5 px-3'>
            <Flex vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <h1 className="text-2xl text-primary font-semibold">FAQs</h1>
                </div>

                <div
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Button
                        icon={<AiOutlinePlus />}
                        onClick={() => setOpenModal(true)}
                        htmlType="submit"
                        style={{
                            height: 40,
                        }}
                        type="primary"
                    >
                        Add FAQ
                    </Button>
                </div>
            </Flex>

            <div className="space-y-6 my-5">
                <div className="bg-white py-6 px-4 rounded-md">
                    {faqData.map((item, index) => (
                        <div key={index} className="flex justify-between items-start gap-4 ">
                            <div className="mt-3">
                                <GoQuestion color="#286a25" size={25} />
                            </div>
                            <div className="w-full ">
                                <p className="text-base font-medium border-b rounded-xl py-2 px-4 flex items-center gap-8 bg-slate-50">
                                    <span className=" flex-1 "> {item?.question}</span>
                                </p>
                                <div className="flex justify-start items-start gap-2 border-b  py-2 px-4  rounded-xl my-4 bg-slate-50">
                                    <p className="text-[#919191] leading-[24px] mb-6 ">{item?.answer}</p>
                                </div>
                            </div>
                            <div className="w-[5%] flex justify-start flex-col items-start gap-2">
                                <CiEdit
                                    size={24}
                                    onClick={() => {
                                        setEditModal(true);
                                    }}
                                    className="text-2xl cursor-pointer text-[#286a25]"
                                />
                                <RxCross2
                                    size={24}
                                    onClick={() => { }}
                                    className="text-2xl cursor-pointer text-red-600"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <CustomModal
                open={openModal}
                setOpen={setOpenModal}
                title={<p className='font-semibold text-xl  text-primary'>Add FAQ </p>}
                width={500}
                body={<AddFaqForm onFinish={handleAddFaq} />}
            />
            <CustomModal
                open={openEditModal}
                setOpen={setEditModal}
                title={<p className='font-semibold text-xl  text-primary'>Edit FAQ </p>}
                width={500}
                body={<EditFaqForm onFinish={handleEdit} />}
            />
        </div>
    );
};

export default FAQs;
