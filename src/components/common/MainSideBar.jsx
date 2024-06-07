// 'use client';
import { nodeData } from '@/src/redux/store';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiArrowLeftCircle } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';

function MainSideBar({ list, isOpen, toggleDrawer, selectedNode }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useDispatch();
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const clickOnNode = async (el) => {
    try {
      const response = await axios.post(`${apiUrl}/gen_html`, {
        node_id: el.node_id,
      });

      dispatch(nodeData(response?.data));
      setSelectedNodeId(el.node_id); // Update the selectedNodeId state when a node is clicked
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Trigger the click on the first element when the component mounts
    if (list && list.length > 0 && !selectedNode) {
      clickOnNode(list[0]);
    }
  }, [list, selectedNode]);

  return (
    <>
      <div
        className={`h-[100vh] ${
          isOpen ? 'w-full  translate-x-0 ' : 'w-0  -translate-x-full'
        }  relative  overflow-hidden rounded-xl shadow-lg border border-[#E6E6E6]`}
      >
        <div
          className={`absolute left-0 h-[60vh] w-full  transform transition-transform duration-1000 ease-in-out
          } bg-white`}
        >
          <div className="">
            {isOpen && (
              <div className="flex justify-between items-center py-3 px-2  mx-3 border-b-2 border-[#E6E6E6] ">
                <h2 className="text-base text-black-0 font-poppins tracking-normal">Select layer</h2>
                <HiArrowLeftCircle size={30} onClick={toggleDrawer} className="text-[#F7941D] cursor-pointer" />
              </div>
            )}

            <div className="h-[80vh] overflow-y-scroll">
              <ul className=" mx-3 font-poppins  text-black-0 text-sm tracking-normal">
                {list &&
                  list?.map((el) => (
                    <li
                      onClick={() => clickOnNode(el)}
                      className={`p-3 rounded-2xl border ${
                        selectedNodeId === el.node_id
                          ? 'bg-[#F7941D] text-white'
                          : 'hover:text-[#F7941D] border-[#E6E6E6]'
                      } mt-3 cursor-pointer`}
                    >
                      {el?.label}{' '}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}

export default MainSideBar;
