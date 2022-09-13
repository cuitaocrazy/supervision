import { FC, useState } from 'react'
import { RadioGroup } from '@headlessui/react'

// 与客户的关系组件
const RelationRadio = () => {
  let [plan, setPlan] = useState('startup')
  return (
    <RadioGroup value={plan} onChange={setPlan}
      className="flex items-center justify-center px-4 py-2 mx-2 mt-3 space-x-4 justify-items-center ">
      {/* <RadioGroup.Label className="px-2 py-2">与客户关系</RadioGroup.Label> */}
      <RadioGroup.Option value="startup">
        {({ checked }) => (
          <span className={checked ? ' px-5 py-1 text-white bg-gray-400 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
            本人</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="business">
        {({ checked }) => (
          <span className={checked ? ' px-5 py-1 text-white bg-gray-400 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
            子女</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="enterprise">
        {({ checked }) => (
          <span className={checked ? ' px-5 py-1 text-white bg-gray-400 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
            其他</span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  )
}

export default RelationRadio