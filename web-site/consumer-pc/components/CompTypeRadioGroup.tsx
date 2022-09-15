import { FC, useState } from 'react'
import { RadioGroup } from '@headlessui/react'

// 投诉类型的单选按钮组件
function CompTypeRadioGroup() {
  let [plan, setPlan] = useState('startup')
  return (
    <RadioGroup value={plan} onChange={setPlan} 
        className="flex items-center justify-between px-4 py-2 mx-2 shadow-md">
      <RadioGroup.Label className="px-2 py-2">投诉类型</RadioGroup.Label>
      <RadioGroup.Option value="startup">
        {({ checked }) => (
          <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
            课程</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="business">
        {({ checked }) => (
          <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
            老师</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="enterprise">
        {({ checked }) => (
          <span className={checked ? ' px-5 py-1 text-white bg-secondary-300 rounded-3xl' : 'px-5 py-1 text-gray-500 border rounded-3xl'}>
            其他</span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  )
}
export default CompTypeRadioGroup