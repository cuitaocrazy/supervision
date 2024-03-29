import { FC, useState, useContext, useCallback } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import Navbar from "components/Navbar";
import { RadioGroup } from "@headlessui/react";
import { Redirect, Link } from "react-router-dom";
import { AppContext, setStuName } from "../../appState";

const stuInfo = [
  {
    name: "张大宝",
    age: "11周岁",
    consumer_name: "孔莉",
    relation: "亲子",
  },
  {
    name: "张二宝",
    age: "10周岁",
    consumer_name: "孔莉",
    relation: "亲子",
  },
  {
    name: "张小宝",
    age: "8周岁",
    consumer_name: "孔莉",
    relation: "亲子",
  },
];
function StudentInfoRadioGroup() {
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);
  const [selected, setSelected] = useState(stuInfo[0]);
  const refreshstuName = useCallback(
    (constuName: String) => {
      dispatch(setStuName(constuName));
    },
    [dispatch]
  );
  //
  return (
    <div className="w-full px-4 py-4">
      <div className="w-full max-w-md mx-auto">
        <RadioGroup
          value={selected}
          onChange={(selectedValue: any) => {
            setSelected(selectedValue)
            refreshstuName(selectedValue.name);
          }}
        >
          <RadioGroup.Label className="text-gray-800 sr-only">
            学生信息
          </RadioGroup.Label>
          <div className="space-y-2">
            {stuInfo.map((stu, index) => (
              <RadioGroup.Option
                key={index}
                value={stu}
                className={({ active, checked }) =>
                  `${active
                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-300"
                    : ""
                  }
                  ${checked
                    ? "bg-primary-600 bg-opacity-75 text-white"
                    : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${checked ? "text-white" : "text-gray-900"
                              }`}
                          >
                            {stu.name} <span aria-hidden="true">&middot;</span>{" "}
                            {stu.age}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${checked ? "text-sky-100" : "text-gray-500"
                              }`}
                          >
                            <span>
                              {stu.consumer_name}/{stu.relation}
                            </span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      <button className="flex">
                        <svg
                          className="w-5 h-5 text-gray-300"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path d="M12 20h9" />{" "}
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

// 学生信息管理页面
const StuInfoList = () => {
  const router = useRouter();

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent className="flex items-center justify-center ">
        <div className="flex flex-col w-3/4 mx-auto mb-3 bg-white shadow-lg pb-14 scroll-auto">
          <div className="mt-4 ml-4 text-lg font-bold">
            学生信息
          </div>
          <StudentInfoRadioGroup />
          <div className="flex items-center justify-center justify-items-center h-14">
            <Link
              to="/conOrder"
              className="flex items-center justify-center w-full h-10 px-8 mt-1 text-sm font-medium text-white mx-96 bg-primary-600 rounded-3xl"
            >
              返回
            </Link>
          </div>
        </div>
        <div className="fixed flex bg-white top-4 right-60 justify-items-center">
          <button
            className="self-center px-10 py-2 text-sm font-medium text-gray-600 rounded-3xl"
            onClick={() => {
              router.push("addStuInfo");
            }}
          >
            新增学生
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StuInfoList;
