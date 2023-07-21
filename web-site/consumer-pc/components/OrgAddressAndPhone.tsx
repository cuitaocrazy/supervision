import { FC } from 'react'
interface orgProps {
  eduAddress?: string,
  eduContactPhone?: string
}
// 教育机构地址和电话组件
const OrgAddressAndPhone: FC<orgProps> = (props) => {
  return (<>
    <div className='text-sm mx-2'>
      <div className='text-gray-500'>
        地址：
        <span className='text-gray-700'>{props.eduAddress}</span>
        </div>
    </div>
    <div className='flex text-sm text-gray-500 mx-2'>
      电话：
      <span className='text-gray-700'>{props.eduContactPhone}</span>
    </div>
  </>
  )
}
export default OrgAddressAndPhone