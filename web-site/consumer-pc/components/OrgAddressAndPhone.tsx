import { FC } from 'react'
interface orgProps {
  eduAddress?: string,
  eduContactPhone?: string
}
// 教育机构地址和电话组件
const OrgAddressAndPhone: FC<orgProps> = (props) => {
  return (<>
    <div className='mt-2 text-xs '>
      <div className='text-gray-500'>
        地址：
        <span>{props.eduAddress}</span>
        </div>
    </div>
    <div className='flex mt-2 text-xs text-gray-500'>
      <div>电话：</div>
      <div>{props.eduContactPhone}</div>
    </div>
  </>
  )
}
export default OrgAddressAndPhone