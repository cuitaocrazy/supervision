import { FC, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const lessonState = [
  { id: 1, name: '待审核', unavailable: true },
  { id: 2, name: '拒绝', unavailable: false },
  { id: 3, name: '上架', unavailable: false },
  { id: 3, name: '下架', unavailable: false },
]

// 学生性别下拉菜单组件
const LessonStateList = () => {
  const [selected, setSelected] = useState(lessonState[0])
  return (
    <div className="w-64 ">
      <Listbox value={selected} onChange={setSelected} >
        <div className="relative h-8">
          <Listbox.Button className="relative w-full h-10 py-1 pl-2 pr-10 text-left bg-white border rounded-md shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {lessonState.map((lessonState, lessonStateIdx) => (
                <Listbox.Option
                  key={lessonStateIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-1 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={lessonState}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {lessonState.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
export default LessonStateList